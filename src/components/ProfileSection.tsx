import { useState } from "react";
import { MapPin, Phone, Edit3, Check, X } from "lucide-react";
import { sampleOrders } from "@/data/appData";

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
  onUpdateAddress: (address: string) => void;
}

export default function ProfileSection({ profile, onUpdateAddress }: Props) {
  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(profile.address);
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

  const historyOrders = sampleOrders.filter((o) => o.status === "delivered");

  const handleSaveAddress = () => {
    onUpdateAddress(newAddress);
    setEditingAddress(false);
  };

  const avatarLetter = profile.firstName?.[0]?.toUpperCase() || "U";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="bg-card rounded-3xl border border-border p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-3xl gradient-fire flex items-center justify-center text-white font-display font-black text-3xl glow-primary flex-shrink-0">
          {avatarLetter}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-muted-foreground font-body text-sm">{profile.email || "foodie@example.com"}</p>
          <p className="text-muted-foreground font-body text-sm">{profile.phone}</p>
          {profile.dietPref && (
            <span className="inline-block mt-1.5 bg-primary/10 text-primary text-xs font-bold font-body px-2.5 py-1 rounded-full">
              {profile.dietPref}
            </span>
          )}
        </div>
      </div>

      {/* Taste badges */}
      {profile.tastes.length > 0 && (
        <div className="bg-card rounded-3xl border border-border p-5">
          <h3 className="font-body font-bold text-foreground mb-3">Your Taste Profile 👅</h3>
          <div className="flex flex-wrap gap-2">
            {profile.tastes.map((t) => (
              <span key={t} className="gradient-fire text-white text-xs font-bold font-body px-3 py-1.5 rounded-full capitalize">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-secondary rounded-2xl p-1 gap-1">
        {[["info", "👤 Profile Info"], ["history", "📋 Order History"]].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key as "info" | "history")}
            className={`flex-1 py-2.5 rounded-xl font-body font-semibold text-sm transition-all ${activeTab === key ? "gradient-fire text-white shadow-lg" : "text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="bg-card rounded-3xl border border-border p-5 space-y-4">
          {[
            { label: "First Name", value: profile.firstName, icon: "👤" },
            { label: "Last Name", value: profile.lastName || "—", icon: "👤" },
            { label: "Email", value: profile.email || "Not provided", icon: "📧" },
            { label: "Phone", value: profile.phone, icon: "📱" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-2xl">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-muted-foreground text-xs font-body">{item.label}</p>
                <p className="font-body font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            </div>
          ))}

          {/* Address */}
          <div className="p-3 bg-secondary/50 rounded-2xl">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <p className="text-muted-foreground text-xs font-body">Delivery Address</p>
              </div>
              {!editingAddress ? (
                <button onClick={() => setEditingAddress(true)}
                  className="flex items-center gap-1 text-primary text-xs font-body font-semibold hover:opacity-70">
                  <Edit3 size={12} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSaveAddress} className="text-green-400 hover:opacity-70"><Check size={16} /></button>
                  <button onClick={() => setEditingAddress(false)} className="text-red-400 hover:opacity-70"><X size={16} /></button>
                </div>
              )}
            </div>
            {editingAddress ? (
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-3 py-2 font-body text-foreground text-sm resize-none outline-none focus:ring-2 focus:ring-primary mt-1"
                rows={2}
              />
            ) : (
              <p className="font-body font-semibold text-foreground text-sm">{profile.address || "No address added"}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-3">
          {historyOrders.length === 0 ? (
            <div className="bg-card rounded-3xl border border-border p-10 text-center">
              <div className="text-5xl mb-3">📋</div>
              <p className="font-display font-bold text-foreground">No orders yet</p>
              <p className="text-muted-foreground font-body text-sm">Your order history will appear here</p>
            </div>
          ) : (
            historyOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-3xl border border-border p-4 flex gap-4">
                <img src={order.dish.image} alt={order.dish.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-foreground">{order.dish.name}</h3>
                  <p className="text-muted-foreground text-xs font-body">{order.dish.restaurantName}</p>
                  <p className="text-primary font-bold font-body text-sm">₹{order.dish.price.toLocaleString("en-IN")}</p>
                  <p className="text-muted-foreground text-xs font-body">{order.orderedAt}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold font-body px-2 py-0.5 rounded-full">Delivered</span>
                  <button className="text-primary text-xs font-body font-semibold hover:underline">Reorder</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
