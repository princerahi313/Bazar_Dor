import CategoryNavLink from "@/components/CategoryNavLink";

interface NavlinkProps {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoriesResponse {
  value: NavlinkProps[];
}

const CATEGORIES_API =
  "https://openapi.programming-hero.com/api/bazardor/categories";

const fallbackNav: NavlinkProps[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

async function getCategories(): Promise<NavlinkProps[]> {
  try {
    const res = await fetch(CATEGORIES_API, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackNav;

    const data: CategoriesResponse = await res.json();
    return Array.isArray(data.value) && data.value.length > 0
      ? data.value
      : fallbackNav;
  } catch {
    return fallbackNav;
  }
}

const Navlink = async () => {
  const nav: NavlinkProps[] = await getCategories();

  return (
    <nav className="category-nav" aria-label="বাজারের পণ্যের বিভাগ">
      <div className="category-nav__inner">
        {nav.map((n, i) => (
          <CategoryNavLink
            key={n.id || i}
            slug={n.slug}
            title={n.nameBn}
            icon={n.icon}
            isDefault={i === 0}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navlink;
