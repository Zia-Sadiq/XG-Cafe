import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeading from './SectionHeading';

const FAQS = [
  {
    q: 'Do I need a reservation?',
    a: 'Walk-ins are always welcome. For groups of 4+ or evening events we recommend reserving a table through the form above.',
  },
  {
    q: 'Can I borrow books from the library?',
    a: 'Yes. Read anything in-house for free. Members can borrow up to two books at a time for two weeks — just ask at the bar.',
  },
  {
    q: 'How do I join the Kitab Klubu?',
    a: 'Come to any session listed in the Book Club section. Your first meeting is free, and the monthly title is always on sale at the counter.',
  },
  {
    q: 'Do you have vegan or dairy-free options?',
    a: 'All our drinks can be made with oat, almond or soy milk, and we always have at least two vegan desserts on the menu.',
  },
  {
    q: 'Can I host a private event or book launch?',
    a: 'Absolutely. Our Stage Area seats up to 50. Send us a message through the contact form with your date and idea.',
  },
  {
    q: 'Is there Wi-Fi and power for working?',
    a: 'Fast Wi-Fi and plenty of sockets. We keep the Library Room quiet for reading and focused work.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-gunmetal-900/50">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="section-padding relative z-10 max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, <span className="gradient-text">Answered</span></>}
          isVisible={isVisible}
        />

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`glass-card overflow-hidden transition-all duration-700 ${isOpen ? '!border-crimson-600/60' : ''} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className={`font-heading font-semibold uppercase tracking-wider text-sm sm:text-base transition-colors ${isOpen ? 'text-crimson-400' : 'text-white'}`}>
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-crimson-600 border-crimson-600 rotate-45' : 'border-gunmetal-600'
                    }`}
                  >
                    <Plus size={16} className="text-white" />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-6 text-gunmetal-300 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
