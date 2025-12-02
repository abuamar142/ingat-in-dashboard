"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateBotWhatsAppLink } from "@/utils/whatsapp";

interface HeroSectionProps {
  container: Variants;
  item: Variants;
}

export function HeroSection({ container, item }: HeroSectionProps) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative text-center space-y-8 px-4 py-16 md:py-24"
      role="region"
      aria-labelledby="hero-heading"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <motion.div variants={item} className="space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm">
          <span className="text-sm font-medium text-emerald-700">
            ✨ Automated Attendance System
          </span>
        </div>

        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent tracking-tight leading-tight pb-2"
        >
          Ingat-In
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-zinc-700 max-w-3xl mx-auto font-semibold leading-relaxed">
          WhatsApp Bot Attendance Reminder System
        </p>

        <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Automated attendance tracking through WhatsApp with real-time monitoring dashboard. Never
          miss a check-in again with intelligent reminders.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.nav
        variants={item}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        aria-label="Primary actions"
      >
        <Button
          asChild
          size="lg"
          className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 min-h-12 text-base font-semibold w-full sm:w-auto"
        >
          <a
            href={generateBotWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3"
            aria-label="Contact WhatsApp Bot - Opens in new window"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span>Start Using Bot</span>
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100 transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 min-h-12 text-base font-semibold w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="flex items-center gap-2 px-8 py-3"
            aria-label="Admin Login"
          >
            <Shield className="h-5 w-5" aria-hidden="true" />
            <span>Admin Dashboard</span>
          </Link>
        </Button>
      </motion.nav>
    </motion.section>
  );
}
