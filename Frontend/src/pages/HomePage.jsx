import Hero from '../components/home/Hero';
import Highlights from '../components/home/Highlights';
import HomeAnnouncements from '../components/home/HomeAnnouncements';
import QuickLinks from '../components/home/QuickLinks';
import AdmissionSection from '../components/home/AdmissionSection';
import ContactDetails from '../components/home/ContactDetails';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Highlights />
      <HomeAnnouncements />
      <QuickLinks />
      <AdmissionSection />
      <ContactDetails />
    </div>
  );
};

export default HomePage;
