import { useEffect, useState } from 'react';
import { BookOpen, Coffee } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useScrollReveal';

// A 3D "open book" that auto-turns its pages — the cover swings open, then each
// chapter flips over the spine and lands on the left-hand page.

const CHAPTERS = [
  { title: 'The Espresso Bar', note: 'Pulled bold, served fast', image: 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'House Roastery', note: 'Beans roasted in-house', image: 'https://images.pexels.com/photos/16556498/pexels-photo-16556498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'The Library', note: '1,200+ books to borrow', image: 'https://images.pexels.com/photos/13565997/pexels-photo-13565997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Poetry Nights', note: 'Open mic, every month', image: 'https://images.pexels.com/photos/4866043/pexels-photo-4866043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Author Talks', note: 'Readings & signings', image: 'https://images.pexels.com/photos/37302575/pexels-photo-37302575.png?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'The Lounge', note: 'Stay as long as the story', image: 'https://images.pexels.com/photos/2174069/pexels-photo-2174069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

type Slide = { kind: 'toc' } | { kind: 'chapter'; i: number };

const SLIDES: Slide[] = [{ kind: 'toc' }, ...CHAPTERS.map((_, i) => ({ kind: 'chapter' as const, i }))];

// Step 0 = closed cover, step 1 = cover open, step n = n-1 pages turned.
const STEPS = SLIDES.length + 1;
const INTERVAL_MS = 3200;

export default function Book() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const next = () => setStep((s) => (s + 1) % STEPS);
  const prev = () => setStep((s) => (s - 1 + STEPS) % STEPS);

  const coverOpen = step > 0;
  const leftSlide = step > 1 ? SLIDES[step - 2] : null;
  const flip = reduced ? '' : 'transition-[transform,filter] duration-[700ms] ease-in-out';

  return (
    <div
      className="relative w-full max-w-xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Floor shadows + glow */}
      <div className="absolute inset-x-8 -bottom-10 h-12 rounded-full bg-black/60 blur-3xl" aria-hidden="true" />
      <div className="absolute -inset-10 bg-crimson-600/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative" style={{ perspective: reduced ? undefined : '2200px' }}>
        <div style={{ transform: reduced ? 'rotate(-1deg)' : 'rotate(-1deg) rotateX(6deg)' }} className="relative">
          {/* Page-edge stacks */}
          <div className="absolute inset-y-4 -left-2 w-4 rounded-l-lg bg-gradient-to-b from-gunmetal-600 via-gunmetal-400 to-gunmetal-600" aria-hidden="true" />
          <div className="absolute inset-y-3 -left-1 w-3 rounded-l-lg bg-gradient-to-b from-gunmetal-300 via-gunmetal-100 to-gunmetal-300" aria-hidden="true" />
          <div className="absolute inset-y-4 -right-2 w-4 rounded-r-lg bg-gradient-to-b from-gunmetal-600 via-gunmetal-400 to-gunmetal-600" aria-hidden="true" />
          <div className="absolute inset-y-3 -right-1 w-3 rounded-r-lg bg-gradient-to-b from-gunmetal-300 via-gunmetal-100 to-gunmetal-300" aria-hidden="true" />

          <div
            className="relative flex aspect-[4/3] overflow-hidden rounded-2xl border border-gunmetal-700 bg-gunmetal-900 shadow-2xl shadow-black/60"
            style={{ perspective: reduced ? undefined : '2600px' }}
          >
            {/* Left page — the last page turned, or the inside cover */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous page"
              className="relative h-full w-1/2 overflow-hidden text-left cursor-w-resize"
            >
              {leftSlide ? (
                <div key={step} className={`h-full ${reduced ? '' : 'animate-page-in'}`}>
                  <Page slide={leftSlide} />
                </div>
              ) : (
                <InsideCover />
              )}
            </button>

            {/* Spine */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-12 -translate-x-1/2 flex justify-center" aria-hidden="true">
              <div className="h-full w-[2px] bg-black/50 shadow-[-15px_0_15px_rgba(0,0,0,0.55),5px_0_5px_rgba(0,0,0,0.55)]" />
            </div>

            {/* Right page stack — each page flips over the spine in turn */}
            <button
              type="button"
              onClick={next}
              aria-label="Next page"
              className="relative h-full w-1/2 overflow-hidden text-left cursor-e-resize"
              style={{ perspective: reduced ? undefined : '1400px' }}
            >
              {SLIDES.map((slide, i) => {
                const turned = i < step - 1;
                return (
                  <div
                    key={i}
                    className={`backface-hidden absolute inset-0 origin-left ${flip}`}
                    style={{
                      transform: turned ? 'rotateY(150deg)' : 'none',
                      filter: turned ? 'brightness(0.5)' : 'none',
                      zIndex: SLIDES.length - i,
                    }}
                  >
                    <Page slide={slide} />
                  </div>
                );
              })}
            </button>

            {/* Front cover */}
            <div
              className={`pointer-events-none backface-hidden absolute inset-y-0 right-0 w-1/2 z-[100] origin-left bg-gunmetal-950 border-l border-crimson-900/60 ${flip}`}
              style={{ transform: coverOpen ? 'rotateY(150deg)' : 'none' }}
            >
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-br from-crimson-900/40 via-transparent to-crimson-950/60" />
              <div className="absolute inset-3 border border-crimson-700/40 rounded-lg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="flex items-center gap-1">
                  <Coffee className="text-crimson-500 w-6 h-6 sm:w-9 sm:h-9" />
                  <BookOpen className="text-gunmetal-300 w-4 h-4 sm:w-6 sm:h-6 -ml-1" />
                </div>
                <div>
                  <p className="font-heading text-[0.55rem] sm:text-xs uppercase tracking-[0.3em] text-crimson-400">Kitab Klubu</p>
                  <h3 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl text-white leading-none">
                    XG <span className="gradient-text">Cafe</span>
                  </h3>
                  <p className="mt-2 font-heading text-[0.5rem] sm:text-[0.65rem] uppercase tracking-widest text-gunmetal-400">
                    A house of coffee & stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="relative mt-10 flex items-center justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: STEPS }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-6 bg-crimson-500' : 'w-1.5 bg-gunmetal-600'}`}
          />
        ))}
      </div>
    </div>
  );
}

