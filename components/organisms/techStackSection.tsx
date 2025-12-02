"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Smartphone, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechStackSectionProps {
  variants?: Variants;
}

const techStacks = [
  {
    title: "Web Dashboard",
    icon: Code2,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50/50 to-white",
    technologies: [
      { name: "Next.js", color: "from-zinc-800 to-zinc-900 hover:from-zinc-900 hover:to-zinc-950" },
      {
        name: "TypeScript",
        color: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      },
      {
        name: "Supabase",
        color: "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800",
      },
      {
        name: "Tailwind CSS",
        color: "from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800",
      },
      {
        name: "Framer Motion",
        color: "from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800",
      },
    ],
  },
  {
    title: "WhatsApp Bot",
    icon: Smartphone,
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50/50 to-white",
    technologies: [
      {
        name: "Node.js",
        color: "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
      },
      {
        name: "TypeScript",
        color: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      },
      {
        name: "Baileys",
        color: "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800",
      },
      {
        name: "Supabase",
        color: "from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800",
      },
    ],
  },
];

export function TechStackSection({ variants }: TechStackSectionProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-12 max-w-6xl mx-auto px-4"
      role="region"
      aria-labelledby="tech-stack-heading"
    >
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2
          id="tech-stack-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent"
        >
          Built with Modern Technology
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
          Dual-project architecture: WhatsApp Bot (Node.js + Baileys) and Web Dashboard (Next.js +
          TypeScript + Supabase)
        </p>
      </div>

      {/* Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techStacks.map((stack, index) => (
          <motion.div
            key={stack.title}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="group h-full shadow-xl border-zinc-200 overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2"
              role="article"
            >
              <CardHeader
                className={`pb-6 border-b border-zinc-100 bg-linear-to-br ${stack.bgGradient}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${stack.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                    aria-hidden="true"
                  >
                    <stack.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-zinc-900">{stack.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <Badge
                      key={tech.name}
                      className={`bg-linear-to-r ${tech.color} text-white px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default shadow-sm`}
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Architecture Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          className="shadow-xl border-zinc-200 overflow-hidden bg-linear-to-br from-zinc-50 to-white hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2"
          role="article"
        >
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg"
                aria-hidden="true"
              >
                <Database className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-zinc-900 mb-3">Dual-Project Architecture</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Two independent projects working together: the WhatsApp Bot handles automated
                  reminders and user interactions, while the Web Dashboard provides real-time
                  monitoring and administrative controls. Both share a unified Supabase database for
                  seamless data synchronization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
