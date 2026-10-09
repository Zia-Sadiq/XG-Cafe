import { useEffect, useState } from 'react';
import { Coffee, Plus, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured, type MenuItem, type MenuCategory } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATEGORIES: { key: MenuCategory | 'all'; label: string; icon?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'tea', label: 'Tea' },
  { key: 'cold_drinks', label: 'Cold Drinks' },
  { key: 'food', label: 'Food' },
  { key: 'desserts', label: 'Desserts' },
];

const img = (id: string, ext = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&h=650&w=940`;

// Shown when the database is empty or unreachable, so the menu is never blank.
const FALLBACK_MENU: MenuItem[] = [
  { id: 'f1', name: 'XG Signature Espresso', description: 'Double shot of our house dark roast. Thick crema, cocoa finish, zero apologies.', price: 4.5, category: 'coffee', image_url: img('4927237'), is_featured: true, sort_order: 1, created_at: '' },
  { id: 'f2', name: 'Red Velvet Latte', description: 'Espresso, steamed milk and red velvet syrup with a cocoa dust crown.', price: 7, category: 'coffee', image_url: img('984162'), is_featured: true, sort_order: 2, created_at: '' },
  { id: 'f3', name: 'Flat White', description: 'Silky microfoam over a ristretto double. Small, strong, perfect.', price: 5.5, category: 'coffee', image_url: img('16556498'), is_featured: false, sort_order: 3, created_at: '' },
  { id: 'f4', name: 'Azerbaijani Black Tea', description: 'Served the traditional way in an armudu glass with lemon and jam.', price: 3.5, category: 'tea', image_url: img('2174069'), is_featured: false, sort_order: 4, created_at: '' },
  { id: 'f5', name: 'Cold Brew Tonic', description: '18-hour cold brew over tonic and ice with a twist of orange.', price: 6.5, category: 'cold_drinks', image_url: img('39910775'), is_featured: true, sort_order: 5, created_at: '' },
  { id: 'f6', name: 'Iced Mocha', description: 'Espresso, dark chocolate and cold milk over ice.', price: 6, category: 'cold_drinks', image_url: img('35380735', 'png'), is_featured: false, sort_order: 6, created_at: '' },
  { id: 'f7', name: 'Reader’s Toast', description: 'Sourdough, smashed avocado, feta and chilli oil. Fuel for chapter two.', price: 9, category: 'food', image_url: img('30405795'), is_featured: false, sort_order: 7, created_at: '' },
  { id: 'f8', name: 'Molten Lava Cake', description: 'Dark chocolate cake with a liquid centre. Dangerous. Served warm.', price: 8, category: 'desserts', image_url: img('13565997'), is_featured: true, sort_order: 8, created_at: '' },
];

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!isSupabaseConfigured) {
        setItems(FALLBACK_MENU);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setItems(data && data.length > 0 ? data : FALLBACK_MENU);
      } catch (err) {
        console.error('Failed to load menu:', err);
        setItems(FALLBACK_MENU);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" ref={ref} className="relative py-24 md:py-32 bg-gunmetal-900/50 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson-600/50 to-transparent" />

      <div className="section-padding relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-crimson-600" />
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-crimson-500">The Menu</span>
            <div className="h-px w-12 bg-crimson-600" />
          </div>
          <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Brewed <span className="gradient-text">Bold</span>
          </h2>
          <p className="text-gunmetal-400 max-w-xl mx-auto text-base sm:text-lg">
            Every item crafted with precision. No compromises, no shortcuts.
          </p>
        </div>

        {/* Category tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-lg font-heading text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                activeCategory === cat.key
                  ? 'bg-crimson-600 text-white shadow-lg shadow-crimson-600/30'
                  : 'bg-gunmetal-800 text-gunmetal-300 hover:bg-gunmetal-700 hover:text-white border border-gunmetal-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="text-crimson-500 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                isVisible={isVisible}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedItem && (
        <MenuDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}

function MenuCard({
  item,
  index,
  isVisible,
  onClick,
}: {
  item: MenuItem;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group glass-card-hover cursor-pointer overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gunmetal-700 flex items-center justify-center">
            <Coffee size={32} className="text-gunmetal-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-900 via-transparent to-transparent" />
        {item.is_featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-crimson-600 text-white font-heading text-[10px] uppercase tracking-wider">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gunmetal-950/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Plus size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-white text-base group-hover:text-crimson-400 transition-colors duration-300">
            {item.name}
          </h3>
          <span className="font-display text-lg text-crimson-500 whitespace-nowrap">
            {item.price.toFixed(2)}₼
          </span>
        </div>
        {item.description && (
          <p className="text-gunmetal-400 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

function MenuDetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gunmetal-950/80 backdrop-blur-md" />
      <div
        className="relative glass-card max-w-md w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56">
          {item.image_url && (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-800 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gunmetal-950/70 backdrop-blur-sm flex items-center justify-center hover:bg-crimson-600 transition-colors"
          >
            <Plus size={18} className="text-white rotate-45" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-gunmetal-700 text-gunmetal-300 font-heading text-[10px] uppercase tracking-wider">
              {item.category.replace('_', ' ')}
            </span>
            {item.is_featured && (
              <span className="px-2.5 py-1 rounded-full bg-crimson-600 text-white font-heading text-[10px] uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          <h3 className="font-heading font-bold text-2xl text-white mb-3">{item.name}</h3>
          {item.description && (
            <p className="text-gunmetal-300 text-sm leading-relaxed mb-4">{item.description}</p>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-gunmetal-700">
            <span className="font-heading text-sm uppercase tracking-wider text-gunmetal-400">Price</span>
            <span className="font-display text-3xl text-crimson-500">{item.price.toFixed(2)}₼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
