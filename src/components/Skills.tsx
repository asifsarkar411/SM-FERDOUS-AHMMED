'use client';

import React, { useState } from 'react';
import {
  Code,
  ShieldCheck,
  Server,
  TerminalSquare,
  Cpu,
  Layers,
  Palette,
  FileCode,
  Database,
  Network,
  GitBranch,
  Box,
  Terminal,
  Kanban,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SkillItem {
  _id?: string;
  category: string;
  name: string;
  proficiency: number;
  icon?: string;
}

interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  // Icon mapping helper
  const renderIcon = (name: string, iconStr?: string) => {
    const key = (iconStr || name).toLowerCase();
    if (key.includes('shield') || key.includes('quality') || key.includes('sqa'))
      return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    if (key.includes('playwright') || key.includes('check'))
      return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    if (key.includes('selenium') || key.includes('cpu'))
      return <Cpu className="w-5 h-5 text-purple-400" />;
    if (key.includes('postman') || key.includes('terminal'))
      return <Terminal className="w-5 h-5 text-amber-400" />;
    if (key.includes('jira') || key.includes('kanban'))
      return <Kanban className="w-5 h-5 text-blue-400" />;
    if (key.includes('react') || key.includes('code'))
      return <Code className="w-5 h-5 text-cyan-400" />;
    if (key.includes('next') || key.includes('layers'))
      return <Layers className="w-5 h-5 text-indigo-400" />;
    if (key.includes('tailwind') || key.includes('palette'))
      return <Palette className="w-5 h-5 text-teal-400" />;
    if (key.includes('type') || key.includes('file'))
      return <FileCode className="w-5 h-5 text-blue-400" />;
    if (key.includes('mongo') || key.includes('database'))
      return <Database className="w-5 h-5 text-emerald-400" />;
    if (key.includes('node') || key.includes('server'))
      return <Server className="w-5 h-5 text-emerald-400" />;
    if (key.includes('api') || key.includes('network'))
      return <Network className="w-5 h-5 text-indigo-400" />;
    if (key.includes('linux') || key.includes('zorin') || key.includes('kali'))
      return <TerminalSquare className="w-5 h-5 text-orange-400" />;
    if (key.includes('git'))
      return <GitBranch className="w-5 h-5 text-rose-400" />;
    if (key.includes('docker') || key.includes('box'))
      return <Box className="w-5 h-5 text-sky-400" />;

    return <Sparkles className="w-5 h-5 text-indigo-400" />;
  };

  const getProficiencyLabel = (pct: number) => {
    if (pct >= 90) return 'Expert';
    if (pct >= 80) return 'Advanced';
    if (pct >= 70) return 'Proficient';
    return 'Intermediate';
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & <span className="text-gradient-cyan">Competencies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Proficiencies across software verification, automation tools, web engineering, and Linux operating systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill._id || idx}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center">
                      {renderIcon(skill.name, skill.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    {getProficiencyLabel(skill.proficiency)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 mt-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