function InsideCover() {
  return (
    <div className="h-full w-full bg-gunmetal-900 p-4 sm:p-6 flex flex-col justify-end relative">
      <div className="absolute inset-0 bg-noise opacity-60" />
      <p className="relative font-heading text-[0.55rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-gunmetal-500">Ex Libris</p>
      <p className="relative mt-1 font-body italic text-gunmetal-300 text-[0.65rem] sm:text-sm leading-snug">
        “A good cup and a good page — the rest can wait.”
      </p>
    </div>
  );
}

function Page({ slide }: { slide: Slide }) {
  if (slide.kind === 'toc') {
    return (
      <div className="h-full w-full bg-gunmetal-100 p-3 sm:p-5 lg:p-6">
        <p className="font-heading text-[0.5rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-crimson-600">Contents</p>
        <h3 className="mt-1 font-display text-base sm:text-2xl lg:text-3xl leading-none text-gunmetal-900">
          Inside <span className="text-crimson-600">XG Cafe</span>
        </h3>
        <ol className="mt-2 sm:mt-4 space-y-0.5 sm:space-y-1.5">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} className="flex items-baseline gap-1.5 text-[0.55rem] sm:text-xs text-gunmetal-600 border-b border-dashed border-gunmetal-300 pb-0.5">
              <span className="font-display text-crimson-600 text-[0.6rem] sm:text-sm">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 truncate font-heading uppercase tracking-wide">{c.title}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const chapter = CHAPTERS[slide.i];
  return (
    <div className="h-full w-full bg-gunmetal-100 p-1.5 sm:p-2">
      <div className="relative h-full w-full overflow-hidden rounded-sm">
        <img src={chapter.image} alt={chapter.title} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunmetal-950/90 via-gunmetal-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5">
          <p className="font-heading text-[0.55rem] sm:text-xs uppercase tracking-wider text-crimson-400">
            {String(slide.i + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
          </p>
          <h3 className="mt-0.5 font-display text-sm sm:text-2xl lg:text-3xl leading-none text-white">{chapter.title}</h3>
          <p className="hidden sm:block mt-1 text-[0.7rem] text-gunmetal-300">{chapter.note}</p>
        </div>
      </div>
    </div>
  );
}
