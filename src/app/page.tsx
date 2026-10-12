import HeroBanner from '@/components/HeroBanner';

export default function Home() {
  return (
    <main className="home-page">
      <HeroBanner />
      <section id="সব-পণ্য" className="all-products-anchor" aria-label="সব পণ্য" />
    </main>
  );
}
