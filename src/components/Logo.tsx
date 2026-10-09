import { Coffee, BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 32 : 24;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-crimson-600/20 blur-lg rounded-full animate-pulse-glow" />
        <div className="relative flex items-center gap-0.5">
          <Coffee size={iconSize} className="text-crimson-500" />
          <BookOpen size={iconSize * 0.7} className="text-gunmetal-300 -ml-1" />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display tracking-wider text-white ${textSize}`}>
            XG CAFE
          </span>
          <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-crimson-500">
            Kitab Klubu
          </span>
        </div>
      )}
    </div>
  );
}
