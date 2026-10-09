import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import MissionVision from './components/MissionVision';
import MenuSection from './components/MenuSection';
import Stats from './components/Stats';
import BookClub from './components/BookClub';
import WhyChoose from './components/WhyChoose';
import Gallery from './components/Gallery';
import ReservationSection from './components/ReservationSection';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-gunmetal-950 text-gunmetal-100 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MissionVision />
        <MenuSection />
        <Stats />
        <BookClub />
        <WhyChoose />
        <Gallery />
        <Reviews />
        <ReservationSection />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
