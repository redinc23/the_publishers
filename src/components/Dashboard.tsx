/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Books Finished', value: '128', trend: '12% this month', up: true },
    { label: 'Hours Listened', value: '43', trend: '3% from last month', up: false },
    { label: 'Achievements Unlocked', value: '7', trend: '2 new this month', up: true },
    { label: 'Items in My List', value: '15', trend: '+4 this week', up: true },
  ];

  return (
    <section className="dashboard-section py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Your Dashboard</h2>
        <p className="text-zinc-500 text-lg">At-a-glance stats for your account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#181818] p-8 rounded-xl border border-white/5 shadow-lg hover:border-[#ff7700]/30 transition-all group">
            <div className="text-4xl font-bold mb-2 group-hover:text-[#ff7700] transition-colors">{stat.value}</div>
            <div className="text-sm text-zinc-400 mb-4">{stat.label}</div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-[#46d369]' : 'text-[#e50914]'}`}>
              {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#181818] p-8 rounded-xl border border-white/5">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0073e6] to-[#8a2be2] flex items-center justify-center font-bold">U</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">You</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">2 hours ago</span>
                </div>
                <p className="text-zinc-400 text-sm">Finished reading "The Silent Echo" and added it to your favorites.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
