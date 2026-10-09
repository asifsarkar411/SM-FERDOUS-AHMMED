'use client';

import React from 'react';
import {
  Heart,
  Terminal,
  Users,
  Gamepad2,
  BookOpen,
  Sparkles,
  Music,
  Camera,
  Coffee
} from 'lucide-react';

interface HobbyItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
}

interface HobbiesProps {
  hobbies: HobbyItem[];
}

export default function Hobbies({ hobbies }: HobbiesProps) {
  const getIcon = (title: string, iconStr?: string) => {
    const key = (iconStr || title).toLowerCase();
    if (key.includes('terminal') || key.includes('linux') || key.includes('security'))
      return <Terminal className="w-6 h-6 text-emerald-400" />;
    if (key.includes('users') || key.includes('community') || key.includes('mentor'))
      return <Users className="w-6 h-6 text-indigo-400" />;
    if (key.includes('game') || key.includes('gaming'))
      return <Gamepad2 className="w-6 h-6 text-purple-400" />;
    if (key.includes('book') || key.includes('writing') || key.includes('blog'))
      return <BookOpen className="w-6 h-6 text-cyan-400" />;
    if (key.includes('music')) return <Music className="w-6 h-6 text-rose-400" />;
    if (key.includes('camera') || key.includes('photo'))
      return <Camera className="w-6 h-6 text-amber-400" />;
    if (key.includes('coffee')) return <Coffee className="w-6 h-6 text-amber-500" />;
    return <Sparkles className="w-6 h-6 text-cyan-400" />;
  };

  return (
    <section id="hobbies" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Heart className="w-3.5 h-3.5" />
            <span>PERSONAL PASSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Hobbies & <span className="text-gradient-primary">Extra Activities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Exploring beyond work through system customization, community sharing, and creative endeavors.
          </p>
        </div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((item, idx) => (
            <div
              key={item._id || idx}
              className="glass-card rounded-2xl p-6 border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center">
                  {getIcon(item.title, item.icon)}
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
