/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, BookOpen, TrendingUp, Settings, Shield, MoreVertical } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '12,458', icon: Users, color: 'text-blue-500' },
    { label: 'Active Books', value: '3,842', icon: BookOpen, color: 'text-emerald-500' },
    { label: 'Monthly Revenue', value: '$45,280', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'System Health', value: '99.9%', icon: Shield, color: 'text-purple-500' },
  ];

  return (
    <section className="admin-panel py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-zinc-500 text-lg">Manage LitStream platform and users</p>
        </div>
        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#181818] p-8 rounded-xl border border-white/5 shadow-lg group hover:border-[#ff7700]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-zinc-900 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="text-3xl font-bold mb-1 group-hover:text-[#ff7700] transition-colors">{stat.value}</div>
            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#181818] rounded-xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
            <h3 className="text-xl font-bold">Recent Users</h3>
            <button className="text-sm text-[#ff7700] font-bold hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4 font-bold">User</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Plan</th>
                  <th className="px-6 py-4 font-bold">Joined</th>
                  <th className="px-6 py-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7700] to-[#cc5500] flex items-center justify-center font-bold text-sm">JD</div>
                        <div>
                          <div className="font-bold text-white">John Doe</div>
                          <div className="text-xs text-zinc-500">john@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Premium</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">Oct 12, 2024</td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#181818] rounded-xl border border-white/5 p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-8">System Alerts</h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0 animate-pulse" />
                <div>
                  <div className="font-bold text-sm mb-1">Storage usage high (85%)</div>
                  <p className="text-xs text-zinc-500 leading-relaxed">Consider upgrading your storage plan or cleaning up old files.</p>
                  <div className="text-[10px] text-zinc-600 mt-2 uppercase tracking-widest font-bold">15 minutes ago</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold text-sm transition-colors border border-white/5">
            View All Alerts
          </button>
        </div>
      </div>
    </section>
  );
};
