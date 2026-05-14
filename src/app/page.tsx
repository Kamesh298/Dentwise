import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  // redirect auth users: admin to /admin, others to /dashboard
  if (user) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (adminEmail && userEmail === adminEmail) {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return(
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}

