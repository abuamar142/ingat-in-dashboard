"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle, Shield, Activity, Code2, Database, Smartphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateBotWhatsAppLink, BOT_NUMBER } from "@/utils/whatsapp";

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

  const scrollItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const featureCard: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

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
        className="min-h-screen bg-linear-to-br from-white via-zinc-50 to-zinc-100 overflow-x-hidden"
        role="main"
        aria-label="Landing page content"
      >
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 md:space-y-16"
          >
            {/* Hero Section */}
            <motion.div
              variants={item}
              className="text-center space-y-6 px-2"
              role="region"
              aria-labelledby="hero-heading"
            >
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-7xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent wrap-break-word"
              >
                Ingat-In
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium px-2">
                WhatsApp Bot Attendance Reminder System
              </p>
              <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto px-2">
                Automated attendance tracking through WhatsApp with real-time monitoring dashboard
              </p>

              {/* CTA Buttons */}
              <nav
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 px-2"
                aria-label="Primary actions"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 md:hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] w-full sm:w-auto"
                >
                  <a
                    href={generateBotWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3"
                    aria-label="Contact WhatsApp Bot - Opens in new window"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <span>Contact WhatsApp Bot</span>
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-300 md:hover:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] w-full sm:w-auto"
                >
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-6 py-3"
                    aria-label="Admin Login"
                  >
                    <Shield className="h-5 w-5" aria-hidden="true" />
                    <span>Admin Login</span>
                  </Link>
                </Button>
              </nav>
            </motion.div>

            {/* Features Section */}
            <section
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-2"
              role="region"
              aria-labelledby="features-heading"
            >
              <h2 id="features-heading" className="sr-only">
                Key Features
              </h2>
              <motion.div
                variants={featureCard}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 md:hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 h-full"
                  role="article"
                  aria-labelledby="feature-monitoring"
                >
                  <CardHeader className="pb-4">
                    <div
                      className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg"
                      aria-hidden="true"
                    >
                      <Activity className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle id="feature-monitoring" className="text-xl font-bold text-zinc-900">
                      Real-time Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600 font-medium">
                      Track attendance status in real-time with live dashboard updates
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={featureCard}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 md:hover:scale-[1.02] focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 h-full"
                  role="article"
                  aria-labelledby="feature-reminders"
                >
                  <CardHeader className="pb-4">
                    <div
                      className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg"
                      aria-hidden="true"
                    >
                      <MessageCircle className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle id="feature-reminders" className="text-xl font-bold text-zinc-900">
                      Automatic Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600 font-medium">
                      Automated WhatsApp reminders for morning and evening attendance
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={featureCard}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 md:hover:scale-[1.02] focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2 h-full"
                  role="article"
                  aria-labelledby="feature-integration"
                >
                  <CardHeader className="pb-4">
                    <div
                      className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-xl bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg"
                      aria-hidden="true"
                    >
                      <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle id="feature-integration" className="text-xl font-bold text-zinc-900">
                      WhatsApp Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600 font-medium">
                      Seamless integration with WhatsApp for easy user interaction
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* How It Works Section */}
            <motion.section
              variants={scrollItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-4xl mx-auto px-2"
              role="region"
              aria-labelledby="how-it-works-heading"
            >
              <Card className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2 transition-all duration-300">
                <CardHeader className="border-b border-zinc-100/80 pb-6 bg-linear-to-br from-zinc-50/50 to-white">
                  <CardTitle
                    id="how-it-works-heading"
                    className="text-2xl sm:text-3xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent text-center"
                  >
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <ol className="space-y-6" role="list" aria-label="Steps to get started">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 text-white font-bold shadow-lg"
                        aria-hidden="true"
                      >
                        1
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-zinc-900 mb-2">
                          Save Bot Number
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-600 font-medium wrap-break-word">
                          Save{" "}
                          <span
                            className="font-mono font-semibold text-xs sm:text-sm"
                            aria-label="Bot phone number"
                          >
                            {BOT_NUMBER}
                          </span>{" "}
                          to your contacts
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 text-white font-bold shadow-lg"
                        aria-hidden="true"
                      >
                        2
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-zinc-900 mb-2">
                          Start Conversation
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-600 font-medium wrap-break-word">
                          Send{" "}
                          <span className="font-mono font-semibold" aria-label="Start command">
                            halo
                          </span>{" "}
                          to the bot to begin
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center shrink-0 text-white font-bold shadow-lg"
                        aria-hidden="true"
                      >
                        3
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-zinc-900 mb-2">
                          Receive Reminders
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-600 font-medium wrap-break-word">
                          Get automatic attendance reminders and track your check-ins
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </motion.section>

            {/* Tech Stack Section */}
            <motion.section
              variants={scrollItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center space-y-8 max-w-5xl mx-auto px-2"
              role="region"
              aria-labelledby="tech-stack-heading"
            >
              <div className="space-y-4">
                <h2
                  id="tech-stack-heading"
                  className="text-2xl sm:text-3xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent"
                >
                  Built with Modern Technology
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto font-medium px-2">
                  Dual-project architecture: WhatsApp Bot (Node.js + Baileys) and Web Dashboard
                  (Next.js + TypeScript + Supabase)
                </p>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {/* Web Dashboard Technologies */}
                <Card
                  className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 md:hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 text-left"
                  role="article"
                  aria-labelledby="tech-dashboard"
                >
                  <CardHeader className="pb-4 border-b border-zinc-100/80 bg-linear-to-br from-blue-50/50 to-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                        aria-hidden="true"
                      >
                        <Code2 className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle
                        id="tech-dashboard"
                        className="text-lg sm:text-xl font-bold text-zinc-900"
                      >
                        Web Dashboard
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-linear-to-r from-zinc-800 to-zinc-900 text-white hover:from-zinc-900 hover:to-zinc-950 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Next.js
                      </Badge>
                      <Badge className="bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        TypeScript
                      </Badge>
                      <Badge className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Supabase
                      </Badge>
                      <Badge className="bg-linear-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Tailwind CSS
                      </Badge>
                      <Badge className="bg-linear-to-r from-violet-600 to-violet-700 text-white hover:from-violet-700 hover:to-violet-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Framer Motion
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* WhatsApp Bot Technologies */}
                <Card
                  className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 md:backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 md:hover:scale-[1.02] focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 text-left"
                  role="article"
                  aria-labelledby="tech-bot"
                >
                  <CardHeader className="pb-4 border-b border-zinc-100/80 bg-linear-to-br from-emerald-50/50 to-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg"
                        aria-hidden="true"
                      >
                        <Smartphone className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle
                        id="tech-bot"
                        className="text-lg sm:text-xl font-bold text-zinc-900"
                      >
                        WhatsApp Bot
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-linear-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Node.js
                      </Badge>
                      <Badge className="bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        TypeScript
                      </Badge>
                      <Badge className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Baileys
                      </Badge>
                      <Badge className="bg-linear-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 md:hover:scale-105 cursor-default min-h-[32px]">
                        Supabase
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Architecture Info */}
              <div className="pt-4">
                <Card
                  className="shadow-lg border-zinc-200/50 overflow-hidden bg-linear-to-br from-zinc-50/80 to-white/80 md:backdrop-blur-2xl hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2"
                  role="article"
                  aria-labelledby="architecture-heading"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg"
                        aria-hidden="true"
                      >
                        <Database className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h3
                          id="architecture-heading"
                          className="font-semibold text-base sm:text-lg text-zinc-900 mb-2"
                        >
                          Dual-Project Architecture
                        </h3>
                        <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-medium wrap-break-word">
                          Two independent projects working together: the WhatsApp Bot handles
                          automated reminders and user interactions, while the Web Dashboard
                          provides real-time monitoring and administrative controls. Both share a
                          unified Supabase database for seamless data synchronization.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
