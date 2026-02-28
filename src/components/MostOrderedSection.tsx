import { dishes } from "@/data/appData";
import { Dish } from "@/data/appData";
import { Plus } from "lucide-react";

interface Props {
  onAddToTable: (dish: Dish) => void;
}

export default function MostOrderedSection({ onAddToTable }: Props) {
  const topDishes = dishes.filter((d) => d.isMostOrdered);
  const sortedByRating = [...dishes].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🔥</span>
          <h2 className="font-display text-2xl font-bold text-foreground">Most Ordered Dishes</h2>
        </div>
        <p className="text-muted-foreground font-body text-sm mb-5">The crowd favourites across all restaurants</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topDishes.map((dish, idx) => (
            <MostOrderedCard key={dish.id} dish={dish} rank={idx + 1} onAddToTable={onAddToTable} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-3xl">⭐</span>
          <h2 className="font-display text-2xl font-bold text-foreground">Highest Rated</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedByRating.map((dish) => (
            <MostOrderedCard key={dish.id} dish={dish} onAddToTable={onAddToTable} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MostOrderedCard({ dish, rank, onAddToTable }: { dish: Dish; rank?: number; onAddToTable: (d: Dish) => void }) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all group hover:-translate-y-1 relative">
      {rank && (
        <div className="absolute top-3 left-3 z-10 w-8 h-8 gradient-fire rounded-full flex items-center justify-center text-white font-bold font-body text-sm shadow-lg">
          #{rank}
        </div>
      )}
      <div className="relative h-48 overflow-hidden">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <span className={`text-xs font-bold font-body px-2 py-0.5 rounded-full ${dish.isVeg ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
            {dish.isVeg ? "🥦" : "🍗"}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display font-bold text-foreground">{dish.name}</h3>
        <p className="text-primary text-xs font-body font-semibold">{dish.restaurantName}</p>
        <p className="text-muted-foreground text-xs font-body line-clamp-1">{dish.description}</p>

        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(dish.rating) ? "opacity-100" : "opacity-20"}`}>🍔</span>
          ))}
          <span className="text-xs font-bold text-accent ml-1">{dish.rating}</span>
        </div>

        <div className="flex items-center gap-0.5">
          {[...Array(Math.ceil(dish.deliveryTime / 10))].map((_, i) => (
            <span key={i} className="text-xs">🍕</span>
          ))}
          <span className="text-xs text-muted-foreground font-body ml-1">{dish.deliveryTime} min</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="font-display font-bold text-2xl text-primary">₹{dish.price.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={() => onAddToTable(dish)}
            className="flex items-center gap-1.5 gradient-fire text-white px-3 py-2 rounded-xl font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all">
            <Plus size={14} /> Add to Table
          </button>
        </div>
      </div>
    </div>
  );
}
