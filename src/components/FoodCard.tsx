import { Plus, Star, Clock } from "lucide-react";
import { MenuItem } from "@/data/menuData";

interface FoodCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function FoodCard({ item, onAdd }: FoodCardProps) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-bold px-3 py-1 rounded-full">
            🔥 Popular
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-bold text-foreground text-lg leading-tight">{item.name}</h3>
          <p className="text-muted-foreground text-sm font-body line-clamp-2 mt-1">{item.description}</p>
        </div>

        <div className="flex items-center gap-3 text-sm font-body">
          <div className="flex items-center gap-1 text-accent">
            <Star size={14} fill="currentColor" />
            <span className="font-semibold text-foreground">{item.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} />
            <span>{item.prepTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-display font-bold text-primary">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-body font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
