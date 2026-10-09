'use client';

import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon } from '@/components/Icons';

interface ContactProps {
  profile: {
    name: string;
    email: string;
    phone?: string;
    location: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      website?: string;
    };
  };
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    subject: '',
    body: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMessage(data.message || 'Your message has been sent successfully!');
        setFormData({ senderName: '', email: '', subject: '', body: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setResponseMessage((err as Error).message || 'Network error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET’S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contact & <span className="text-gradient-primary">Direct Message</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a project opportunity, QA inquiry, or question? Send a message directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white">
                Contact Information
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Available for full-time opportunities, SQA automation consulting, and full-stack development contracts.
              </p>

              <div className="space-y-4 pt-2">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400">Location</p>
                    <p className="text-sm font-semibold text-white">
                      {profile.location || 'Mirpur, Dhaka, Bangladesh'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400">Email Address</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                {profile.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-400">Phone</p>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Follow on Socials
                </p>
                <div className="flex items-center gap-3">
                  {profile.socialLinks?.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socialLinks?.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-cyan-600/30 border border-white/10 hover:border-cyan-500 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socialLinks?.twitter && (
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-600/30 border border-white/10 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socialLinks?.facebook && (
                    <a
                      href={profile.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:scale-105"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form (Stored in DB) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Submitted data is directly recorded in the MongoDB database and visible in the secure Admin panel.
                </p>
              </div>

              {/* Status Banner */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message Received!</p>
                    <p className="text-xs text-emerald-200/80 mt-0.5">{responseMessage}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Submission Error</p>
                    <p className="text-xs text-rose-200/80 mt-0.5">{responseMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="senderName"
                      className="block text-xs font-mono uppercase text-slate-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      required
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase text-slate-300 mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase text-slate-300 mb-1.5"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry regarding QA Automation role..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="body"
                    className="block text-xs font-mono uppercase text-slate-300 mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    required
                    rows={4}
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Hello Pritom, I came across your test automation frameworks..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
