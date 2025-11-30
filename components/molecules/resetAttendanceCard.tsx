"use client";

import { motion } from "framer-motion";
import { RefreshCw, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/molecules/confirmDialog";

interface ResetAttendanceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonLabel: string;
  confirmTitle: string;
  confirmDescription: string;
  onConfirm: () => void;
  isPending: boolean;
  colorScheme: "emerald" | "violet";
  delay?: number;
}

export function ResetAttendanceCard({
  title,
  description,
  icon: Icon,
  buttonLabel,
  confirmTitle,
  confirmDescription,
  onConfirm,
  isPending,
  colorScheme,
  delay = 0,
}: ResetAttendanceCardProps) {
  const colors = {
    emerald: {
      border: "border-emerald-200/60",
      bg: "bg-linear-to-br from-emerald-50/50 to-emerald-100/30",
      shadow: "hover:shadow-emerald-200/50",
      iconBg: "bg-emerald-500",
      iconShadow: "shadow-emerald-500/30",
      title: "text-emerald-900",
      description: "text-emerald-700",
      button:
        "bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-400",
      variant: "warning" as const,
    },
    violet: {
      border: "border-violet-200/60",
      bg: "bg-linear-to-br from-violet-50/50 to-violet-100/30",
      shadow: "hover:shadow-violet-200/50",
      iconBg: "bg-violet-500",
      iconShadow: "shadow-violet-500/30",
      title: "text-violet-900",
      description: "text-violet-700",
      button:
        "bg-white hover:bg-violet-50 text-violet-700 border-violet-300 hover:border-violet-400",
      variant: "warning" as const,
    },
  };

  const color = colors[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 border-2 ${color.border} rounded-xl ${color.bg} hover:shadow-lg ${color.shadow} transition-all`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 ${color.iconBg} rounded-xl shadow-lg ${color.iconShadow}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${color.title} mb-1`}>{title}</h3>
          <p className={`text-sm ${color.description} mb-4`}>{description}</p>
          <ConfirmDialog
            trigger={
              <Button
                variant="outline"
                disabled={isPending}
                className={`w-full ${color.button} font-semibold`}
              >
                {isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {buttonLabel}
                  </>
                )}
              </Button>
            }
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={buttonLabel}
            onConfirm={onConfirm}
            isLoading={isPending}
            loadingLabel="Resetting..."
            variant={color.variant}
          />
        </div>
      </div>
    </motion.div>
  );
}
