import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import DrinksSection from '@/components/DrinksSection';
import ReviewsSection from '@/components/ReviewsSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <DrinksSection />
        <ReviewsSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
