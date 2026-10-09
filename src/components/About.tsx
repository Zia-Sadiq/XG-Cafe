import { Coffee, BookOpen, Heart, Flame } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ABOUT_IMAGE = 'https://images.pexels.com/photos/30405795/pexels-photo-30405795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ABOUT_IMAGE_2 = 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const VALUES = [
  {
    icon: Flame,
    title: 'Aggressive Flavor',
    description: 'We roast bold. No timid cups. Every shot pulls with intention and intensity.',
  },
  {
    icon: BookOpen,
    title: 'Curated Pages',
    description: 'A library hand-picked for the curious. Fiction, philosophy, and everything between.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'A space where strangers become friends over shared stories and strong brews.',
  },
  {
    icon: Coffee,
    title: 'Crafted Daily',
    description: 'Beans roasted in-house, milk steamed to silk, every cup treated like a ritual.',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-crimson-950/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <div className="glass-card p-2 rounded-2xl overflow-hidden">
                <img
                  src={ABOUT_IMAGE}
                  alt="Cafe interior"
                  className="w-full h-[400px] object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
              {/* Floating second image */}
              <div className="absolute -bottom-12 -right-4 sm:-right-12 w-48 h-48 sm:w-64 sm:h-64 glass-card p-2 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-float">
                <img
                  src={ABOUT_IMAGE_2}
                  alt="Barista at work"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-crimson-600/30 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-24 h-24 bg-crimson-600/5 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Text content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-crimson-600" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Our Story</span>
            </div>

            <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
              Not Just a Cafe.
              <br />
              <span className="gradient-text">A Movement.</span>
            </h2>

            <p className="text-gunmetal-300 text-base sm:text-lg leading-relaxed mb-6">
              XG Cafe Kitab Klubu was born from a simple rebellion — the idea that
              a coffee shop should hit as hard as the books on its shelves. We
              built a place where the espresso is unapologetic, the reading list
              is relentless, and the atmosphere wraps you in gray-toned calm
              punctuated by sparks of red.
            </p>
            <p className="text-gunmetal-400 text-base leading-relaxed mb-8">
              Every corner tells a story. Every cup carries conviction. This is
              where Baku comes to wake up and slow down at the same time.
            </p>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((value, i) => (
                <div
                  key={value.title}
                  className={`group flex gap-4 p-4 rounded-xl hover:bg-gunmetal-800/50 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-crimson-600/15 border border-crimson-600/30 flex items-center justify-center group-hover:bg-crimson-600/25 group-hover:scale-110 transition-all duration-300">
                    <value.icon size={20} className="text-crimson-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-1">
                      {value.title}
                    </h3>
                    <p className="text-gunmetal-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
