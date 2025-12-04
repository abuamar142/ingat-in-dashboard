"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Users, CheckCircle, AlertTriangle, Activity } from "lucide-react";

import { useUsers, useRecentActivity } from "@/services/users/query";
import { RealtimeIndicator } from "@/components/atoms/realtimeIndicator";
import { PageHeader } from "@/components/atoms/pageHeader";
import { LoadingState } from "@/components/atoms/loadingState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IStats } from "@/interfaces/stats";
import { StatCard } from "@/components/molecules/statCard";

export default function Home() {
  const { data: users = [], isLoading: loading, error } = useUsers();
  const { data: recentActivity = [], isLoading: recentActivityLoading } = useRecentActivity();

  const stats: IStats = useMemo(() => {
    if (users.length === 0) {
      return {
        totalUsers: 0,
        absenPagi: { sudah: 0, belum: 0, percentage: 0 },
        absenSore: { sudah: 0, belum: 0, percentage: 0 },
      };
    }

    const totalUsers = users.length;
    const absenPagiSudah = users.filter((u) => u.absen_pagi).length;
    const absenSoreSudah = users.filter((u) => u.absen_sore).length;

    return {
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
    };
  }, [users]);

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

  const formatPhoneNumber = (number: string) => {
    return number.replace("@s.whatsapp.net", "");
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="show"
      className="space-y-6 md:space-y-8"
    >
      {/* Header */}
      <PageHeader
        title="Dashboard Overview"
        description="Real-time monitoring of WhatsApp Bot attendance system"
        action={<RealtimeIndicator />}
      />

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
                <p className="text-sm">{error?.message || "Unknown error"}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 md:space-y-8"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            gradient="blue"
            footer="↗ +2.5% from last week"
            loading={loading}
          />
          <StatCard
            title="Absen Pagi"
            value={`${stats.absenPagi.sudah}/${stats.totalUsers}`}
            icon={CheckCircle}
            gradient="emerald"
            progress={stats.absenPagi.percentage}
            footer={`${stats.absenPagi.percentage}% Completion rate`}
            loading={loading}
          />
          <StatCard
            title="Absen Sore"
            value={`${stats.absenSore.sudah}/${stats.totalUsers}`}
            icon={CheckCircle}
            gradient="violet"
            progress={stats.absenSore.percentage}
            footer={`${stats.absenSore.percentage}% Completion rate`}
            loading={loading}
          />
        </div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card className="shadow-xl border-zinc-200/50 overflow-hidden bg-white/90 backdrop-blur-2xl">
            <CardHeader className="bg-linear-to-br from-zinc-50/50 to-white">
              <CardTitle className="text-2xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent flex items-center gap-3">
                <Activity className="h-6 w-6 text-zinc-700" />
                Recent Activity
              </CardTitle>
              <p className="text-sm text-zinc-500 mt-2 font-medium">Latest check-ins from users</p>
            </CardHeader>
            <CardContent className="p-6">
              {recentActivityLoading ? (
                <LoadingState message="Loading activity..." />
              ) : recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((user, idx) => (
                    <motion.div
                      key={user.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex items-center justify-between p-5 rounded-xl bg-linear-to-br from-zinc-50/80 to-white hover:from-zinc-100/80 hover:to-zinc-50/50 transition-all duration-300 border border-zinc-200/60 hover:border-zinc-300/80 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {user.name && (
                            <p className="font-semibold text-zinc-900 text-base truncate">
                              {user.name}
                            </p>
                          )}
                          <p
                            className={`font-mono text-xs ${
                              user.name ? "text-zinc-500" : "font-semibold text-zinc-900 text-base"
                            }`}
                          >
                            {formatPhoneNumber(user.number)}
                          </p>
                          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                            {user.last_checkin &&
                              new Date(user.last_checkin).toLocaleString("id-ID", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0 ml-4">
                        {user.absen_pagi && (
                          <Badge
                            variant="outline"
                            className="bg-linear-to-br from-emerald-50 to-emerald-100/50 text-emerald-700 border-emerald-300 font-medium shadow-sm"
                          >
                            Morning
                          </Badge>
                        )}
                        {user.absen_sore && (
                          <Badge
                            variant="outline"
                            className="bg-linear-to-br from-violet-50 to-violet-100/50 text-violet-700 border-violet-300 font-medium shadow-sm"
                          >
                            Evening
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-500">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                    <Activity className="h-10 w-10 text-zinc-400" />
                  </div>
                  <p className="text-base font-semibold text-zinc-600">No recent activity</p>
                  <p className="text-sm text-zinc-400 mt-1">Check-ins will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
