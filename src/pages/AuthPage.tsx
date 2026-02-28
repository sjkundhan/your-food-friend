import { useState } from "react";
import authBg from "@/assets/auth-bg.jpg";
import foodieLogo from "@/assets/foodie-logo.png";
import { tasteOptions } from "@/data/appData";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tastes: string[];
  dietPref: string;
  address: string;
}

interface AuthPageProps {
  onComplete: (profile: UserProfile) => void;
}

type Step = "welcome" | "login" | "onboarding" | "taste";

export default function AuthPage({ onComplete }: AuthPageProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const [tastes, setTastes] = useState<string[]>([]);
  const [dietPref, setDietPref] = useState("");

  const toggleTaste = (id: string) => {
    setTastes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);
  };

  const handleGoogleLogin = () => setStep("onboarding");
  const handleAppleLogin = () => setStep("onboarding");

  const handleOnboardingNext = () => {
    if (form.firstName && form.phone) setStep("taste");
  };

  const handleFinish = () => {
    onComplete({ ...form, tastes, dietPref });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <img src={authBg} alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={foodieLogo} alt="Foodie" className="w-16 h-16 rounded-2xl mb-3 shadow-xl" />
          <h1 className="font-display text-4xl font-black text-gradient-fire">Foodie</h1>
          <p className="text-muted-foreground text-sm mt-1 font-body">India's tastiest food app</p>
        </div>

        {/* WELCOME */}
        {step === "welcome" && (
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 space-y-4 border border-border animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-foreground text-center">Welcome! 👋</h2>
            <p className="text-muted-foreground text-sm text-center font-body">Sign in to order from 500+ restaurants near you</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-2xl py-3.5 font-body font-semibold transition-all hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-3.5 font-body font-semibold transition-all hover:scale-[1.02] hover:bg-foreground/90"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Continue with Apple
            </button>
            <div className="text-center">
              <button onClick={() => setStep("login")} className="text-primary text-sm font-body hover:underline">
                Use email instead →
              </button>
            </div>
          </div>
        )}

        {/* EMAIL LOGIN */}
        {step === "login" && (
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 space-y-4 border border-border animate-fade-up">
            <button onClick={() => setStep("welcome")} className="text-muted-foreground text-sm font-body hover:text-foreground">← Back</button>
            <h2 className="font-display text-2xl font-bold text-foreground">Sign in</h2>
            <input type="email" placeholder="Email address" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-secondary border border-border rounded-2xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={() => setStep("onboarding")}
              className="w-full gradient-fire text-white rounded-2xl py-3.5 font-body font-bold glow-primary transition-all hover:scale-[1.02]">
              Continue
            </button>
          </div>
        )}

        {/* ONBOARDING */}
        {step === "onboarding" && (
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 space-y-4 border border-border animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-foreground">Tell us about you 🙌</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground font-body mb-1 block">First Name*</label>
                <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Raj" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-body mb-1 block">Last Name</label>
                <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Sharma" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body mb-1 block">Phone Number*</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body mb-1 block">Delivery Address</label>
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Flat 2A, ABC Apartments, City" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body mb-1 block">Diet Preference</label>
              <div className="flex gap-2">
                {["Veg 🥦", "Non-Veg 🍗", "Vegan 🌱"].map((d) => (
                  <button key={d} onClick={() => setDietPref(d)}
                    className={`flex-1 py-2 rounded-xl text-xs font-body font-semibold border transition-all ${dietPref === d ? "gradient-fire text-white border-transparent" : "bg-secondary text-muted-foreground border-border hover:border-primary"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleOnboardingNext} disabled={!form.firstName || !form.phone}
              className="w-full gradient-fire text-white rounded-2xl py-3.5 font-body font-bold disabled:opacity-40 glow-primary transition-all hover:scale-[1.02]">
              Next →
            </button>
          </div>
        )}

        {/* TASTE */}
        {step === "taste" && (
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 space-y-5 border border-border animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-foreground">Choose your taste 👅</h2>
            <p className="text-muted-foreground text-sm font-body">We'll personalize your recommendations</p>
            <div className="grid grid-cols-2 gap-3">
              {tasteOptions.map((t) => (
                <button key={t.id} onClick={() => toggleTaste(t.id)}
                  className={`p-3 rounded-2xl text-left border transition-all hover:scale-[1.02] ${tastes.includes(t.id) ? "gradient-fire border-transparent text-white" : "bg-secondary border-border text-foreground hover:border-primary"}`}>
                  <div className="font-body font-semibold text-sm">{t.label}</div>
                  <div className={`text-xs mt-0.5 ${tastes.includes(t.id) ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={handleFinish}
              className="w-full gradient-fire text-white rounded-2xl py-3.5 font-body font-bold glow-primary transition-all hover:scale-[1.02]">
              Let's Eat! 🍴
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
