'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Link as LinkIcon, X, CheckCircle, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [previewError, setPreviewError] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 2MB for base64 storage)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please choose a smaller image or use an image URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onChange(base64);
        setPreviewError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase text-slate-300">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-white/5">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 ${
              mode === 'url' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 ${
              mode === 'file' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            Upload File
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <div className="space-y-1.5">
          <input
            type="url"
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreviewError(false);
            }}
            placeholder="https://images.unsplash.com/... or https://..."
            className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm text-white placeholder-slate-500"
          />
        </div>
      ) : (
        <div className="border border-dashed border-slate-700 hover:border-indigo-500/60 rounded-xl p-4 text-center bg-slate-900/40 transition-colors">
          <input
            type="file"
            accept="image/*"
            id={`file-upload-${label.replace(/\s+/g, '-')}`}
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, '-')}`}
            className="cursor-pointer flex flex-col items-center justify-center gap-2"
          >
            <Upload className="w-6 h-6 text-indigo-400" />
            <span className="text-xs text-slate-300">
              Click to browse image (PNG, JPG, WebP up to 2MB)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Auto-encoded to optimized Base64
            </span>
          </label>
        </div>
      )}

      {/* Thumbnail Preview */}
      {value && !previewError ? (
        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-slate-950 group">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setPreviewError(true)}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : value && previewError ? (
        <p className="text-[11px] text-amber-400 flex items-center gap-1 font-mono">
          <ImageIcon className="w-3.5 h-3.5" />
          Image preview failed to load (check link validity).
        </p>
      ) : null}
    </div>
  );
}
