"use client";

import { motion, Variants } from "framer-motion";
import { Activity, MessageCircle, Shield } from "lucide-react";
import { HeroSection } from "@/components/organisms/heroSection";
import { FeatureCard } from "@/components/molecules/featureCard";
import { HowItWorksSection } from "@/components/organisms/howItWorksSection";
import { TechStackSection } from "@/components/organisms/techStackSection";

export default function LandingPage() {
  const pageTransition: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      title: "Real-time Monitoring",
      description: "Track attendance status in real-time with live dashboard updates",
      icon: Activity,
      gradient: "blue" as const,
    },
    {
      title: "Automatic Reminders",
      description: "Automated WhatsApp reminders for morning and evening attendance",
      icon: MessageCircle,
      gradient: "emerald" as const,
    },
    {
      title: "WhatsApp Integration",
      description: "Seamless integration with WhatsApp for easy user interaction",
      icon: Shield,
      gradient: "violet" as const,
    },
  ];

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <motion.main
        id="main-content"
        variants={pageTransition}
        initial="hidden"
        animate="show"
        className="min-h-screen bg-linear-to-br from-white via-zinc-50 to-zinc-100"
        role="main"
        aria-label="Landing page content"
      >
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="space-y-16 md:space-y-24">
            {/* Hero Section */}
            <HeroSection container={container} item={item} />

            {/* Features Section */}
            <section
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-4"
              role="region"
              aria-labelledby="features-heading"
            >
              <h2 id="features-heading" className="sr-only">
                Key Features
              </h2>
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
              ))}
            </section>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Tech Stack Section */}
            <TechStackSection />
          </div>
        </div>
      </motion.main>
    </>
  );
}
