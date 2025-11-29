"use client";

import { useEffect, useState } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { RefreshCw, Users, CheckCircle, XCircle, AlertTriangle, Activity } from "lucide-react";

import { useRealtimeUsers } from "@/hooks/useRealtimeUsers";
import { Stats } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { users, loading, error } = useRealtimeUsers();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    absenPagi: { sudah: 0, belum: 0, percentage: 0 },
    absenSore: { sudah: 0, belum: 0, percentage: 0 },
  });
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      const totalUsers = users.length;
      const absenPagiSudah = users.filter((u) => u.absen_pagi).length;
      const absenSoreSudah = users.filter((u) => u.absen_sore).length;

      setStats({
        totalUsers,
        absenPagi: {
          sudah: absenPagiSudah,
          belum: totalUsers - absenPagiSudah,
          percentage: totalUsers > 0 ? Math.round((absenPagiSudah / totalUsers) * 100) : 0,
        },
        absenSore: {
          sudah: absenSoreSudah,
          belum: totalUsers - absenSoreSudah,
          percentage: totalUsers > 0 ? Math.round((absenSoreSudah / totalUsers) * 100) : 0,
        },
      });
    }
    updateTimestamp();
  }, [users]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimestamp();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTimestamp = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLastUpdate(timeString);
  };

  const pageTransition: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const cardHover: TargetAndTransition = {
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  const formatPhoneNumber = (number: string) => {
    return number.replace("@s.whatsapp.net", "");
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-lg text-zinc-600">
              Real-time monitoring of WhatsApp Bot attendance system
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 bg-white/70 px-4 py-2 rounded-xl border border-zinc-200/60 backdrop-blur-sm shadow-sm">
            <span className={`relative flex h-2.5 w-2.5`}>
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  error ? "bg-red-500" : "bg-emerald-500"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  error ? "bg-red-500" : "bg-emerald-500"
                }`}
              ></span>
            </span>
            <Activity className="h-4 w-4 text-zinc-400" />
            <span className="font-medium">{lastUpdate}</span>
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6"
        >
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="flex items-center gap-4 p-4 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Gagal memuat data</p>
                <p className="text-sm">{error}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} whileHover={cardHover} className="h-full">
            <Card className="relative overflow-hidden border-blue-100/50 bg-linear-to-br from-white via-blue-50/30 to-white backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group h-full">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl group-hover:bg-blue-400/20 transition-colors duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-zinc-600 uppercase tracking-wide">
                  Total Users
                </CardTitle>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30"
                >
                  <Users className="h-5 w-5" />
                </motion.div>
              </CardHeader>
              <CardContent className="pt-2 relative z-10">
                <div className="text-5xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-3">
                  {loading ? (
                    <div className="h-12 w-24 bg-linear-to-r from-zinc-200 to-zinc-300 animate-pulse rounded-lg" />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stats.totalUsers}
                    </motion.span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 flex items-center gap-1.5 font-medium">
                  <span className="text-blue-600 font-semibold">↗ +2.5%</span> from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={cardHover} className="h-full">
            <Card className="relative overflow-hidden border-emerald-100/50 bg-linear-to-br from-white via-emerald-50/30 to-white backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 group h-full">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/20 transition-colors duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-zinc-600 uppercase tracking-wide">
                  Absen Pagi
                </CardTitle>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-500/30"
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
              </CardHeader>
              <CardContent className="pt-2 relative z-10">
                <div className="text-5xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-3">
                  {loading ? (
                    <div className="h-12 w-32 bg-linear-to-r from-zinc-200 to-zinc-300 animate-pulse rounded-lg" />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stats.absenPagi.sudah}/{stats.totalUsers}
                    </motion.span>
                  )}
                </div>
                <Progress
                  value={stats.absenPagi.percentage}
                  className="h-2 bg-emerald-100/60 [&>div]:bg-linear-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600 rounded-full mb-3"
                />
                <p className="text-sm text-zinc-500 font-medium">
                  <span className="text-emerald-600 font-semibold">
                    {stats.absenPagi.percentage}%
                  </span>{" "}
                  Completion rate
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={cardHover} className="h-full">
            <Card className="relative overflow-hidden border-violet-100/50 bg-linear-to-br from-white via-violet-50/30 to-white backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 group h-full">
              <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-400/10 blur-2xl group-hover:bg-violet-400/20 transition-colors duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-zinc-600 uppercase tracking-wide">
                  Absen Sore
                </CardTitle>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-linear-to-br from-violet-500 to-violet-600 rounded-2xl text-white shadow-lg shadow-violet-500/30"
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
              </CardHeader>
              <CardContent className="pt-2 relative z-10">
                <div className="text-5xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-3">
                  {loading ? (
                    <div className="h-12 w-32 bg-linear-to-r from-zinc-200 to-zinc-300 animate-pulse rounded-lg" />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stats.absenSore.sudah}/{stats.totalUsers}
                    </motion.span>
                  )}
                </div>
                <Progress
                  value={stats.absenSore.percentage}
                  className="h-2 bg-violet-100/60 [&>div]:bg-linear-to-r [&>div]:from-violet-500 [&>div]:to-violet-600 rounded-full mb-3"
                />
                <p className="text-sm text-zinc-500 font-medium">
                  <span className="text-violet-600 font-semibold">
                    {stats.absenSore.percentage}%
                  </span>{" "}
                  Completion rate
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 backdrop-blur-2xl">
            <CardHeader className="border-b border-zinc-100/80 pb-6 bg-linear-to-br from-zinc-50/50 to-white">
              <CardTitle className="text-2xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent flex items-center gap-3">
                <Activity className="h-6 w-6 text-zinc-700" />
                Recent Activity
              </CardTitle>
              <p className="text-sm text-zinc-500 mt-2 font-medium">Latest check-ins from users</p>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
                  <p className="text-sm text-zinc-500 font-medium">Loading activity...</p>
                </div>
              ) : users.length > 0 ? (
                <div className="space-y-4">
                  {users
                    .filter((u) => u.last_checkin)
                    .sort(
                      (a, b) =>
                        new Date(b.last_checkin!).getTime() - new Date(a.last_checkin!).getTime()
                    )
                    .slice(0, 5)
                    .map((user, idx) => (
                      <motion.div
                        key={user.id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors border border-zinc-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 font-mono text-sm">
                              {formatPhoneNumber(user.number)}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {user.last_checkin &&
                                new Date(user.last_checkin).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {user.absen_pagi && (
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-700 border-emerald-300"
                            >
                              Morning
                            </Badge>
                          )}
                          {user.absen_sore && (
                            <Badge
                              variant="outline"
                              className="bg-violet-50 text-violet-700 border-violet-300"
                            >
                              Evening
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-500">
                  <Activity className="mx-auto h-12 w-12 mb-4 text-zinc-300" />
                  <p className="text-sm font-medium">No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
