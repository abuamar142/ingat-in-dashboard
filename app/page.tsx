'use client'

import { useRealtimeUsers } from '@/hooks/useRealtimeUsers'
import { Stats } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const { users, loading, error } = useRealtimeUsers()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    absenPagi: { sudah: 0, belum: 0, percentage: 0 },
    absenSore: { sudah: 0, belum: 0, percentage: 0 },
  })
  const [lastUpdate, setLastUpdate] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (users.length > 0) {
      const totalUsers = users.length
      const absenPagiSudah = users.filter((u) => u.absen_pagi).length
      const absenSoreSudah = users.filter((u) => u.absen_sore).length

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
      })
    }
    updateTimestamp()
  }, [users])

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimestamp()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const updateTimestamp = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    setLastUpdate(timeString)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center text-white mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
            📊 Ingat-In Dashboard
          </h1>
          <p className="text-white/90 text-lg">Monitoring Absensi WhatsApp Bot</p>
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className={`w-3 h-3 rounded-full animate-pulse ${error ? 'bg-red-400' : 'bg-green-400'}`}></div>
              <span className="text-sm font-medium">{error ? 'Error' : 'Live'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              Last update: <span>{lastUpdate || '-'}</span>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <div className="flex">
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium">⚠️ Gagal memuat data</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
            <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Total Users</h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-12 w-20 rounded"></div>
              ) : (
                stats.totalUsers
              )}
            </div>
            <p className="text-sm text-gray-500">Terdaftar di bot</p>
          </div>

          {/* Absen Pagi Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Absen Pagi</h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-12 w-24 rounded"></div>
              ) : (
                `${stats.absenPagi.sudah}/${stats.totalUsers}`
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                  style={{ width: `${stats.absenPagi.percentage}%` }}
                ></div>
              </div>
              <span className="text-lg font-semibold text-indigo-600">{stats.absenPagi.percentage}%</span>
            </div>
          </div>

          {/* Absen Sore Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Absen Sore</h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-12 w-24 rounded"></div>
              ) : (
                `${stats.absenSore.sudah}/${stats.totalUsers}`
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-purple-500 to-purple-600 h-full transition-all duration-500"
                  style={{ width: `${stats.absenSore.percentage}%` }}
                ></div>
              </div>
              <span className="text-lg font-semibold text-purple-600">{stats.absenSore.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Users</h2>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <span>{isRefreshing ? '⏳' : '🔄'}</span> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading data...</p>
              </div>
            ) : users.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor WhatsApp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absen Pagi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absen Sore</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check-in</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, idx) => (
                    <tr key={user.id || idx} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.absen_pagi ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {user.absen_pagi ? '✓ Sudah' : '✗ Belum'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.absen_sore ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {user.absen_sore ? '✓ Sudah' : '✗ Belum'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.last_checkin ? new Date(user.last_checkin).toLocaleString('id-ID') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <svg className="mx-auto h-20 w-20 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada user yang terdaftar</h3>
                <p className="text-gray-500">User akan muncul setelah mengirim pesan ke bot</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
