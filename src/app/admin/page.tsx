'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  FolderGit2,
  Compass,
  Heart,
  Camera,
  MessageSquare,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  Database,
  RefreshCw,
  Mail,
  Calendar,
  X
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

// Types
interface ProfileData {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  aboutStory: string;
  status: string;
  statusBadge: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
}

interface ExperienceItem {
  _id?: string;
  company: string;
  role: string;
  location?: string;
  duration: string;
  isCurrent: boolean;
  responsibilities: string[];
  techStack: string[];
}

interface EducationItem {
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  passingYear: string;
  results: string;
  description?: string;
}

interface SkillItem {
  _id?: string;
  category: string;
  name: string;
  proficiency: number;
  icon?: string;
}

interface ProjectItem {
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  featured: boolean;
}

interface TargetItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  timeframe: string;
  status: string;
  keyMilestones: string[];
}

interface HobbyItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
}

interface GalleryItem {
  _id?: string;
  imageUrl: string;
  caption: string;
  description?: string;
  category?: string;
  altText?: string;
}

interface MessageItem {
  _id: string;
  senderName: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

type TabType =
  | 'overview'
  | 'profile'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'targets'
  | 'hobbies'
  | 'gallery'
  | 'messages';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Loading & notification states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Data states
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [hobbies, setHobbies] = useState<HobbyItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // Active item in modal for Add/Edit
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<any>(null);

