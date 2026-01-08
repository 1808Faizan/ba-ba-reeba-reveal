import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import DrinksSection from '@/components/DrinksSection';
import ReviewsSection from '@/components/ReviewsSection';
import FooterSection from '@/components/FooterSection';
import ScrollingText from '@/components/ScrollingText';
import WorksSection from '@/components/WorksSection';
import CircleScrollAnimation from '@/components/ircleScrollAnimation';

const Index = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <ScrollingText />
        <AboutSection />
        <CircleScrollAnimation />
        <WorksSection />
        <DrinksSection />
        <ReviewsSection />
        
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
