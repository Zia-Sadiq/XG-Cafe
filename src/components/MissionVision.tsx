import { Target, Eye, Flame, Leaf, BookMarked, Users, Sparkles, Globe2, Mic, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeading from './SectionHeading';

const TIMELINE = [
  { year: '2024', title: 'First Pour', text: 'Opened on Nizami Street with one espresso machine and 200 donated books.' },
  { year: '2025', title: 'Kitab Klubu', text: 'Launched the monthly book club, poetry nights and our in-house roastery.' },
  { year: '2026', title: 'The Movement', text: '1,200+ books, 48 events and a community of 3,000 readers — and counting.' },
];

const BLOCKS = [
  {
    icon: Target,
    label: 'Our Mission',
    text: 'To brew coffee with conviction and build a home for readers — a place where every cup and every page is taken seriously.',
    pillars: [
      { icon: Flame, name: 'Bold Craft' },
      { icon: Leaf, name: 'Honest Sourcing' },
      { icon: BookMarked, name: 'Open Library' },
      { icon: Users, name: 'Real Community' },
    ],
  },
  {
    icon: Library,
    label: 'Our Vision',
    text: 'To become Baku’s cultural living room — where literature, conversation and specialty coffee shape the city’s next chapter.',
    pillars: [
      { icon: Sparkles, name: 'Inspire Readers' },
      { icon: Mic, name: 'Amplify Voices' },
      { icon: Globe2, name: 'Connect Cultures' },
      { icon: HeartHandshake, name: 'Give Back' },
    ],
  },
];

export default function MissionVision() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="journey" ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-gunmetal-900/50">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="section-padding relative z-10">
        <SectionHeading
          eyebrow="Our Journey"
          title={<>Brewing <span className="gradient-text">Since 2024</span></>}
          subtitle="Three years, one obsession: great coffee for people who love great books."
          isVisible={isVisible}
        />

        {/* Timeline */}
        <div className="relative mb-20">
          <div
            className={`absolute left-0 right-0 top-[11px] h-px bg-gradient-to-r from-crimson-900 via-crimson-500 to-crimson-900 origin-left hidden md:block ${
              isVisible ? 'animate-line-grow' : 'scale-x-0'
            }`}
          />
          <div className="grid md:grid-cols-3 gap-10">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`relative md:text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + i * 250}ms` }}
              >
                <span className="relative z-10 hidden md:block mx-auto w-6 h-6 rounded-full bg-gunmetal-950 border-2 border-crimson-500 shadow-[0_0_20px_rgba(220,38,38,0.6)]" />
                <div className="md:mt-6 font-display text-6xl text-crimson-500 leading-none">{item.year}</div>
                <h3 className="mt-2 font-heading text-lg uppercase tracking-wider text-white">{item.title}</h3>
                <p className="mt-2 text-gunmetal-400 text-sm leading-relaxed md:max-w-xs md:mx-auto">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-6">
          {BLOCKS.map((block, i) => (
            <div
              key={block.label}
              className={`group glass-card-hover p-8 sm:p-10 relative overflow-hidden transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-x-0' : i === 0 ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: `${900 + i * 150}ms` }}
            >
              <block.icon size={140} className="absolute -right-6 -top-6 text-crimson-600/5 group-hover:text-crimson-600/10 group-hover:rotate-12 transition-all duration-700" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-crimson-600/15 border border-crimson-600/30 flex items-center justify-center mb-5">
                  <block.icon size={26} className="text-crimson-500" />
                </div>
                <h3 className="heading-section text-2xl sm:text-3xl text-white mb-3">{block.label}</h3>
                <p className="text-gunmetal-300 leading-relaxed mb-8">{block.text}</p>
                <div className="grid grid-cols-2 gap-3">
                  {block.pillars.map((p) => (
                    <div key={p.name} className="flex items-center gap-3 p-3 rounded-lg bg-gunmetal-900/70 border border-gunmetal-700/60 hover:border-crimson-600/50 transition-colors">
                      <p.icon size={18} className="text-crimson-500 flex-shrink-0" />
                      <span className="font-heading text-xs sm:text-sm uppercase tracking-wider text-gunmetal-200">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
