'use client';

import React from 'react';
import { Target as TargetIcon, Compass, CheckSquare, Clock, Zap } from 'lucide-react';

interface TargetItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  timeframe: string;
  status: string;
  keyMilestones: string[];
}

interface TargetProps {
  targets: TargetItem[];
}

export default function Target({ targets }: TargetProps) {
  return (
    <section id="target" className="py-24 relative bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>ROADMAP & HORIZONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Next Target <span className="text-gradient-cyan">to Work</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Strategic technical pursuits, research ambitions, and advanced engineering milestones.
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((tgt, idx) => (
            <div
              key={tgt._id || idx}
              className="glass-card rounded-2xl p-7 border border-white/10 glass-panel-hover flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {tgt.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tgt.timeframe}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TargetIcon className="w-5 h-5 text-cyan-400 shrink-0" />
                    {tgt.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-300">
                      Status: {tgt.status}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {tgt.description}
                </p>

                {/* Milestones Checklist */}
                {tgt.keyMilestones && tgt.keyMilestones.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <p className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Key Milestones:
                    </p>
                    <ul className="space-y-2">
                      {tgt.keyMilestones.map((ms, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
