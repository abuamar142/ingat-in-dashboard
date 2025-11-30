"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Save } from "lucide-react";

import { useCreateUser } from "@/services/users/mutation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CreateUserPage() {
  const router = useRouter();
  const createUserMutation = useCreateUser();

  const [formData, setFormData] = useState({
    number: "",
    absen_pagi: false,
    absen_sore: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!formData.number) {
      alert("Please enter a phone number");
      return;
    }

    // Format number to include WhatsApp format
    let formattedNumber = formData.number;

    // Remove leading 0 and add 62 if not present
    if (formattedNumber.startsWith("0")) {
      formattedNumber = "62" + formattedNumber.substring(1);
    } else if (!formattedNumber.startsWith("62")) {
      formattedNumber = "62" + formattedNumber;
    }

    // Add WhatsApp suffix if not present
    if (!formattedNumber.includes("@s.whatsapp.net")) {
      formattedNumber += "@s.whatsapp.net";
    }

    try {
      await createUserMutation.mutateAsync({
        number: formattedNumber,
        absen_pagi: formData.absen_pagi,
        absen_sore: formData.absen_sore,
      });

      alert("User created successfully!");
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  const toggleAbsenPagi = () => {
    setFormData((prev) => ({ ...prev, absen_pagi: !prev.absen_pagi }));
  };

  const toggleAbsenSore = () => {
    setFormData((prev) => ({ ...prev, absen_sore: !prev.absen_sore }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button onClick={() => router.push("/users")} variant="outline" className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>

        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent mb-2">
            Create New User
          </h1>
          <p className="text-lg text-zinc-600">Add a new user to the system</p>
        </div>
      </div>

      {/* Create Form */}
      <Card className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 backdrop-blur-2xl">
        <CardHeader className="border-b border-zinc-100/80 bg-linear-to-br from-zinc-50/50 to-white">
          <CardTitle className="text-2xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-zinc-700" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* WhatsApp Number */}
            <div className="space-y-3">
              <Label htmlFor="number" className="text-sm font-semibold text-zinc-700">
                WhatsApp Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="number"
                type="text"
                value={formData.number}
                onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
                placeholder="08123456789 or 628123456789"
                className="font-mono border-zinc-300 focus:border-blue-500"
                required
              />
              <p className="text-xs text-zinc-500">
                Enter phone number (with or without country code)
              </p>
            </div>

            {/* Check-in Status */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-zinc-700">Check-in Status</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Morning Check-in */}
                <div
                  onClick={toggleAbsenPagi}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.absen_pagi
                      ? "border-emerald-300 bg-linear-to-br from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-200/50"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-900">Morning Check-in</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        formData.absen_pagi
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : "bg-zinc-200 text-zinc-600 border-zinc-300"
                      }`}
                    >
                      {formData.absen_pagi ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600">Click to toggle morning check-in status</p>
                </div>

                {/* Evening Check-in */}
                <div
                  onClick={toggleAbsenSore}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.absen_sore
                      ? "border-violet-300 bg-linear-to-br from-violet-50 to-violet-100/50 shadow-lg shadow-violet-200/50"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-900">Evening Check-in</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        formData.absen_sore
                          ? "bg-violet-500 text-white border-violet-600"
                          : "bg-zinc-200 text-zinc-600 border-zinc-300"
                      }`}
                    >
                      {formData.absen_sore ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600">Click to toggle evening check-in status</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/users")}
                disabled={createUserMutation.isPending}
                className="flex-1 font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createUserMutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                {createUserMutation.isPending ? (
                  <>
                    <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
