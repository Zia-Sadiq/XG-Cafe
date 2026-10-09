import { useEffect, useState } from 'react';
import { Clock, MapPin, Users, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured, type Event } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FALLBACK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Poetry Night Vol. 12',
    description: 'An evening of spoken word, verse, and raw emotion. Bring your favorite poem or your own pen.',
    event_date: '2026-10-15',
    event_time: '19:00',
    location: 'Main Hall',
    capacity: 30,
    image_url: 'https://images.pexels.com/photos/4866043/pexels-photo-4866043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: '',
  },
  {
    id: '2',
    title: 'Mystery Book Club',
    description: 'This month: "The Silent Patient" by Alex Michaelides. Discussion, debate, and dark roast.',
    event_date: '2026-10-22',
    event_time: '18:00',
    location: 'Library Room',
    capacity: 15,
    image_url: 'https://images.pexels.com/photos/13565997/pexels-photo-13565997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: '',
  },
  {
    id: '3',
    title: 'Author Meet & Greet',
    description: 'Local author Elchin Rahimli reads from his debut novel. Q&A and signing after.',
    event_date: '2026-10-29',
    event_time: '17:00',
    location: 'Stage Area',
    capacity: 50,
    image_url: 'https://images.pexels.com/photos/37302575/pexels-photo-37302575.png?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: '',
  },
];

function formatDate(dateStr: string): { day: string; month: string; weekday: string } {
  const date = new Date(dateStr + 'T00:00:00');
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  };
}

export default function BookClub() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isSupabaseConfigured) {
        setEvents(FALLBACK_EVENTS);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true });

        if (error) throw error;
        setEvents(data && data.length > 0 ? data : FALLBACK_EVENTS);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        setEvents(FALLBACK_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleReserve = () => {
    document.querySelector('#reserve')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bookclub" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-crimson-950/10 to-transparent pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`grid lg:grid-cols-2 gap-8 items-end mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-crimson-600" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Kitab Klubu</span>
            </div>
            <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              The <span className="gradient-text">Book Club</span>
              <br />
              Sessions
            </h2>
          </div>
          <p className="text-gunmetal-300 text-base sm:text-lg leading-relaxed lg:pb-2">
            Join our monthly gatherings where literature meets latte. Discussions,
            readings, and events that bring the page to life. No pretension — just
            honest conversation over honest coffee.
          </p>
        </div>

        {/* Events */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-crimson-500 animate-spin" />
          </div>
        ) : error && events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle size={32} className="text-crimson-500" />
            <p className="text-gunmetal-400">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => {
              const date = formatDate(event.event_date);
              return (
                <div
                  key={event.id}
                  className={`group glass-card-hover overflow-hidden transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-800 via-gunmetal-800/20 to-transparent" />

                    {/* Date badge */}
                    <div className="absolute top-4 left-4 glass-card !rounded-xl p-2.5 text-center min-w-[60px]">
                      <div className="font-display text-2xl text-crimson-500 leading-none">{date.day}</div>
                      <div className="font-heading text-[10px] uppercase tracking-wider text-gunmetal-300 mt-1">{date.month}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-crimson-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-gunmetal-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    {/* Meta info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gunmetal-400 text-xs">
                        <Clock size={14} className="text-crimson-500" />
                        <span className="font-heading uppercase tracking-wider">{event.event_time}</span>
                        <span className="text-gunmetal-600">·</span>
                        <span className="font-heading uppercase tracking-wider">{date.weekday}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-gunmetal-400 text-xs">
                          <MapPin size={14} className="text-crimson-500" />
                          <span className="font-heading uppercase tracking-wider">{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gunmetal-400 text-xs">
                        <Users size={14} className="text-crimson-500" />
                        <span className="font-heading uppercase tracking-wider">Capacity: {event.capacity}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleReserve}
                      className="flex items-center justify-between w-full pt-3 border-t border-gunmetal-700 group/btn"
                    >
                      <span className="font-heading text-xs uppercase tracking-wider text-gunmetal-300 group-hover/btn:text-crimson-400 transition-colors">
                        Reserve a Spot
                      </span>
                      <ArrowRight size={16} className="text-crimson-500 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
