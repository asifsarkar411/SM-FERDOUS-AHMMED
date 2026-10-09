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
  const name = profile.name || 'SM Ferdous Ahmmed';

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Mesh Glows in Dark Mode */}
      <div className="hidden dark:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Light Mode subtle soft ambient accents */}
      <div className="dark:hidden absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="dark:hidden absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Text & CTAs */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Dynamic Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Status: {profile.statusBadge || 'Active for Hire / Open to New Projects'}</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Hi, I’m <br className="hidden sm:inline" />
                <span className="text-gradient-cyan">{name}</span>
              </h1>
              <h2 className="text-base sm:text-xl font-medium text-indigo-600 dark:text-indigo-300 font-mono flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400 inline" />
                {profile.title || 'Software Quality Assurance Engineer & Full-Stack Developer'}
              </h2>
            </div>

            {/* Intro Bio */}
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.bio || 'Passionate Quality Assurance Specialist and Full-Stack Web Developer based in Mirpur, Dhaka. Dedicated to engineering robust test automation frameworks, seamless digital experiences, and scalable cloud solutions.'}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                {profile.location || 'Mirpur, Dhaka, Bangladesh'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                SQA & Automation Specialist
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Next.js / React / Node.js
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Message</span>
              </a>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Resume / CV</span>
                </a>
              )}

              <a
                href="#projects"
                className="px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-black/5 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                <span>View Projects</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Connect:</span>
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-600/30 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all transform hover:scale-105"
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
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-cyan-50 dark:hover:bg-cyan-600/30 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-all transform hover:scale-105"
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
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-sky-50 dark:hover:bg-sky-600/30 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white transition-all transform hover:scale-105"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-600/30 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-all transform hover:scale-105"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo with Glowing Ring & Floating Badges */}
          <div className="relative flex items-center justify-center">
            {/* Outer Rotating Glow in Dark Mode */}
            <div className="hidden dark:block absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/25 to-purple-500/20 blur-2xl animate-pulse pointer-events-none" />

            {/* Avatar Frame */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-3xl p-2.5 bg-gradient-to-b from-indigo-500/40 via-slate-200 dark:via-black to-cyan-500/40 backdrop-blur-md shadow-2xl border border-black/10 dark:border-white/15">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-100 dark:bg-black">
                <Image
                  src={profile.avatarUrl || fallbackAvatar}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover object-center filter saturate-[1.05] transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              {/* Floating Badge 1: QA Automation */}
              <div className="absolute -top-3 -left-2 sm:-left-6 px-3.5 py-2 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-cyan-500/30 animate-float">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Expertise</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">SQA & Automation</p>
                </div>
              </div>

              {/* Floating Badge 2: Modern Stack */}
              <div className="absolute -bottom-3 -right-2 sm:-right-6 px-3.5 py-2 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-indigo-500/30">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Full-Stack</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Next.js & MERN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
