import { useEffect, useState } from 'react';
import { Instagram, Facebook, Twitter, ArrowUp, Coffee, Heart } from 'lucide-react';
import Logo from './Logo';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Book Club', href: '#bookclub' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reserve', href: '#reserve' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gunmetal-950 border-t border-gunmetal-800 overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-crimson-600/60 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="section-padding relative z-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="lg" className="mb-5" />
            <p className="text-gunmetal-400 text-sm leading-relaxed mb-6">
              Where bold coffee meets great literature. A cafe and book club in
              the heart of Baku, built for those who drink deeply and read fiercely.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gunmetal-800 border border-gunmetal-700 flex items-center justify-center text-gunmetal-400 hover:bg-crimson-600 hover:text-white hover:border-crimson-600 transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-white mb-5">Navigate</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-gunmetal-400 text-sm hover:text-crimson-400 transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-white mb-5">Visit Us</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gunmetal-400">Nizami Street 24<br />Baku, Azerbaijan</p>
              <p className="text-gunmetal-400">
                <a href="tel:+994501234567" className="hover:text-crimson-400 transition-colors">
                  +994 50 123 45 67
                </a>
              </p>
              <p className="text-gunmetal-400">
                <a href="mailto:hello@xgcafe.az" className="hover:text-crimson-400 transition-colors">
                  hello@xgcafe.az
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-white mb-5">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gunmetal-400">
                <span>Mon–Fri</span>
                <span className="text-gunmetal-300">08:00–22:00</span>
              </div>
              <div className="flex justify-between text-gunmetal-400">
                <span>Saturday</span>
                <span className="text-gunmetal-300">09:00–23:00</span>
              </div>
              <div className="flex justify-between text-gunmetal-400">
                <span>Sunday</span>
                <span className="text-gunmetal-300">10:00–20:00</span>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('#reserve')}
              className="mt-5 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-wider text-crimson-500 hover:text-crimson-400 transition-colors"
            >
              <Coffee size={14} />
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gunmetal-800 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gunmetal-500 text-xs text-center sm:text-left">
            © {currentYear} XG Cafe Kitab Klubu. All rights reserved.
          </p>
          <p className="text-gunmetal-500 text-xs flex items-center gap-1.5">
            Made with <Heart size={12} className="text-crimson-500 fill-crimson-500" /> in Baku
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-crimson-600 text-white flex items-center justify-center shadow-lg shadow-crimson-600/30 transition-all duration-300 hover:bg-crimson-500 hover:scale-110 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
