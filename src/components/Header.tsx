import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="বাজার দর — হোম">
          <span className="brand__mark" aria-hidden="true">
            <Image src="/logo-icon.png" alt="" width={31} height={31} loading="eager" />
          </span>
          <span className="brand__copy">
            <span className="brand__name">বাজার দর</span>
            <span className="brand__date">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
          </span>
        </Link>

        <nav className="header-auth" aria-label="অ্যাকাউন্ট">
          <Link className="header-auth__signin" href="/sign-in">
            সাইন ইন
          </Link>
          <Link className="header-auth__signup" href="/sign-up">
            সাইন আপ
          </Link>
        </nav>
      </div>
    </header>
  );
}
