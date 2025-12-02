"use client";

import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: "blue" | "emerald" | "violet" | "amber";
  delay?: number;
  variants?: Variants;
}

const gradientStyles = {
  blue: {
    icon: "bg-linear-to-br from-blue-500 to-blue-600",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    ring: "focus-within:ring-blue-500",
  },
  emerald: {
    icon: "bg-linear-to-br from-emerald-500 to-emerald-600",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    ring: "focus-within:ring-emerald-500",
  },
  violet: {
    icon: "bg-linear-to-br from-violet-500 to-violet-600",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    ring: "focus-within:ring-violet-500",
  },
  amber: {
    icon: "bg-linear-to-br from-amber-500 to-amber-600",
    hover: "hover:border-amber-200 hover:shadow-amber-100",
    ring: "focus-within:ring-amber-500",
  },
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  delay = 0,
  variants,
}: FeatureCardProps) {
  const styles = gradientStyles[gradient];

  const defaultVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={`group relative overflow-hidden bg-white border-zinc-200 shadow-lg ${styles.hover} ${styles.ring} transition-all duration-300 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-offset-2 h-full`}
        role="article"
      >
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-zinc-50/50 to-zinc-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative pb-4">
          <div
            className={`w-14 h-14 rounded-xl ${styles.icon} flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            aria-hidden="true"
          >
            <Icon className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <CardTitle className="text-xl font-bold text-zinc-900 group-hover:text-zinc-950 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-zinc-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
