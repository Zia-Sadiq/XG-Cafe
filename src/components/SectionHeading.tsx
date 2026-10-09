import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  isVisible: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeading({ eyebrow, title, subtitle, isVisible, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={`mb-12 transition-all duration-800 ${centered ? 'text-center' : ''} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-12 bg-crimson-600" />
        <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">{eyebrow}</span>
        {centered && <div className="h-px w-12 bg-crimson-600" />}
      </div>
      <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">{title}</h2>
      {subtitle && (
        <p className={`text-gunmetal-400 text-base sm:text-lg ${centered ? 'max-w-xl mx-auto' : 'max-w-2xl'}`}>{subtitle}</p>
      )}
    </div>
  );
}
