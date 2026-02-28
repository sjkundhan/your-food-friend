import { dishes } from "@/data/appData";
import { Dish } from "@/data/appData";
import { Plus } from "lucide-react";

interface Props {
  onAddToTable: (dish: Dish) => void;
}

export default function MenuSection({ onAddToTable }: Props) {
  const categories = [...new Set(dishes.map((d) => d.category))];

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const items = dishes.filter((d) => d.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">{cat}</h2>
              <span className="text-muted-foreground text-sm font-body">({items.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((dish) => (
                <DishCard key={dish.id} dish={dish} onAddToTable={onAddToTable} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DishCard({ dish, onAddToTable }: { dish: Dish; onAddToTable: (d: Dish) => void }) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all group hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {dish.isFamous && <span className="bg-accent text-accent-foreground text-xs font-bold font-body px-2 py-0.5 rounded-full">⭐ Famous</span>}
          <span className={`text-xs font-bold font-body px-2 py-0.5 rounded-full ${dish.isVeg ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
            {dish.isVeg ? "🥦 Veg" : "🍗 Non-Veg"}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div>
          <h3 className="font-display font-bold text-foreground text-base">{dish.name}</h3>
          <p className="text-primary text-xs font-body font-semibold">{dish.restaurantName}</p>
          <p className="text-muted-foreground text-xs font-body mt-1 line-clamp-2">{dish.description}</p>
        </div>
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
          <span className="font-display font-bold text-xl text-primary">₹{dish.price.toLocaleString("en-IN")}</span>
          <button onClick={() => onAddToTable(dish)}
            className="flex items-center gap-1.5 gradient-fire text-white px-4 py-2 rounded-xl font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all">
            <Plus size={14} /> Add to Table
          </button>
        </div>
      </div>
    </div>
  );
}
