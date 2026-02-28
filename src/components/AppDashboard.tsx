import { useState, useEffect } from "react";
import foodieLogo from "@/assets/foodie-logo.png";
import RestaurantsSection from "@/components/RestaurantsSection";
import MenuSection from "@/components/MenuSection";
import MyOrdersSection from "@/components/MyOrdersSection";
import ProfileSection from "@/components/ProfileSection";
import MostOrderedSection from "@/components/MostOrderedSection";
import { TableCart, TableItem } from "@/components/TableCart";
import { Dish } from "@/data/appData";
import { ShoppingBag, UtensilsCrossed, Store, User, TrendingUp } from "lucide-react";

type Tab = "restaurants" | "menu" | "orders" | "profile" | "mostordered";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tastes: string[];
  dietPref: string;
  address: string;
}

interface Props {
  profile: UserProfile;
}

function getGreeting(name: string) {
  const h = new Date().getHours();
  if (h < 12) return `Good Morning, ${name}! ☀️`;
  if (h < 17) return `Good Afternoon, ${name}! 🌤️`;
  if (h < 21) return `Good Evening, ${name}! 🌆`;
  return `Good Night, ${name}! 🌙`;
}

const tabs = [
  { id: "restaurants" as Tab, label: "Restaurants", icon: Store, emoji: "🏪" },
  { id: "menu" as Tab, label: "Menu", icon: UtensilsCrossed, emoji: "🍽️" },
  { id: "orders" as Tab, label: "My Orders", icon: ShoppingBag, emoji: "📦" },
  { id: "mostordered" as Tab, label: "Trending", icon: TrendingUp, emoji: "🔥" },
  { id: "profile" as Tab, label: "Profile", icon: User, emoji: "👤" },
];

export default function AppDashboard({ profile }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("restaurants");
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(profile);

  const addToTable = (dish: Dish) => {
    setTableItems((prev) => {
      const ex = prev.find((i) => i.id === dish.id);
      if (ex) return prev.map((i) => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...dish, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setTableItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0)
    );
  };

  const cartCount = tableItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={foodieLogo} alt="Foodie" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="font-display font-black text-xl text-gradient-fire leading-tight">Foodie</h1>
              <p className="text-muted-foreground text-xs font-body leading-tight hidden sm:block">
                {getGreeting(userProfile.firstName)}
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-sm transition-all ${activeTab === t.id ? "gradient-fire text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                <span>{t.emoji}</span> {t.label}
              </button>
            ))}
          </nav>

          {/* Cart button */}
          <button onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 rounded-2xl px-4 py-2.5 font-body font-semibold text-sm hover:bg-primary hover:text-white transition-all">
            <span>🍽️</span>
            <span className="hidden sm:block">My Table</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 gradient-fire text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile greeting */}
        <div className="md:hidden px-4 pb-2">
          <p className="text-muted-foreground text-xs font-body">{getGreeting(userProfile.firstName)}</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-24 md:pb-6">
        {activeTab === "restaurants" && <RestaurantsSection onAddToTable={addToTable} />}
        {activeTab === "menu" && <MenuSection onAddToTable={addToTable} />}
        {activeTab === "orders" && <MyOrdersSection />}
        {activeTab === "mostordered" && <MostOrderedSection onAddToTable={addToTable} />}
        {activeTab === "profile" && (
          <ProfileSection profile={userProfile} onUpdateAddress={(addr) => setUserProfile({ ...userProfile, address: addr })} />
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${activeTab === t.id ? "text-primary" : "text-muted-foreground"}`}>
              <span className="text-lg">{t.emoji}</span>
              <span className="text-[10px] font-body font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Table cart overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()}>
            <TableCart
              items={tableItems}
              onUpdateQty={updateQty}
              onRemove={(id) => setTableItems((prev) => prev.filter((i) => i.id !== id))}
              onClear={() => setTableItems([])}
              onClose={() => setCartOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
