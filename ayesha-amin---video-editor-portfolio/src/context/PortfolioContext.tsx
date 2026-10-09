'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, VideoItem, BlogPost } from '@/types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '@/data/initialData';

const STORAGE_KEY = 'ayesha_amin_portfolio_v1';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetToDefaults: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeVideo: VideoItem | null;
  openVideoLightbox: (video: VideoItem) => void;
  closeVideoLightbox: () => void;
  activePost: BlogPost | null;
  openPostModal: (post: BlogPost) => void;
  closePostModal: () => void;
  toasts: ToastState[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  exportBackup: () => void;
  importBackup: (jsonString: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Hydrate from localStorage once mounted on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData((prev) => ({
          ...prev,
          ...parsed,
          hero: { ...prev.hero, ...parsed.hero },
          about: { ...prev.about, ...parsed.about },
          contact: { ...prev.contact, ...parsed.contact },
          site: { ...prev.site, ...parsed.site },
        }));
      }
    } catch (e) {
      console.error('Error loading portfolio data from localStorage:', e);
    }
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
    addToast('Changes saved successfully!', 'success');
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    addToast('Portfolio reset to initial default state.', 'info');
  };

  const openVideoLightbox = (video: VideoItem) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoLightbox = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  const openPostModal = (post: BlogPost) => {
    setActivePost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePostModal = () => {
    setActivePost(null);
    document.body.style.overflow = '';
  };

  const exportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ayesha-amin-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Portfolio data backup downloaded.', 'success');
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.hero && parsed.about && parsed.videos) {
        setData(parsed);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } catch (e) {
          console.error('Error saving imported backup:', e);
        }
        addToast('Backup restored successfully!', 'success');
        return true;
      }
    } catch (e) {
      console.error('Failed to parse backup JSON:', e);
    }
    addToast('Invalid backup file format.', 'error');
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefaults,
        isAdminOpen,
        setIsAdminOpen,
        activeVideo,
        openVideoLightbox,
        closeVideoLightbox,
        activePost,
        openPostModal,
        closePostModal,
        toasts,
        addToast,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
