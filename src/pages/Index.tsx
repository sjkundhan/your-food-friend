import { useState } from "react";
import AuthPage from "@/pages/AuthPage";
import AppDashboard from "@/components/AppDashboard";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tastes: string[];
  dietPref: string;
  address: string;
}

const Index = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  if (!profile) {
    return <AuthPage onComplete={(p) => setProfile(p)} />;
  }

  return <AppDashboard profile={profile} />;
};

export default Index;
