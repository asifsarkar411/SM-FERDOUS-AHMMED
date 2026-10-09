'use client';

import React from 'react';
import Image from 'next/image';
import {
  Download,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Code2,
  Terminal,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/Icons';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    bio: string;
    statusBadge: string;
    location: string;
    avatarUrl: string;
    resumeUrl: string;
    email: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      website?: string;
    };
  };
}

export default function Hero({ profile }: HeroProps) {
  const fallbackAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Text & CTAs */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Dynamic Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium shadow-sm shadow-emerald-500/20 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
              <span>Status: {profile.statusBadge || 'Active for Hire / Open to New Projects'}</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I’m <br className="hidden sm:inline" />
                <span className="text-gradient-cyan">{profile.name || 'Pritom Chowdhury'}</span>
              </h1>
              <h2 className="text-lg sm:text-xl font-medium text-indigo-300 font-mono flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-5 h-5 text-cyan-400 inline" />
                {profile.title || 'Software Quality Assurance Engineer & Full-Stack Developer'}
              </h2>
            </div>

            {/* Intro Bio */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {profile.bio || 'Passionate Quality Assurance Specialist and Full-Stack Web Developer based in Mirpur, Dhaka. Dedicated to engineering robust test automation frameworks, seamless digital experiences, and scalable cloud solutions.'}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-white/5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {profile.location || 'Mirpur, Dhaka, Bangladesh'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                SQA & Automation Specialist
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-white/5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Next.js / React / Node.js
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Message</span>
              </a>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-indigo-400/50 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Resume / CV</span>
                </a>
              )}

              <a
                href="#projects"
                className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                <span>View Projects</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">Connect:</span>
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-sky-600/30 border border-white/10 hover:border-sky-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo with Glowing Ring & Floating Badges */}
          <div className="relative flex items-center justify-center">
            {/* Outer Rotating Glow */}
            <div className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-purple-500/20 blur-2xl animate-pulse-slow pointer-events-none" />

            {/* Avatar Frame */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-3xl p-2.5 bg-gradient-to-b from-indigo-500/40 via-slate-800/60 to-cyan-500/40 backdrop-blur-md shadow-2xl border border-white/10">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-900">
                <Image
                  src={profile.avatarUrl || fallbackAvatar}
                  alt={profile.name || 'Pritom Chowdhury'}
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover object-center filter saturate-[1.05] transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              {/* Floating Badge 1: QA Automation */}
              <div className="absolute -top-3 -left-3 sm:-left-6 px-3.5 py-2 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-cyan-400/30 animate-float">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono">Expertise</p>
                  <p className="text-xs font-bold text-white">SQA & Automation</p>
                </div>
              </div>

              {/* Floating Badge 2: Modern Stack */}
              <div className="absolute -bottom-4 -right-2 sm:-right-6 px-3.5 py-2 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-indigo-400/30">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono">Full-Stack</p>
                  <p className="text-xs font-bold text-white">Next.js & MERN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
