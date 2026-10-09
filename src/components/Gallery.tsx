'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, ZoomIn, X, Info } from 'lucide-react';

interface GalleryItem {
  _id?: string;
  imageUrl: string;
  caption: string;
  description?: string;
  category?: string;
  altText?: string;
}

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function Gallery({ gallery }: GalleryProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-24 relative bg-slate-100/60 dark:bg-black/60 border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Photo <span className="text-gradient-cyan">Gallery</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Glimpses into engineering workspaces, tech events, university sessions, and collaborative milestones.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => setActivePhoto(item)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden glass-card cursor-pointer glass-panel-hover"
            >
              <Image
                src={item.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
                alt={item.altText || item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag */}
              {item.category && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/75 text-cyan-400 border border-white/10 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Center Zoom Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center backdrop-blur-sm shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {item.caption}
                </h3>
                {item.description && (
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/75 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-[480px] w-full bg-black">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.altText || activePhoto.caption}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {activePhoto.category || 'Gallery'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activePhoto.caption}
                </h3>
                {activePhoto.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 flex items-start gap-1.5">
                    <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                    <span>{activePhoto.description}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
