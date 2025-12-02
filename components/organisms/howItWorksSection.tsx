"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BOT_NUMBER } from "@/utils/whatsapp";

interface HowItWorksSectionProps {
  variants?: Variants;
}

const steps = [
  {
    number: 1,
    title: "Save Bot Number",
    description: `Save ${BOT_NUMBER} to your contacts`,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    number: 2,
    title: "Start Conversation",
    description: "Send 'halo' to the bot to begin",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    number: 3,
    title: "Receive Reminders",
    description: "Get automatic attendance reminders and track your check-ins",
    gradient: "from-violet-500 to-violet-600",
  },
];

export function HowItWorksSection({ variants }: HowItWorksSectionProps) {
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
      className="max-w-4xl mx-auto px-4"
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      <Card className="shadow-xl border-zinc-200 overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2">
        <CardHeader className="border-b border-zinc-100 pb-6 bg-linear-to-br from-zinc-50 to-white">
          <CardTitle
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent text-center"
          >
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 md:p-10">
          <ol className="space-y-8" role="list" aria-label="Steps to get started">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex items-start gap-4 sm:gap-6"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-linear-to-br ${step.gradient} flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-lg sm:text-xl text-zinc-900 mb-2 group-hover:text-zinc-950 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base text-zinc-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.section>
  );
}
