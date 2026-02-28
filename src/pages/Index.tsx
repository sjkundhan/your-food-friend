import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { menuItems, categories } from "@/data/menuData";
import { MenuItem } from "@/data/menuData";
import { FoodCard } from "@/components/FoodCard";
import { Cart, CartItem } from "@/components/Cart";
import heroFood from "@/assets/hero-food.jpg";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display font-black text-2xl text-gradient">
            ForkIt
          </a>
          <div className="hidden md:flex items-center gap-6 font-body text-sm text-muted-foreground">
            <a href="#menu" className="hover:text-foreground transition-colors">Menu</a>
            <a href="#" className="hover:text-foreground transition-colors">Track Order</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
          <button className="font-body text-sm font-semibold bg-secondary text-secondary-foreground px-4 py-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden flex items-center">
        <img
          src={heroFood}
          alt="Delicious food spread"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="font-body text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              🚀 Fast delivery · 30 min avg
            </p>
            <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-tight mb-6">
              Cravings,<br />
              <span className="text-gradient">Delivered.</span>
            </h1>
            <p className="font-body text-white/70 text-lg mb-8 max-w-md">
              Gourmet flavors from the best restaurants in your city. Order in seconds, eat in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="text"
                placeholder="Search dishes, cuisines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-white/95 text-foreground placeholder:text-muted-foreground font-body px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-primary text-base"
              />
              <a
                href="#menu"
                className="bg-primary text-primary-foreground font-body font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Search size={18} />
                Search
              </a>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 md:gap-16 font-body text-sm font-medium flex-wrap">
            <span>⭐ 4.8 Average Rating</span>
            <span>🍽️ 200+ Dishes</span>
            <span>🚀 30 Min Delivery</span>
            <span>🏙️ 50+ Restaurants</span>
          </div>
        </div>
      </section>

      {/* Menu section */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="font-display font-bold text-4xl text-foreground mb-2">Our Menu</h2>
          <p className="font-body text-muted-foreground">Fresh ingredients, bold flavors, fast delivery</p>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-medium text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search bar (desktop) */}
        {search && (
          <div className="mb-6 flex items-center gap-2">
            <p className="font-body text-muted-foreground text-sm">
              Showing results for "<span className="text-foreground font-semibold">{search}</span>"
            </p>
            <button
              onClick={() => setSearch("")}
              className="text-xs text-primary hover:underline font-body"
            >
              Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">😔</div>
            <p className="font-display font-bold text-xl text-foreground">No dishes found</p>
            <p className="font-body text-muted-foreground mt-2">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-sm">
          <span className="font-display font-black text-xl text-gradient">ForkIt</span>
          <p className="text-background/50">© 2024 ForkIt. Delivering happiness, one meal at a time.</p>
          <div className="flex gap-6 text-background/50">
            <a href="#" className="hover:text-background transition-colors">Terms</a>
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={() => setCartItems([])}
      />
    </div>
  );
};

export default Index;
