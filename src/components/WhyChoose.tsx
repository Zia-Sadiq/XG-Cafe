import { Flame, BookOpen, Armchair, Bean, Search, CupSoda, MessagesSquare, Repeat } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeading from './SectionHeading';

const REASONS = [
  {
    icon: Flame,
    title: 'Coffee With Conviction',
    text: 'Single-origin beans roasted in-house every week. Dialled in daily, pulled by baristas who care about the details.',
    image: 'https://images.pexels.com/photos/16556498/pexels-photo-16556498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: BookOpen,
    title: 'A Library, Not a Shelf',
    text: 'Over 1,200 hand-picked titles across fiction, philosophy, history and Azerbaijani literature — free to read and borrow.',
    image: 'https://images.pexels.com/photos/13565997/pexels-photo-13565997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Armchair,
    title: 'Built to Stay',
    text: 'Deep chairs, warm light, fast Wi-Fi and no rush. Stay for a chapter or stay for the whole book.',
    image: 'https://images.pexels.com/photos/2174069/pexels-photo-2174069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

const STEPS = [
  { icon: Bean, title: 'Source', text: 'Traceable, seasonal beans from farms we know by name.' },
  { icon: Flame, title: 'Roast', text: 'Small-batch roasting for bold, clean, unapologetic flavor.' },
  { icon: CupSoda, title: 'Brew', text: 'Every cup weighed, timed and tasted before it leaves the bar.' },
  { icon: Search, title: 'Curate', text: 'Books chosen by readers, for readers — refreshed every month.' },
  { icon: MessagesSquare, title: 'Gather', text: 'Clubs, poetry nights and author talks that spark real talk.' },
  { icon: Repeat, title: 'Return', text: 'Borrow a book, bring it back, and pick up where you left off.' },
];

export default function WhyChoose() {
  const why = useScrollReveal<HTMLElement>();
  const how = useScrollReveal<HTMLDivElement>();

  return (
    <section id="why" ref={why.ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-crimson-950/10 to-transparent pointer-events-none" />

      <div className="section-padding relative z-10">
        <SectionHeading
          eyebrow="Why XG Cafe"
          title={<>Why Readers <span className="gradient-text">Choose Us</span></>}
          subtitle="Plenty of places serve coffee. Few are built around the people who read with it."
          isVisible={why.isVisible}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {REASONS.map((r, i) => (
            <article
              key={r.title}
              className={`group glass-card-hover overflow-hidden transition-all duration-700 ${
                why.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-800 via-gunmetal-800/30 to-transparent" />
                <span className="absolute top-4 right-4 font-display text-5xl text-white/10 group-hover:text-crimson-500/40 transition-colors duration-500">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6 -mt-10 relative">
                <div className="w-12 h-12 rounded-xl bg-crimson-600 flex items-center justify-center mb-4 shadow-lg shadow-crimson-900/50 group-hover:rotate-6 transition-transform duration-300">
                  <r.icon size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg uppercase tracking-wider text-white mb-2 group-hover:text-crimson-400 transition-colors">{r.title}</h3>
                <p className="text-gunmetal-400 text-sm leading-relaxed">{r.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* How we brew */}
        <div ref={how.ref}>
          <SectionHeading
            eyebrow="The Process"
            title={<>How XG Cafe <span className="gradient-text">Delivers</span></>}
            subtitle="From green bean to last page — six steps we never skip."
            isVisible={how.isVisible}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`group relative glass-card-hover p-6 overflow-hidden transition-all duration-700 ${
                  how.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-crimson-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-crimson-600/15 border border-crimson-600/30 flex items-center justify-center group-hover:bg-crimson-600 transition-colors duration-300">
                    <s.icon size={20} className="text-crimson-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-display text-crimson-500 text-lg">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-heading font-semibold text-white uppercase tracking-wider">{s.title}</h3>
                    </div>
                    <p className="text-gunmetal-400 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
