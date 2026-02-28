import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/menuData";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemove, onClear }: CartProps) {
  const [open, setOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-primary text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform font-body font-semibold"
      >
        <ShoppingCart size={20} />
        <span>Cart</span>
        {count > 0 && (
          <span className="bg-primary-foreground text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {count}
          </span>
        )}
        {count > 0 && (
          <span className="border-l border-primary-foreground/30 pl-3">${total.toFixed(2)}</span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-display font-bold text-foreground">Your Order</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="text-6xl">🛒</div>
                  <p className="text-muted-foreground font-body">Your cart is empty.<br />Add some delicious items!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-muted/50 rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-foreground text-sm truncate">{item.name}</p>
                      <p className="text-primary font-bold font-body">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-bold font-body w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors ml-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="space-y-2 font-body">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Delivery fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${(total + 2.99).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full py-6 text-base font-semibold rounded-xl" size="lg">
                  Place Order · ${(total + 2.99).toFixed(2)}
                </Button>
                <button
                  onClick={onClear}
                  className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors font-body"
                >
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
