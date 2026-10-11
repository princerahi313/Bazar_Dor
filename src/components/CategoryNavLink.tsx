"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoryNavLinkProps {
  slug: string;
  title: string;
  icon: string;
  isDefault: boolean;
}

export default function CategoryNavLink({
  slug,
  title,
  icon,
  isDefault,
}: CategoryNavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const isActive = selectedCategory
    ? selectedCategory === slug
    : pathname === "/" && isDefault;

  return (
    <Link
      className={`category-nav__link${isActive ? " is-active" : ""}`}
      href={`/?category=${encodeURIComponent(slug)}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="category-nav__icon" aria-hidden="true">
        {icon}
      </span>
      <span>{title}</span>
    </Link>
  );
}
