import { Coffee, BookOpen, Star, Zap } from 'lucide-react';

const ITEMS = [
  { text: 'Bold Coffee', icon: Coffee },
  { text: 'Deep Stories', icon: BookOpen },
  { text: 'Fierce Community', icon: Zap },
  { text: 'No Shortcuts', icon: Star },
  { text: 'Crafted Daily', icon: Coffee },
  { text: 'Read Fiercely', icon: BookOpen },
  { text: 'Drink Deeply', icon: Zap },
  { text: 'Unapologetic', icon: Star },
];

export default function Marquee() {
  return (
    <div className="relative py-6 bg-crimson-600 overflow-hidden">
      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-crimson-800/50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-crimson-800/50" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6">
            <item.icon size={20} className="text-crimson-200 flex-shrink-0" />
            <span className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-white">
              {item.text}
            </span>
            <span className="text-crimson-300 ml-3 text-2xl">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
