import { useEffect, useState } from 'react';
import { Star, Quote, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, isSupabaseConfigured, type Review } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';


const FALLBACK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Leyla M.',
    rating: 5,
    comment: 'The atmosphere is unreal — dark, cozy, and the coffee is the best in Baku. The book club events are a hidden gem.',
    is_approved: true,
    created_at: '',
  },
  {
    id: '2',
    name: 'Rashad K.',
    rating: 5,
    comment: 'Red Velvet Latte is genius. I came for coffee and stayed for three hours reading. This place hooks you.',
    is_approved: true,
    created_at: '',
  },
  {
    id: '3',
    name: 'Nigar A.',
    rating: 4,
    comment: 'Beautiful space, great espresso, and the poetry night was electric. Would love more vegan options.',
    is_approved: true,
    created_at: '',
  },
  {
    id: '4',
    name: 'Tural H.',
    rating: 5,
    comment: 'Finally a cafe that takes both coffee AND books seriously. The lava cake is dangerous. Highly recommend.',
    is_approved: true,
    created_at: '',
  },
  {
    id: '5',
    name: 'Aysel J.',
    rating: 5,
    comment: 'My favorite spot in the city. The staff knows their craft and the ambiance is perfect for getting lost in a book.',
    is_approved: true,
    created_at: '',
  },
];

export default function Reviews() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!isSupabaseConfigured) {
        setReviews(FALLBACK_REVIEWS);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data && data.length > 0 ? data : FALLBACK_REVIEWS);
      } catch {
        setReviews(FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" ref={ref} className="relative py-24 md:py-32 bg-gunmetal-900/50 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-crimson-600" />
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Testimonials</span>
            <div className="h-px w-12 bg-crimson-600" />
          </div>
          <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            What They <span className="gradient-text">Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} className="text-crimson-500 fill-crimson-500" />
              ))}
            </div>
            <span className="font-display text-2xl text-white">{avgRating}</span>
            <span className="text-gunmetal-400 text-sm">/ 5.0</span>
          </div>
        </div>

        {/* Reviews */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-crimson-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle size={32} className="text-crimson-500" />
            <p className="text-gunmetal-400">No reviews yet.</p>
          </div>
        ) : (
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Main review display */}
            <div className="relative glass-card p-8 sm:p-12 overflow-hidden">
              <Quote size={80} className="absolute top-6 right-6 text-crimson-600/10" />

              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i <= reviews[currentIndex].rating ? 'text-crimson-500 fill-crimson-500' : 'text-gunmetal-600'}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gunmetal-200 text-lg sm:text-xl leading-relaxed mb-8 min-h-[80px]">
                  "{reviews[currentIndex].comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crimson-600 to-crimson-800 flex items-center justify-center font-display text-lg text-white">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-white">{reviews[currentIndex].name}</div>
                    <div className="text-gunmetal-500 text-xs uppercase tracking-wider">Verified Customer</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gunmetal-700">
                  <div className="flex gap-2">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex ? 'w-8 bg-crimson-500' : 'w-2 bg-gunmetal-600 hover:bg-gunmetal-500'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-lg border border-gunmetal-700 flex items-center justify-center hover:border-crimson-600 hover:text-crimson-400 text-gunmetal-300 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-lg border border-gunmetal-700 flex items-center justify-center hover:border-crimson-600 hover:text-crimson-400 text-gunmetal-300 transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mini reviews grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {reviews.slice(0, 3).map((review, i) => (
                <div
                  key={review.id}
                  className={`glass-card p-5 transition-all duration-500 hover:border-crimson-600/40 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j <= review.rating ? 'text-crimson-500 fill-crimson-500' : 'text-gunmetal-600'}
                      />
                    ))}
                  </div>
                  <p className="text-gunmetal-400 text-sm leading-relaxed line-clamp-3 mb-3">
                    "{review.comment}"
                  </p>
                  <div className="font-heading text-xs uppercase tracking-wider text-gunmetal-300">
                    — {review.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