  // Message viewer modal
  const [viewingMessage, setViewingMessage] = useState<MessageItem | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Auth Protection
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Fetch All Admin Data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        profRes,
        expRes,
        eduRes,
        skillRes,
        projRes,
        targetRes,
        hobbyRes,
        galRes,
        msgRes,
      ] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/experience'),
        fetch('/api/education'),
        fetch('/api/skills'),
        fetch('/api/projects'),
        fetch('/api/targets'),
        fetch('/api/hobbies'),
        fetch('/api/gallery'),
        fetch('/api/messages'),
      ]);

      const [
        profData,
        expData,
        eduData,
        skillData,
        projData,
        targetData,
        hobbyData,
        galData,
        msgData,
      ] = await Promise.all([
        profRes.json(),
        expRes.json(),
        eduRes.json(),
        skillRes.json(),
        projRes.json(),
        targetRes.json(),
        hobbyRes.json(),
        galRes.json(),
        msgRes.json(),
      ]);

      if (profData.data) setProfile(profData.data);
      if (expData.data) setExperiences(expData.data);
      if (eduData.data) setEducations(eduData.data);
      if (skillData.data) setSkills(skillData.data);
      if (projData.data) setProjects(projData.data);
      if (targetData.data) setTargets(targetData.data);
      if (hobbyData.data) setHobbies(hobbyData.data);
      if (galData.data) setGallery(galData.data);
      if (msgData.data) setMessages(msgData.data);
    } catch (err: unknown) {
      console.error('Failed to load dashboard data:', err);
      showNotification('error', 'Error connecting to API routes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      loadDashboardData();
    }
  }, [status, loadDashboardData]);

  // Seed / Reset Database Trigger
  const handleSeedDatabase = async () => {
    if (!window.confirm('Are you sure you want to seed/reset the database with the initial dataset for SM Ferdous Ahmmed? Existing records will be synced.')) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Database seeded successfully!');
        await loadDashboardData();
      } else {
        showNotification('error', data.error || 'Failed to seed database');
      }
    } catch (err: unknown) {
      showNotification('error', (err as Error).message || 'Error triggering database seed');
    } finally {
      setSaving(false);
    }
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Profile updated successfully!');
      } else {
        showNotification('error', data.error || 'Failed to update profile');
      }
    } catch (err: unknown) {
      showNotification('error', (err as Error).message || 'Network error updating profile');
    } finally {
      setSaving(false);
    }
  };

  // Generic Delete Helper
  const handleDeleteItem = async (endpoint: string, id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/${endpoint}?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Item deleted successfully');
        loadDashboardData();
      } else {
        showNotification('error', data.error || 'Delete operation failed');
      }
    } catch (err: unknown) {
      showNotification('error', (err as Error).message || 'Error deleting item');
    }
  };

  // Generic Save (Create / Update) Modal Form
  const handleSaveModal = async (endpoint: string, payload: any) => {
    setSaving(true);
    const isUpdate = Boolean(payload._id);
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', `Item ${isUpdate ? 'updated' : 'created'} successfully!`);
        setModalType(null);
        setModalItem(null);
        loadDashboardData();
      } else {
        showNotification('error', data.error || 'Operation failed');
      }
    } catch (err: unknown) {
      showNotification('error', (err as Error).message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  // Toggle Message Read Status
  const handleToggleMessageRead = async (msg: MessageItem) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg._id, read: !msg.read }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Authenticating & loading Admin Dashboard...</p>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-950/90 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-base">Admin Dashboard</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                SM Ferdous Ahmmed
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live Portfolio Link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-colors"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Seed Database Button */}
            <button
              onClick={handleSeedDatabase}
              disabled={saving}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/40 transition-colors"
              title="Reset sample data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
              <span>Seed / Reset DB</span>
            </button>

            {/* Sign Out */}
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Main Body with Sidebar Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <nav className="lg:col-span-3 glass-card rounded-2xl p-4 border border-white/10 space-y-1 sticky top-24">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile & Hero', icon: User },
              { id: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length },
              { id: 'education', label: 'Education', icon: GraduationCap, count: educations.length },
              { id: 'skills', label: 'Skills Matrix', icon: Cpu, count: skills.length },
              { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
              { id: 'targets', label: 'Next Targets', icon: Compass, count: targets.length },
              { id: 'hobbies', label: 'Hobbies & Extras', icon: Heart, count: hobbies.length },
              { id: 'gallery', label: 'Photo Gallery', icon: Camera, count: gallery.length },
              {
                id: 'messages',
                label: 'Direct Messages',
                icon: MessageSquare,
                badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && !tab.badge && (
                    <span className="text-[11px] font-mono text-slate-500">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tab Content Panel */}
          <main className="lg:col-span-9 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    Welcome back, <span className="text-cyan-400">{profile?.name || 'SM Ferdous Ahmmed'}</span>!
                  </h2>
                  <p className="text-sm text-slate-400">
                    Portfolio Management Control Center. Full CRUD operations across all portfolio collections.
                  </p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Projects', value: projects.length, icon: FolderGit2, color: 'text-indigo-400' },
                    { label: 'Skills', value: skills.length, icon: Cpu, color: 'text-cyan-400' },
                    { label: 'Experience Entries', value: experiences.length, icon: Briefcase, color: 'text-emerald-400' },
                    {
                      label: 'Messages',
                      value: `${messages.length} (${unreadMessagesCount} unread)`,
                      icon: MessageSquare,
                      color: 'text-rose-400',
                    },
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
                        <Icon className={`w-5 h-5 ${card.color}`} />
                        <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                          {card.value}
                        </div>
                        <div className="text-xs text-slate-400">{card.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Shortcuts */}
                <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    Database Actions & Quick Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600/80 hover:bg-indigo-500 text-white transition-colors"
                    >
                      View Inbox ({unreadMessagesCount} unread)
                    </button>
                    <button
                      onClick={() => {
                        setModalType('project');
                        setModalItem({
                          title: '',
                          description: '',
                          longDescription: '',
                          image: '',
                          techStack: [],
                          liveUrl: '',
                          githubUrl: '',
                          category: 'Web Application',
                          featured: false,
                        });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-colors"
                    >
                      + Add New Project
                    </button>
                    <button
                      onClick={handleSeedDatabase}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-white/10 transition-colors"
                    >
                      Sync / Reset Initial Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROFILE TAB */}
            {activeTab === 'profile' && profile && (
              <form onSubmit={handleSaveProfile} className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Profile & Hero Settings</h2>
                    <p className="text-xs text-slate-400">Update personal bio, hire status, resume, and contact links.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Status Badge Text</label>
                    <input
                      type="text"
                      value={profile.statusBadge}
                      onChange={(e) => setProfile({ ...profile, statusBadge: e.target.value })}
                      placeholder="Active for Hire / Open to New Projects"
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Short Hero Bio</label>
                  <textarea
                    rows={2}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Detailed About Me Story</label>
                  <textarea
                    rows={5}
                    value={profile.aboutStory}
                    onChange={(e) => setProfile({ ...profile, aboutStory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>

                {/* Profile Photo Uploader */}
                <ImageUploader
                  label="Profile Avatar Picture"
                  value={profile.avatarUrl}
                  onChange={(val) => setProfile({ ...profile, avatarUrl: val })}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Resume / CV URL</label>
                    <input
                      type="text"
                      value={profile.resumeUrl}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase text-slate-400">Social Profile URLs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={profile.socialLinks?.github || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialLinks: { ...profile.socialLinks, github: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={profile.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="Twitter URL"
                      value={profile.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* 3. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Professional Experience</h2>
                  <button
                    onClick={() => {
                      setModalType('experience');
                      setModalItem({
                        company: '',
                        role: '',
                        location: 'Dhaka, Bangladesh',
                        duration: '2024 - Present',
                        isCurrent: true,
                        responsibilities: [''],
                        techStack: [''],
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={exp._id || idx} className="glass-card rounded-2xl p-5 border border-white/10 flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{exp.role}</h3>
                          <span className="text-xs text-cyan-400 font-mono">@{exp.company}</span>
                          {exp.isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{exp.duration} • {exp.location}</p>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          {exp.responsibilities?.join(' ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setModalType('experience');
                            setModalItem({ ...exp });
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {exp._id && (
                          <button
                            onClick={() => handleDeleteItem('experience', exp._id!, exp.role)}
                            className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Educational Details</h2>
                  <button
                    onClick={() => {
                      setModalType('education');
                      setModalItem({
                        institution: '',
                        degree: '',
                        fieldOfStudy: '',
                        passingYear: '2024',
                        results: 'CGPA: 3.80',
                        description: '',
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {educations.map((edu, idx) => (
                    <div key={edu._id || idx} className="glass-card rounded-2xl p-5 border border-white/10 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                        <p className="text-xs text-cyan-400 font-semibold">{edu.institution}</p>
                        <p className="text-xs text-slate-400 font-mono">
                          Class of {edu.passingYear} • {edu.results}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setModalType('education');
                            setModalItem({ ...edu });
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {edu._id && (
                          <button
                            onClick={() => handleDeleteItem('education', edu._id!, edu.degree)}
                            className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Skills Matrix</h2>
                  <button
                    onClick={() => {
                      setModalType('skill');
                      setModalItem({
                        category: 'SQA & Automation',
                        name: '',
                        proficiency: 85,
                        icon: 'ShieldCheck',
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill, idx) => (
                    <div key={skill._id || idx} className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{skill.category}</p>
                        <div className="text-xs text-cyan-400 font-mono mt-1 font-semibold">
                          {skill.proficiency}%
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setModalType('skill');
                            setModalItem({ ...skill });
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {skill._id && (
                          <button
                            onClick={() => handleDeleteItem('skills', skill._id!, skill.name)}
                            className="p-2 rounded-lg bg-rose-950/60 text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Projects Showcase</h2>
                  <button
                    onClick={() => {
                      setModalType('project');
                      setModalItem({
                        title: '',
                        description: '',
                        longDescription: '',
                        image: '',
                        techStack: ['Next.js', 'Playwright'],
                        liveUrl: '',
                        githubUrl: '',
                        category: 'Web Application',
                        featured: false,
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((proj, idx) => (
                    <div key={proj._id || idx} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        {proj.image && (
                          <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-900">
                            <Image src={proj.image} alt={proj.title} fill className="object-cover" />
                          </div>
                        )}
                        <h3 className="font-bold text-white text-base">{proj.title}</h3>
                        <p className="text-xs text-slate-300 line-clamp-2">{proj.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[11px] font-mono text-cyan-400">{proj.category}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setModalType('project');
                              setModalItem({ ...proj });
                            }}
                            className="p-2 rounded-lg bg-slate-800 text-slate-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {proj._id && (
                            <button
                              onClick={() => handleDeleteItem('projects', proj._id!, proj.title)}
                              className="p-2 rounded-lg bg-rose-950/60 text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. NEXT TARGETS TAB */}
            {activeTab === 'targets' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Next Target Goals</h2>
                  <button
                    onClick={() => {
                      setModalType('target');
                      setModalItem({
                        title: '',
                        description: '',
                        category: 'Machine Learning',
                        timeframe: '2026',
                        status: 'In Progress',
                        keyMilestones: [''],
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Target</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {targets.map((tgt, idx) => (
                    <div key={tgt._id || idx} className="glass-card rounded-2xl p-5 border border-white/10 flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{tgt.title}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300">
                            {tgt.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{tgt.category} • {tgt.timeframe}</p>
                        <p className="text-xs text-slate-300">{tgt.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setModalType('target');
                            setModalItem({ ...tgt });
                          }}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {tgt._id && (
                          <button
                            onClick={() => handleDeleteItem('targets', tgt._id!, tgt.title)}
                            className="p-2 rounded-lg bg-rose-950/60 text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. HOBBIES TAB */}
            {activeTab === 'hobbies' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Hobbies & Extra Activities</h2>
                  <button
                    onClick={() => {
                      setModalType('hobby');
                      setModalItem({
                        title: '',
                        description: '',
                        category: 'Community',
                        icon: 'Terminal',
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Hobby</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hobbies.map((h, idx) => (
                    <div key={h._id || idx} className="glass-card rounded-2xl p-5 border border-white/10 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white text-sm">{h.title}</h4>
                        <p className="text-[11px] text-cyan-400 font-mono">{h.category}</p>
                        <p className="text-xs text-slate-300 mt-1">{h.description}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setModalType('hobby');
                            setModalItem({ ...h });
                          }}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {h._id && (
                          <button
                            onClick={() => handleDeleteItem('hobbies', h._id!, h.title)}
                            className="p-2 rounded-lg bg-rose-950/60 text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Photo Gallery</h2>
                  <button
                    onClick={() => {
                      setModalType('gallery');
                      setModalItem({
                        imageUrl: '',
                        caption: '',
                        description: '',
                        category: 'Workstation',
                        altText: '',
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((item, idx) => (
                    <div key={item._id || idx} className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
                      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900">
                        <Image src={item.imageUrl} alt={item.caption} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.caption}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono text-cyan-400">{item.category}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setModalType('gallery');
                              setModalItem({ ...item });
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {item._id && (
                            <button
                              onClick={() => handleDeleteItem('gallery', item._id!, item.caption)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. DIRECT MESSAGES VIEWER TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Direct Messages Inbox</h2>
                    <p className="text-xs text-slate-400">
                      Messages submitted by visitors through the public direct message form.
                    </p>
                  </div>
                  <button
                    onClick={loadDashboardData}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                    title="Refresh Inbox"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center text-slate-400 border border-white/10">
                    <Mail className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="text-sm">No direct messages received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`glass-card rounded-2xl p-5 border transition-all ${
                          msg.read ? 'border-white/5 opacity-80' : 'border-indigo-500/40 bg-indigo-950/20'
                        } flex items-start justify-between gap-4`}
                      >
                        <div className="space-y-1.5 flex-1 cursor-pointer" onClick={() => setViewingMessage(msg)}>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white text-sm sm:text-base">
                              {msg.senderName}
                            </h3>
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-cyan-400">{msg.subject}</p>
                          <p className="text-xs text-slate-300 line-clamp-2">{msg.body}</p>
                          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
                            <span>{msg.email}</span>
                            <span>•</span>
                            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleMessageRead(msg)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                              msg.read
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={() => handleDeleteItem('messages', msg._id, msg.subject)}
                            className="p-2 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* FULL MESSAGE VIEWER MODAL */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-2xl max-w-lg w-full border border-white/10 p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setViewingMessage(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400">Direct Message</span>
              <h3 className="text-xl font-bold text-white">{viewingMessage.subject}</h3>
              <p className="text-xs text-slate-400 font-mono">
                From: {viewingMessage.senderName} ({viewingMessage.email})
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {viewingMessage.body}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-500">
                Received: {new Date(viewingMessage.createdAt).toLocaleString()}
              </span>
              <a
                href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                Reply by Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM FOR EXPERIENCE / EDUCATION / SKILLS / PROJECTS / TARGETS / HOBBIES / GALLERY */}
      {modalType && modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-white/10 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setModalType(null);
                setModalItem(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white capitalize">
              {modalItem._id ? 'Edit' : 'Add New'} {modalType}
            </h3>

            {/* Experience Form */}
            {modalType === 'experience' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={modalItem.company || ''}
                    onChange={(e) => setModalItem({ ...modalItem, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={modalItem.role || ''}
                    onChange={(e) => setModalItem({ ...modalItem, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={modalItem.duration || ''}
                      onChange={(e) => setModalItem({ ...modalItem, duration: e.target.value })}
                      placeholder="2023 - Present"
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={modalItem.location || ''}
                      onChange={(e) => setModalItem({ ...modalItem, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={Array.isArray(modalItem.responsibilities) ? modalItem.responsibilities.join('\n') : ''}
                    onChange={(e) =>
                      setModalItem({
                        ...modalItem,
                        responsibilities: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(modalItem.techStack) ? modalItem.techStack.join(', ') : ''}
                    onChange={(e) =>
                      setModalItem({
                        ...modalItem,
                        techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Education Form */}
            {modalType === 'education' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={modalItem.degree || ''}
                    onChange={(e) => setModalItem({ ...modalItem, degree: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Institution</label>
                  <input
                    type="text"
                    value={modalItem.institution || ''}
                    onChange={(e) => setModalItem({ ...modalItem, institution: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Passing Year</label>
                    <input
                      type="text"
                      value={modalItem.passingYear || ''}
                      onChange={(e) => setModalItem({ ...modalItem, passingYear: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Results / Grade</label>
                    <input
                      type="text"
                      value={modalItem.results || ''}
                      onChange={(e) => setModalItem({ ...modalItem, results: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description / Coursework</label>
                  <textarea
                    rows={3}
                    value={modalItem.description || ''}
                    onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Skill Form */}
            {modalType === 'skill' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={modalItem.name || ''}
                    onChange={(e) => setModalItem({ ...modalItem, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={modalItem.category || ''}
                    onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                    placeholder="SQA & Automation / Frontend / Backend / OS & Tools"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Proficiency</span>
                    <span className="text-cyan-400">{modalItem.proficiency || 80}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={modalItem.proficiency || 80}
                    onChange={(e) => setModalItem({ ...modalItem, proficiency: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* Project Form */}
            {modalType === 'project' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={modalItem.title || ''}
                    onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={modalItem.category || 'Web Application'}
                    onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={modalItem.description || ''}
                    onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Long Architecture & Detail Description
                  </label>
                  <textarea
                    rows={3}
                    value={modalItem.longDescription || ''}
                    onChange={(e) => setModalItem({ ...modalItem, longDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <ImageUploader
                  label="Project Thumbnail Image"
                  value={modalItem.image || ''}
                  onChange={(val) => setModalItem({ ...modalItem, image: val })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={modalItem.liveUrl || ''}
                      onChange={(e) => setModalItem({ ...modalItem, liveUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={modalItem.githubUrl || ''}
                      onChange={(e) => setModalItem({ ...modalItem, githubUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(modalItem.techStack) ? modalItem.techStack.join(', ') : ''}
                    onChange={(e) =>
                      setModalItem({
                        ...modalItem,
                        techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Target Form */}
            {modalType === 'target' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Target Goal Title</label>
                  <input
                    type="text"
                    value={modalItem.title || ''}
                    onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={modalItem.category || ''}
                      onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Timeframe</label>
                    <input
                      type="text"
                      value={modalItem.timeframe || ''}
                      onChange={(e) => setModalItem({ ...modalItem, timeframe: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Status</label>
                  <input
                    type="text"
                    value={modalItem.status || 'In Progress'}
                    onChange={(e) => setModalItem({ ...modalItem, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={modalItem.description || ''}
                    onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Key Milestones (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(modalItem.keyMilestones) ? modalItem.keyMilestones.join('\n') : ''}
                    onChange={(e) =>
                      setModalItem({
                        ...modalItem,
                        keyMilestones: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Hobby Form */}
            {modalType === 'hobby' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={modalItem.title || ''}
                    onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={modalItem.category || ''}
                    onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={modalItem.description || ''}
                    onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Gallery Form */}
            {modalType === 'gallery' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Caption</label>
                  <input
                    type="text"
                    value={modalItem.caption || ''}
                    onChange={(e) => setModalItem({ ...modalItem, caption: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={modalItem.category || 'Tech & Life'}
                    onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
                <ImageUploader
                  label="Gallery Photo"
                  value={modalItem.imageUrl || ''}
                  onChange={(val) => setModalItem({ ...modalItem, imageUrl: val })}
                />
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={modalItem.description || ''}
                    onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setModalType(null);
                  setModalItem(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  const endpointMap: Record<string, string> = {
                    experience: 'experience',
                    education: 'education',
                    skill: 'skills',
                    project: 'projects',
                    target: 'targets',
                    hobby: 'hobbies',
                    gallery: 'gallery',
                  };
                  handleSaveModal(endpointMap[modalType] || modalType, modalItem);
                }}
                className="px-5 py-2 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
