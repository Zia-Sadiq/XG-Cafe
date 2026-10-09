import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured, NOT_CONFIGURED_MESSAGE } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACT_INFO = [
  { icon: MapPin, label: 'Address', value: 'Nizami Street 24, Baku, Azerbaijan' },
  { icon: Phone, label: 'Phone', value: '+994 50 123 45 67' },
  { icon: Mail, label: 'Email', value: 'hello@xgcafe.az' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri 08:00–22:00 · Sat 09:00–23:00' },
];

export default function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

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
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        subject: form.subject || null,
        message: form.message,
      });

      if (error) throw error;

      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gunmetal-950 via-gunmetal-900/50 to-gunmetal-950 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson-600/50 to-transparent" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-crimson-600" />
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">Get in Touch</span>
            <div className="h-px w-12 bg-crimson-600" />
          </div>
          <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Say <span className="gradient-text">Hello</span>
          </h2>
          <p className="text-gunmetal-400 max-w-xl mx-auto text-base sm:text-lg">
            Questions, collaborations, or just want to chat about books and coffee?
            We're listening.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className={`space-y-4 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {CONTACT_INFO.map((info, i) => (
              <div
                key={info.label}
                className={`glass-card-hover p-5 flex items-center gap-4 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-crimson-600/15 border border-crimson-600/30 flex items-center justify-center">
                  <info.icon size={22} className="text-crimson-500" />
                </div>
                <div>
                  <div className="font-heading text-xs uppercase tracking-wider text-crimson-500 mb-1">
                    {info.label}
                  </div>
                  <div className="text-gunmetal-200 text-sm">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="glass-card p-1 rounded-2xl overflow-hidden h-48 mt-6">
              <div className="w-full h-full rounded-xl bg-gunmetal-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="relative text-center">
                  <MapPin size={32} className="text-crimson-500 mx-auto mb-2 animate-bounce-subtle" />
                  <p className="font-heading text-sm uppercase tracking-wider text-gunmetal-300">
                    Nizami Street 24, Baku
                  </p>
                  <p className="text-gunmetal-500 text-xs mt-1">Click to view on map</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
              {success && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-crimson-600/15 border border-crimson-600/40 text-crimson-300 text-sm animate-fade-in">
                  <CheckCircle2 size={16} />
                  Message sent! We'll get back to you soon.
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-crimson-950/50 border border-crimson-800/50 text-crimson-300 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-heading text-xs uppercase tracking-wider text-gunmetal-300">
                    Name <span className="text-crimson-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-heading text-xs uppercase tracking-wider text-gunmetal-300">
                    Email <span className="text-crimson-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@email.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-heading text-xs uppercase tracking-wider text-gunmetal-300">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="What's on your mind?"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block mb-2 font-heading text-xs uppercase tracking-wider text-gunmetal-300">
                  Message <span className="text-crimson-500">*</span>
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us everything..."
                  rows={5}
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
