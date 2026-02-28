import { Dish } from "@/data/appData";
import { X, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useState } from "react";

export interface TableItem extends Dish { quantity: number; }

interface TableCartProps {
  items: TableItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function TableCart({ items, onUpdateQty, onRemove, onClear, onClose }: TableCartProps) {
  const [paying, setPaying] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [paid, setPaid] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const gst = Math.round(total * 0.05);
  const delivery = total > 0 ? 29 : 0;
  const grand = total + gst + delivery;

  const handlePay = () => {
    setTimeout(() => { setPaid(true); setTimeout(() => { onClear(); onClose(); setPaid(false); setPaying(false); }, 2000); }, 1500);
  };

  if (paid) return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm z-50 bg-card border-l border-border flex flex-col items-center justify-center animate-slide-in-right">
      <div className="text-6xl mb-4 animate-bounce">🎉</div>
      <h2 className="font-display text-2xl font-bold text-foreground">Order Placed!</h2>
      <p className="text-muted-foreground font-body text-sm mt-2">Your food is being prepared</p>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm z-50 bg-card border-l border-border flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">My Table 🍽️</h2>
          <p className="text-muted-foreground text-xs font-body">{count} item{count !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-secondary transition-colors">
          <X size={20} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="text-5xl mb-3">🍽️</div>
          <p className="font-display text-lg font-bold text-foreground">Your table is empty</p>
          <p className="text-muted-foreground text-sm font-body mt-1">Add dishes to get started</p>
        </div>
      ) : !paying ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center bg-secondary/50 rounded-2xl p-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-primary font-bold font-body text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  <p className="text-muted-foreground text-xs font-body">{item.restaurantName}</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5 bg-card rounded-xl p-1">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Minus size={10} />
                    </button>
                    <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Plus size={10} />
                    </button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-destructive hover:text-destructive/70 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4 space-y-3">
            <div className="space-y-1.5 font-body text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>GST (5%)</span><span>₹{gst}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>₹{delivery}</span></div>
              <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border"><span>Grand Total</span><span>₹{grand.toLocaleString("en-IN")}</span></div>
            </div>
            <button onClick={() => setPaying(true)} className="w-full gradient-fire text-white py-3.5 rounded-2xl font-body font-bold glow-primary flex items-center justify-center gap-2">
              <CreditCard size={18} /> Proceed to Pay · ₹{grand.toLocaleString("en-IN")}
            </button>
            <button onClick={onClear} className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors font-body">Clear table</button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col p-5">
          <button onClick={() => setPaying(false)} className="text-muted-foreground text-sm font-body mb-4 hover:text-foreground self-start">← Back</button>
          <h3 className="font-display text-xl font-bold text-foreground mb-4">Payment</h3>
          <div className="space-y-3 mb-6">
            {[
              { id: "upi", label: "UPI", icon: "💳", sub: "PhonePe, GPay, Paytm" },
              { id: "card", label: "Credit / Debit Card", icon: "🏦", sub: "Visa, Mastercard, RuPay" },
              { id: "cod", label: "Cash on Delivery", icon: "💵", sub: "Pay when delivered" },
              { id: "wallet", label: "Foodie Wallet", icon: "👛", sub: "Balance: ₹248" },
            ].map((m) => (
              <button key={m.id} onClick={() => setPayMethod(m.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${payMethod === m.id ? "border-primary bg-primary/10" : "border-border bg-secondary/50 hover:border-primary/50"}`}>
                <span className="text-2xl">{m.icon}</span>
                <div className="text-left">
                  <p className="font-body font-semibold text-sm text-foreground">{m.label}</p>
                  <p className="text-muted-foreground text-xs font-body">{m.sub}</p>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${payMethod === m.id ? "border-primary" : "border-border"}`}>
                  {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-auto">
            <div className="flex justify-between font-bold text-foreground font-body mb-4">
              <span>Total Amount</span><span>₹{grand.toLocaleString("en-IN")}</span>
            </div>
            <button onClick={handlePay} className="w-full gradient-fire text-white py-4 rounded-2xl font-body font-bold glow-primary animate-pulse-glow">
              Pay Now ₹{grand.toLocaleString("en-IN")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
