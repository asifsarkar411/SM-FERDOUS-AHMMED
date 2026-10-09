'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05080f] border-t border-white/5 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-base">Pritom Chowdhury</p>
              <p className="text-xs text-slate-400 font-mono">SQA Engineer & Full-Stack Developer</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#target" className="hover:text-cyan-400 transition-colors">Next Target</a>
            <a href="#gallery" className="hover:text-cyan-400 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            <Link href="/admin" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
              <Shield className="w-3 h-3" />
              Admin Portal
            </Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/5 transition-colors flex items-center gap-2 text-xs font-mono"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Pritom Chowdhury. All rights reserved.</p>
          <p className="font-mono text-[11px] text-slate-400">
            Engineered with Next.js App Router, Tailwind CSS & MongoDB Atlas.
          </p>
        </div>
      </div>
    </footer>
  );
}
