"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string | ReactNode;
  confirmLabel: string;
  confirmIcon?: LucideIcon;
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  loadingLabel?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  confirmIcon: ConfirmIcon,
  onConfirm,
  open,
  onOpenChange,
  isLoading = false,
  loadingLabel = "Processing...",
  variant = "info",
}: ConfirmDialogProps) {
  const variantStyles = {
    danger:
      "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40",
    warning:
      "bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40",
    info: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40",
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white/95 backdrop-blur-xl border-zinc-200 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-zinc-900">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-600">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            className="font-semibold hover:bg-zinc-50 border-zinc-200"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={`text-white font-semibold ${variantStyles[variant]}`}
          >
            {isLoading ? (
              loadingLabel
            ) : (
              <>
                {ConfirmIcon && <ConfirmIcon className="mr-2 h-4 w-4" />}
                {confirmLabel}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
