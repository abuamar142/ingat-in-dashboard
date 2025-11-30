"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface WarningNoticeProps {
  title: string;
  message: string;
  delay?: number;
}

export function WarningNotice({ title, message, delay = 0 }: WarningNoticeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-4 border border-amber-200 rounded-xl bg-linear-to-br from-amber-50/50 to-amber-100/30 flex items-start gap-3"
    >
      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
      <div>
        <h4 className="font-bold text-amber-900 mb-1">{title}</h4>
        <p className="text-sm text-amber-700">{message}</p>
      </div>
    </motion.div>
  );
}
