import Image from 'next/image';

export default function HeroBanner() {
  return (
      <section className="hero-banner" aria-labelledby="hero-title">
        <div className="hero-banner__content">
          <p className="hero-banner__eyebrow">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          <h1 className="hero-banner__title" id="hero-title">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="hero-banner__subtitle">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a className="hero-banner__cta" href="#সব-পণ্য">
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="hero-banner__art">
          <Image
            src="/bazar-hero.png"
            alt="তাজা সবজির ঝুড়ি"
            width={315}
            height={263}
            priority
            sizes="(max-width: 700px) 220px, (max-width: 1000px) 280px, 315px"
          />
        </div>
      </section>
  );
}
