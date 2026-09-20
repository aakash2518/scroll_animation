import IndustrialHero from '@/components/hero/IndustrialHero';
import CompanyStory from '@/components/sections/CompanyStory';
import StatsCounter from '@/components/sections/StatsCounter';
import Industries from '@/components/sections/Industries';
import Products from '@/components/sections/Products';
import Testimonials from '@/components/sections/Testimonials';
import ContactForm from '@/components/sections/ContactForm';
import Clients from '@/components/sections/Clients';

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <IndustrialHero />
      <CompanyStory />
      <StatsCounter />
      <Industries />
      <Products />
      <Testimonials />
      <ContactForm />
      <Clients />
    </main>
  );
}
