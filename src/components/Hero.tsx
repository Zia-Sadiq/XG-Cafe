import { useEffect, useState } from 'react';
import { BookOpen, ArrowRight, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Book from './Book';

const HERO_IMAGE = 'https://images.pexels.com/photos/984162/pexels-photo-984162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const EYEBROW = ['Specialty Coffee', 'Book Club', 'Events', 'Community'];

export default function Hero() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const handleScroll = () => setParallax(window.scrollY * 0.4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const reveal = (delay: string) =>
    `transition-all duration-1000 ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallax}px) scale(1.1)`,
        }}
      />
      {/* Dark overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gunmetal-950/80 via-gunmetal-950/90 to-gunmetal-950" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-gunmetal-950/90 via-transparent to-gunmetal-950/50" />
      <div className="absolute inset-0 z-10 bg-noise opacity-40" />
      <div className="absolute inset-0 z-10 bg-grid opacity-30" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-[45%] z-15 hidden lg:block">
        <div className="w-32 h-32 border-2 border-crimson-600/20 rounded-full animate-spin-slow" />
      </div>
      <div className="absolute bottom-1/4 left-10 z-15 hidden md:block">
        <div className="w-24 h-24 border border-crimson-600/15 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 section-padding flex-1 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center pt-28 pb-24">
        <div>
          {/* Eyebrow */}
          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 ${reveal('')}`}>
            <span className="h-px w-10 bg-crimson-600" />
            {EYEBROW.map((item, i) => (
              <span key={item} className="flex items-center gap-3 font-heading text-[11px] sm:text-xs uppercase tracking-[0.25em] text-crimson-400">
                {i > 0 && <span className="text-gunmetal-600">·</span>}
                {item}
              </span>
            ))}
          </div>

          {/* Main heading */}
          <h1 className={`font-display text-white leading-[0.85] mb-6 ${reveal('delay-100')}`}>
            <span className="block text-5xl sm:text-7xl xl:text-8xl text-shadow-lg">Brewing the Future</span>
            <span className="block text-5xl sm:text-7xl xl:text-8xl text-shadow-lg">
              of <span className="gradient-text text-glow">Slow Reading</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg text-gunmetal-300 max-w-xl mb-8 leading-relaxed ${reveal('delay-200')}`}>
            XG Cafe Kitab Klubu is where aggressive flavor meets quiet pages.
            Crafted espresso, a 1,200-book library and a community that drinks
            deeply and reads fiercely — in the heart of Baku.
          </p>

          {/* Trust line */}
          <div className={`flex items-center gap-3 mb-10 ${reveal('delay-300')}`}>
            <div className="flex -space-x-2">
              {['L', 'R', 'N', 'T'].map((c) => (
                <span key={c} className="w-8 h-8 rounded-full border-2 border-gunmetal-950 bg-gradient-to-br from-crimson-600 to-crimson-800 flex items-center justify-center font-display text-sm text-white">
                  {c}
                </span>
              ))}
            </div>
            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className="text-crimson-500 fill-crimson-500" />
                ))}
              </div>
              <p className="text-gunmetal-400 text-xs mt-0.5">Loved by 3,000+ readers since 2024</p>
            </div>
          </div>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 ${reveal('delay-400')}`}>
            <button onClick={() => handleScrollTo('#reserve')} className="btn-primary group">
              Book a Table
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => handleScrollTo('#bookclub')} className="btn-outline group">
              Join the Book Club
              <BookOpen size={16} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* The book */}
        <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <Book />
          <p className="mt-3 text-center font-heading text-[10px] uppercase tracking-[0.3em] text-gunmetal-500">
            Hover to pause · Click a page to turn
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="font-heading text-xs uppercase tracking-widest text-gunmetal-500">Scroll</span>
        <div className="w-6 h-10 border-2 border-gunmetal-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-crimson-500 rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
