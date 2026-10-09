import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useActiveSection, useScrollProgress } from '../hooks/useScrollReveal';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Book Club', href: '#bookclub' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// Module-level so the observer in useActiveSection isn't rebuilt on every render.
const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string, e?: MouseEvent) => {
    e?.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-700 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-gunmetal-950/90 backdrop-blur-xl py-3 shadow-lg shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          <Logo size={scrolled ? 'sm' : 'md'} />

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => handleNavClick('#reserve')}
              className="btn-primary !px-6 !py-2.5 !text-xs"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 text-gunmetal-200 hover:text-crimson-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gunmetal-950/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`font-heading text-2xl uppercase tracking-widest transition-all duration-500 ${
                mobileOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              } ${
                activeSection === link.href.slice(1)
                  ? 'text-crimson-500'
                  : 'text-gunmetal-300 hover:text-white'
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => handleNavClick('#reserve')}
            className="btn-primary mt-4"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: `opacity 0.5s ${NAV_LINKS.length * 60 + 200}ms`,
            }}
          >
            Book a Table
          </button>
        </div>
      </div>
    </>
  );
}
