import { useState } from 'react';

import { X, ZoomIn } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const GALLERY_IMAGES = [
  { url: 'https://images.pexels.com/photos/984162/pexels-photo-984162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Neon sign in cafe', span: 'lg:col-span-2 lg:row-span-2' },
  { url: 'https://images.pexels.com/photos/2174069/pexels-photo-2174069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Warm coffee shop interior', span: '' },
  { url: 'https://images.pexels.com/photos/39910775/pexels-photo-39910775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Friends at cafe', span: '' },
  { url: 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Barista pouring latte art', span: 'lg:col-span-2' },
  { url: 'https://images.pexels.com/photos/16556498/pexels-photo-16556498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Roasted coffee beans', span: '' },
  { url: 'https://images.pexels.com/photos/35380735/pexels-photo-35380735.png?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Cafe patrons', span: '' },
];

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="relative py-24 md:py-32 bg-gunmetal-900/50 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-crimson-600" />
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Gallery</span>
            <div className="h-px w-12 bg-crimson-600" />
          </div>
          <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            The <span className="gradient-text">Vibe</span>
          </h2>
          <p className="text-gunmetal-400 max-w-xl mx-auto text-base sm:text-lg">
            Step inside. Feel the atmosphere. This is where stories brew.
          </p>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${img.span} ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-48 lg:h-full min-h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-crimson-600/80 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-white text-xs font-heading uppercase tracking-wider">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="absolute inset-0 bg-gunmetal-950/90 backdrop-blur-md" />
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gunmetal-800 flex items-center justify-center hover:bg-crimson-600 transition-colors z-10"
          >
            <X size={20} className="text-white" />
          </button>
          <img
            src={GALLERY_IMAGES[lightboxIndex].url}
            alt={GALLERY_IMAGES[lightboxIndex].alt}
            className="relative max-w-full max-h-[85vh] rounded-xl object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
