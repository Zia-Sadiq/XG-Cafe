import { Coffee, BookOpen, Users, Calendar, type LucideIcon } from 'lucide-react';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

const STATS = [
  { icon: Coffee, value: 50, suffix: '+', label: 'Coffee Blends' },
  { icon: BookOpen, value: 1200, suffix: '+', label: 'Books in Library' },
  { icon: Users, value: 3000, suffix: '+', label: 'Happy Readers' },
  { icon: Calendar, value: 48, suffix: '+', label: 'Events Hosted' },
];

export default function Stats() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-20 overflow-hidden border-y border-gunmetal-800">
      <div className="absolute inset-0 bg-gradient-to-r from-crimson-950/40 via-gunmetal-950 to-crimson-950/40" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="section-padding relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} {...stat} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  index,
  isVisible,
}: {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  index: number;
  isVisible: boolean;
}) {
  const count = useCountUp(value, 2200, isVisible);

  return (
    <div
      className={`group text-center px-4 lg:border-l first:border-l-0 border-gunmetal-800 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <Icon size={22} className="mx-auto mb-3 text-crimson-500 group-hover:scale-125 transition-transform duration-300" />
      <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
        {count.toLocaleString()}
        <span className="text-crimson-500">{suffix}</span>
      </div>
      <div className="mt-2 font-heading text-xs uppercase tracking-[0.25em] text-gunmetal-400">{label}</div>
    </div>
  );
}
