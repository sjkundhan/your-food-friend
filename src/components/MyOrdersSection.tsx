import { sampleOrders } from "@/data/appData";
import { Phone, MapPin, Clock, CheckCircle, Truck, ChefHat, Package } from "lucide-react";

const statusSteps = [
  { key: "preparing", label: "Preparing", icon: ChefHat, emoji: "👨‍🍳" },
  { key: "picked", label: "Picked Up", icon: Package, emoji: "📦" },
  { key: "on_the_way", label: "On the Way", icon: Truck, emoji: "🛵" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, emoji: "✅" },
];

function getStepIndex(status: string) {
  return statusSteps.findIndex((s) => s.key === status);
}

export default function MyOrdersSection() {
  const active = sampleOrders.filter((o) => o.status !== "delivered");
  const history = sampleOrders.filter((o) => o.status === "delivered");

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">🛵 Active Orders</h2>
          <div className="space-y-4">
            {active.map((order) => (
              <ActiveOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">🕐 Order History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {history.map((order) => (
            <div key={order.id} className="bg-card rounded-3xl border border-border p-4 flex gap-4">
              <img src={order.dish.image} alt={order.dish.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-body font-semibold text-foreground">{order.dish.name}</h3>
                <p className="text-primary font-bold font-body text-sm">₹{order.dish.price.toLocaleString("en-IN")}</p>
                <p className="text-muted-foreground text-xs font-body mt-1">{order.orderedAt}</p>
                <span className="inline-block mt-1.5 bg-green-500/20 text-green-400 text-xs font-bold font-body px-2 py-0.5 rounded-full">✅ Delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActiveOrderCard({ order }: { order: typeof sampleOrders[0] }) {
  const stepIndex = getStepIndex(order.status);

  return (
    <div className="bg-card rounded-3xl border border-primary/30 p-5 space-y-5">
      {/* Order info */}
      <div className="flex gap-4 items-center">
        <img src={order.dish.image} alt={order.dish.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-body font-semibold text-foreground">{order.dish.name}</h3>
          <p className="text-primary font-bold font-body text-sm">₹{order.dish.price.toLocaleString("en-IN")}</p>
          <p className="text-muted-foreground text-xs font-body">{order.dish.restaurantName}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            {[...Array(Math.ceil(order.estimatedMinutes / 10))].map((_, i) => (
              <span key={i} className="text-sm">🍕</span>
            ))}
          </div>
          <p className="text-primary font-bold font-body text-sm">{order.estimatedMinutes} min</p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="relative">
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-x-0 top-5 h-0.5 bg-border" />
          <div className="absolute inset-x-0 top-5 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${(stepIndex / (statusSteps.length - 1)) * 100}%` }} />
          {statusSteps.map((step, i) => (
            <div key={step.key} className="flex flex-col items-center gap-1.5 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${i <= stepIndex ? "bg-primary shadow-lg" : "bg-secondary"}`}>
                {step.emoji}
              </div>
              <span className={`text-xs font-body font-medium ${i <= stepIndex ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative rounded-2xl overflow-hidden h-40 bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="font-body text-muted-foreground text-sm">Live tracking active</p>
            <p className="font-body text-primary font-bold text-xs mt-1">📍 2.3 km away</p>
          </div>
        </div>
        {/* Fake map grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold font-body px-3 py-1.5 rounded-full">
          🛵 Rajan is on the way!
        </div>
      </div>

      {/* Delivery boy */}
      <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-4">
        <img src={order.deliveryBoy.photo} alt={order.deliveryBoy.name}
          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/40" />
        <div className="flex-1">
          <p className="font-body font-bold text-foreground">{order.deliveryBoy.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(order.deliveryBoy.rating) ? "opacity-100" : "opacity-20"}`}>🍔</span>
            ))}
            <span className="text-xs text-accent font-bold ml-1">{order.deliveryBoy.rating}</span>
          </div>
          <p className="text-muted-foreground text-xs font-body">Age {order.deliveryBoy.age}</p>
        </div>
        <a href={`tel:${order.deliveryBoy.phone}`}
          className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 rounded-xl px-3 py-2 text-xs font-body font-semibold hover:bg-primary hover:text-white transition-all">
          <Phone size={13} /> Call
        </a>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-muted-foreground">
        <MapPin size={14} className="mt-0.5 text-primary flex-shrink-0" />
        <p className="text-xs font-body">{order.address}</p>
      </div>
    </div>
  );
}
