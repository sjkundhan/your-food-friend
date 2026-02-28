import { restaurants } from "@/data/appData";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import { Dish } from "@/data/appData";

function BurgerRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xs ${i < full ? "opacity-100" : i === full && partial > 0.4 ? "opacity-60" : "opacity-20"}`}>🍔</span>
      ))}
      <span className="text-xs font-bold text-accent ml-1">{rating}</span>
    </div>
  );
}

function PizzaTime({ minutes }: { minutes: number }) {
  const slices = Math.ceil(minutes / 10);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(Math.min(slices, 6))].map((_, i) => (
        <span key={i} className="text-xs">🍕</span>
      ))}
      <span className="text-xs text-muted-foreground ml-1">{minutes} min</span>
    </div>
  );
}

interface Props {
  onAddToTable: (dish: Dish) => void;
}

export default function RestaurantsSection({ onAddToTable }: Props) {
  const recommended = restaurants.filter((r) => r.isRecommended);
  const allRests = restaurants;

  return (
    <div className="space-y-8">
      {/* Recommended for new users */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⭐</span>
          <h2 className="font-display text-2xl font-bold text-foreground">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>

      {/* All restaurants */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏪</span>
          <h2 className="font-display text-2xl font-bold text-foreground">All Restaurants</h2>
          <span className="text-muted-foreground font-body text-sm">({allRests.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allRests.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant: r }: { restaurant: typeof restaurants[0] }) {
  const isOpen = true; // mock always open for demo

  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group">
      <div className="relative h-44 overflow-hidden">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {r.isRecommended && <span className="bg-primary text-white text-xs font-body font-bold px-2.5 py-1 rounded-full">⭐ Recommended</span>}
          {r.isNew && <span className="bg-accent text-accent-foreground text-xs font-body font-bold px-2.5 py-1 rounded-full">✨ New</span>}
        </div>
        {r.offer && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="bg-primary/90 text-white text-xs font-body font-semibold px-3 py-1.5 rounded-xl">🏷️ {r.offer}</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-lg leading-tight">{r.name}</h3>
          <span className={`text-xs font-body font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${isOpen ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
        <p className="text-muted-foreground text-xs font-body">{r.cuisine}</p>

        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(r.rating) ? "opacity-100" : "opacity-20"}`}>🍔</span>
          ))}
          <span className="text-xs font-bold text-accent ml-1">{r.rating}</span>
          <span className="text-muted-foreground text-xs ml-2 font-body">· ₹{r.priceForTwo} for two</span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          {[...Array(Math.ceil(r.deliveryTime / 10))].map((_, i) => (
            <span key={i} className="text-xs">🍕</span>
          ))}
          <span className="text-xs font-body ml-1">{r.deliveryTime} min delivery</span>
        </div>

        <div className="space-y-1 pt-1 border-t border-border">
          <div className="flex items-start gap-1.5 text-muted-foreground">
            <MapPin size={12} className="mt-0.5 flex-shrink-0 text-primary" />
            <span className="text-xs font-body line-clamp-2">{r.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Phone size={12} className="flex-shrink-0 text-primary" />
            <span className="text-xs font-body">{r.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={12} className="flex-shrink-0 text-primary" />
            <span className="text-xs font-body">{r.openTime} – {r.closeTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
