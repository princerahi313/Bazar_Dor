import MarqueeText from "react-marquee-text";

type Direction = "up" | "down" | "flat";

interface Product {
  id: string;
  nameBn: string;
  icon: string;
  today: number;
  unit: string;
  direction: Direction;
  changePct: number;
}

const PRODUCTS_API =
  "https://openapi.programming-hero.com/api/bazardor/products";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getRows(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  for (const key of ["value", "data", "products"]) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  return [];
}

function toProduct(value: unknown): Product | null {
  if (!isRecord(value) || typeof value.nameBn !== "string") return null;

  const today = Number(value.today);
  if (!Number.isFinite(today)) return null;

  const yesterday = Number(value.yesterday);
  const hasYesterday = Number.isFinite(yesterday) && yesterday > 0;
  const difference = hasYesterday ? today - yesterday : 0;
  const derivedPct = hasYesterday
    ? Math.abs((difference / yesterday) * 100)
    : 0;

  const change = isRecord(value.change) ? value.change : {};
  const suppliedDirection = change.dir;
  const direction: Direction =
    suppliedDirection === "up" || suppliedDirection === "down" || suppliedDirection === "flat"
      ? suppliedDirection
      : difference > 0
        ? "up"
        : difference < 0
          ? "down"
          : "flat";
  const suppliedPct = Number(change.pct);
  const changePct = Number.isFinite(suppliedPct)
    ? Math.abs(suppliedPct)
    : derivedPct;

  const icon =
    (typeof value.categoryIcon === "string" && value.categoryIcon) ||
    (typeof value.image === "string" && value.image) ||
    "🛒";

  return {
    id: String(value.id ?? value.slug ?? value.nameBn),
    nameBn: value.nameBn,
    icon,
    today,
    unit: typeof value.unit === "string" ? value.unit : "কেজি",
    direction,
    changePct,
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(PRODUCTS_API, {
      next: { revalidate: 900 },
    });
    if (!response.ok) return [];

    const payload: unknown = await response.json();
    return getRows(payload)
      .map(toProduct)
      .filter((product): product is Product => product !== null);
  } catch {
    return [];
  }
}

const numberBn = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "টি",
  pcs: "টি",
  dozen: "ডজন",
};

function ProductPrice({ product }: { product: Product }) {
  const unit = unitBn[product.unit.toLowerCase()] ?? product.unit;
  const arrow =
    product.direction === "up"
      ? "▲"
      : product.direction === "down"
        ? "▼"
        : "—";

  return (
    <span className="price-ticker__item">
      <span className="price-ticker__emoji" aria-hidden="true">
        {product.icon}
      </span>
      <span className="price-ticker__name">{product.nameBn}</span>
      <span className="price-ticker__price">
        {numberBn.format(product.today)} টাকা/{unit}
      </span>
      <span className={`price-ticker__change is-${product.direction}`}>
        <span aria-hidden="true">{arrow}</span>
        <span className="sr-only">
          {product.direction === "up"
            ? "দাম বেড়েছে"
            : product.direction === "down"
              ? "দাম কমেছে"
              : "দাম অপরিবর্তিত"}{" "}
        </span>
        {numberBn.format(product.changePct)}%
      </span>
    </span>
  );
}

export default async function Marquee() {
  const products = await getProducts();

  return (
    <section className="price-ticker" aria-label="আজকের বাজারদর">
      {products.length > 0 ? (
        <>
          <div className="price-ticker__visual" aria-hidden="true">
            <MarqueeText
              className="price-ticker__marquee"
              direction="left"
              duration={18}
              pauseOnHover
              playOnlyInView
              textSpacing="0"
            >
              {products.map((product) => (
                <ProductPrice key={product.id} product={product} />
              ))}
            </MarqueeText>
          </div>
          <ul className="sr-only" aria-label="আজকের পণ্যের দাম">
            {products.map((product) => (
              <li key={product.id}>
                <ProductPrice product={product} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="price-ticker__empty">দামের তথ্য এখন পাওয়া যাচ্ছে না</p>
      )}
    </section>
  );
}
