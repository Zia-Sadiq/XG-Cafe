import { useState, type FormEvent, type ReactNode } from 'react';
import { Calendar, Clock, Users, User, Mail, Phone, CheckCircle2, Loader2, AlertCircle, MessageSquare, type LucideIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured, NOT_CONFIGURED_MESSAGE, type Reservation } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
];

export default function ReservationSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    party_size: '2',
    notes: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError(NOT_CONFIGURED_MESSAGE);
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const payload: Omit<Reservation, 'id' | 'created_at' | 'status'> = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        date: form.date,
        time: form.time,
        party_size: parseInt(form.party_size, 10),
        notes: form.notes || null,
      };

      const { error } = await supabase.from('reservations').insert(payload);

      if (error) throw error;

      setSuccess(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', party_size: '2', notes: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit reservation');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="reserve" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
        <div className="section-padding relative z-10">
          <div className={`max-w-lg mx-auto text-center glass-card p-10 transition-all duration-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-crimson-600/15 border-2 border-crimson-600/40 flex items-center justify-center animate-pulse-glow">
              <CheckCircle2 size={36} className="text-crimson-500" />
            </div>
            <h3 className="heading-section text-2xl sm:text-3xl text-white mb-4">Reservation Received</h3>
            <p className="text-gunmetal-300 mb-8 leading-relaxed">
              Your table request is in. We'll confirm via email shortly. Get ready
              for great coffee and great conversation.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-outline"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gunmetal-900 via-gunmetal-950 to-gunmetal-900 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson-600/50 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-crimson-600" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Reservations</span>
            </div>
            <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
              Claim <span className="gradient-text">Your Seat</span>
            </h2>
            <p className="text-gunmetal-300 text-base sm:text-lg leading-relaxed mb-8">
              Whether it's a quiet morning with a book or a lively evening with
              friends — reserve your table and we'll have the coffee ready.
            </p>

            {/* Hours */}
            <div className="glass-card p-6 mb-6">
              <h3 className="font-heading text-sm uppercase tracking-wider text-crimson-500 mb-4">Opening Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday — Friday', hours: '08:00 — 22:00' },
                  { day: 'Saturday', hours: '09:00 — 23:00' },
                  { day: 'Sunday', hours: '10:00 — 20:00' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between text-sm">
                    <span className="text-gunmetal-300 font-heading uppercase tracking-wider">{item.day}</span>
                    <span className="text-white font-heading">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gunmetal-400 text-sm">
                <Users size={18} className="text-crimson-500" />
                <span>Up to 12 guests</span>
              </div>
              <div className="flex items-center gap-2 text-gunmetal-400 text-sm">
                <Clock size={18} className="text-crimson-500" />
                <span>2-hour slots</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-crimson-950/50 border border-crimson-800/50 text-crimson-300 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField icon={User} label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="input-field"
                  />
                </FormField>
                <FormField icon={Mail} label="Email" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@email.com"
                    className="input-field"
                  />
                </FormField>
              </div>

              <FormField icon={Phone} label="Phone (optional)">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+994 ..."
                  className="input-field"
                />
              </FormField>

              <div className="grid sm:grid-cols-3 gap-4">
                <FormField icon={Calendar} label="Date" required>
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="input-field"
                  />
                </FormField>
                <FormField icon={Clock} label="Time" required>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="input-field cursor-pointer"
                  >
                    <option value="">Select</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FormField>
                <FormField icon={Users} label="Guests" required>
                  <select
                    required
                    value={form.party_size}
                    onChange={(e) => handleChange('party_size', e.target.value)}
                    className="input-field cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField icon={MessageSquare} label="Special Requests (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Window seat, birthday celebration, book club meeting..."
                  rows={3}
                  className="input-field resize-none"
                />
              </FormField>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Reserve My Table'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  icon: Icon,
  label,
  required,
  children,
}: {
  icon: LucideIcon;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-2 font-heading text-xs uppercase tracking-wider text-gunmetal-300">
        <Icon size={14} className="text-crimson-500" />
        {label}
        {required && <span className="text-crimson-500">*</span>}
      </label>
      {children}
    </div>
  );
}
