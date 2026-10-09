'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  RotateCcw,
  Save,
  Film,
  User,
  Sliders,
  Sparkles,
  HelpCircle,
  MessageSquareQuote,
  Settings,
  Globe,
} from 'lucide-react';
import { VideoItem, VideoPlatform } from '@/types/portfolio';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    updateData,
    resetToDefaults,
    setIsAdminOpen,
    exportBackup,
    importBackup,
    addToast,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'hero' | 'about' | 'videos' | 'services' | 'why' | 'testimonials' | 'faq' | 'settings' | 'backup'
  >('overview');

  const [localData, setLocalData] = useState(data);

  React.useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSaveAll = () => {
    updateData(localData);
  };

  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importBackup(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddVideo = () => {
    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title: 'New Project Cut',
      platform: 'youtube',
      url: 'https://youtube.com/watch?v=sample',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: '',
      duration: '01:00',
      views: '100K Views',
      client: 'Brand Partner',
      description: 'Engaging video edit showcasing dynamic sound design and color grading.',
      vertical: false,
      featured: false,
    };
    setLocalData({
      ...localData,
      videos: [newVideo, ...localData.videos],
    });
    addToast('New video slot added to list. Enter details and save.', 'info');
  };

  const handleDeleteVideo = (id: string) => {
    setLocalData({
      ...localData,
      videos: localData.videos.filter((v) => v.id !== id),
    });
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    const newVideos = [...localData.videos];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newVideos.length) return;
    const temp = newVideos[index];
    newVideos[index] = newVideos[targetIndex];
    newVideos[targetIndex] = temp;
    setLocalData({ ...localData, videos: newVideos });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden text-white font-sans animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-[#262626] bg-[#0a0a0a] px-6 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <span className="w-3 h-3 bg-[#e22718]" />
          <h1 className="font-display font-extrabold text-2xl uppercase tracking-wider text-white">
            Ayesha Amin <span className="text-[#e22718]">· Content Management Dashboard</span>
          </h1>
          <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#141414] border border-[#3c3c3c] text-[#3ec46d]">
            Live CMS Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 h-9 px-5 bg-[#c8200f] hover:bg-[#e22718] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Publish</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#3c3c3c] hover:border-white text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#3ec46d]" />
            <span>View Live Site</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav Tabs */}
        <aside className="w-64 border-r border-[#262626] bg-[#080808] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <nav className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#7e7e7e] px-3 py-2 block">
              Sections & Content
            </span>

            {[
              { id: 'overview', label: 'Overview & Stats', icon: Sliders },
              { id: 'hero', label: 'Hero Section', icon: Sparkles },
              { id: 'about', label: 'About & Philosophy', icon: User },
              { id: 'videos', label: 'Videos & Showreel', icon: Film },
              { id: 'services', label: 'Services & Scope', icon: Sliders },
              { id: 'why', label: 'Why Work With Me', icon: Sparkles },
              { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquareQuote },
              { id: 'faq', label: 'FAQ Accordion', icon: HelpCircle },
              { id: 'settings', label: 'Site & Contact Info', icon: Settings },
              { id: 'backup', label: 'Backup & Restore', icon: RotateCcw },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors text-left cursor-pointer border-l-2 ${
                    isActive
                      ? 'bg-[#141414] text-white border-[#e22718]'
                      : 'text-[#9a9a9a] hover:text-white border-transparent hover:bg-[#111111]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#e22718]' : 'text-[#7e7e7e]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#262626] text-[11px] text-[#7e7e7e] space-y-2">
            <p>Content edits persist in this browser via localStorage.</p>
            <p className="text-[#f4b400]">Use "Download Backup" to export JSON files anytime.</p>
          </div>
        </aside>

        {/* Workspace Panel */}
        <main className="flex-1 bg-[#050505] p-6 sm:p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">CMS Dashboard Overview</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">
                    Manage portfolio copy, video catalog, capabilities, client testimonials, and contact settings.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-5 bg-[#0a0a0a] border border-[#262626]">
                    <span className="text-xs text-[#7e7e7e] uppercase block font-mono">Total Videos</span>
                    <span className="font-display font-extrabold text-4xl text-white mt-1 block">
                      {localData.videos.length}
                    </span>
                  </div>
                  <div className="p-5 bg-[#0a0a0a] border border-[#262626]">
                    <span className="text-xs text-[#7e7e7e] uppercase block font-mono">Services</span>
                    <span className="font-display font-extrabold text-4xl text-[#e22718] mt-1 block">
                      {localData.services.length}
                    </span>
                  </div>
                  <div className="p-5 bg-[#0a0a0a] border border-[#262626]">
                    <span className="text-xs text-[#7e7e7e] uppercase block font-mono">Testimonials</span>
                    <span className="font-display font-extrabold text-4xl text-white mt-1 block">
                      {localData.testimonials.length}
                    </span>
                  </div>
                  <div className="p-5 bg-[#0a0a0a] border border-[#262626]">
                    <span className="text-xs text-[#7e7e7e] uppercase block font-mono">FAQs</span>
                    <span className="font-display font-extrabold text-4xl text-[#3ec46d] mt-1 block">
                      {localData.faqs.length}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-[#0a0a0a] border border-[#262626] space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Quick Section Shortcuts
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('videos')}
                      className="px-4 py-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#3c3c3c] text-xs uppercase font-bold text-white transition-colors"
                    >
                      + Add New Video to Work Grid
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('hero')}
                      className="px-4 py-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#3c3c3c] text-xs uppercase font-bold text-white transition-colors"
                    >
                      Edit Hero Headline & Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      className="px-4 py-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#3c3c3c] text-xs uppercase font-bold text-white transition-colors"
                    >
                      Update Email & WhatsApp Number
                    </button>
                    <button
                      type="button"
                      onClick={exportBackup}
                      className="px-4 py-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#3c3c3c] text-xs uppercase font-bold text-[#f4b400] transition-colors"
                    >
                      Export Full Backup JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">Hero Section Setup</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">Configure your primary above-the-fold impression.</p>
                </div>

                <div className="space-y-4 bg-[#0a0a0a] p-6 border border-[#262626]">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Eyebrow Label</label>
                    <input
                      type="text"
                      value={localData.hero.eyebrow}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          hero: { ...localData.hero, eyebrow: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Main Headline (Uppercase)</label>
                    <textarea
                      rows={2}
                      value={localData.hero.heading}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          hero: { ...localData.hero, heading: e.target.value },
                        })
                      }
                      className="w-full p-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm font-display text-xl uppercase focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Subheading Narrative</label>
                    <textarea
                      rows={3}
                      value={localData.hero.subheading}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          hero: { ...localData.hero, subheading: e.target.value },
                        })
                      }
                      className="w-full p-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#bbbbbb]">Primary Button Text</label>
                      <input
                        type="text"
                        value={localData.hero.primaryLabel}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            hero: { ...localData.hero, primaryLabel: e.target.value },
                          })
                        }
                        className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#bbbbbb]">Secondary Button Text</label>
                      <input
                        type="text"
                        value={localData.hero.secondaryLabel}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            hero: { ...localData.hero, secondaryLabel: e.target.value },
                          })
                        }
                        className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ABOUT SECTION */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">About Section Copy</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">Story, philosophy, and professional highlights.</p>
                </div>

                <div className="space-y-4 bg-[#0a0a0a] p-6 border border-[#262626]">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Section Headline</label>
                    <input
                      type="text"
                      value={localData.about.heading}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          about: { ...localData.about, heading: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Body Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={localData.about.body[0] || ''}
                      onChange={(e) => {
                        const newBody = [...localData.about.body];
                        newBody[0] = e.target.value;
                        setLocalData({
                          ...localData,
                          about: { ...localData.about, body: newBody },
                        })
                      }}
                      className="w-full p-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Body Paragraph 2 (Tactics)</label>
                    <textarea
                      rows={3}
                      value={localData.about.body[1] || ''}
                      onChange={(e) => {
                        const newBody = [...localData.about.body];
                        newBody[1] = e.target.value;
                        setLocalData({
                          ...localData,
                          about: { ...localData.about, body: newBody },
                        })
                      }}
                      className="w-full p-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Closing Quote</label>
                    <input
                      type="text"
                      value={localData.about.closing}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          about: { ...localData.about, closing: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: VIDEOS MANAGEMENT */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#262626] pb-4">
                  <div>
                    <h2 className="font-display font-bold text-3xl uppercase">Manage Video Portfolio</h2>
                    <p className="text-xs text-[#9a9a9a] mt-1">
                      {localData.videos.length} videos in catalog. Drag or reorder rows; top videos appear first.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="inline-flex items-center gap-2 h-10 px-5 bg-[#c8200f] hover:bg-[#e22718] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Video</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {localData.videos.map((video, idx) => (
                    <div
                      key={video.id}
                      className="p-5 bg-[#0a0a0a] border border-[#262626] space-y-4 hover:border-[#3c3c3c] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-[#e22718] font-bold">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleMoveVideo(idx, 'up')}
                            disabled={idx === 0}
                            className="w-8 h-8 flex items-center justify-center border border-[#3c3c3c] text-white disabled:opacity-30 hover:border-white"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveVideo(idx, 'down')}
                            disabled={idx === localData.videos.length - 1}
                            className="w-8 h-8 flex items-center justify-center border border-[#3c3c3c] text-white disabled:opacity-30 hover:border-white"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="w-8 h-8 flex items-center justify-center border border-[#c8200f] text-[#ff6a55] hover:bg-[#c8200f] hover:text-white"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#7e7e7e]">Project Title</label>
                          <input
                            type="text"
                            value={video.title}
                            onChange={(e) => {
                              const newVideos = [...localData.videos];
                              newVideos[idx].title = e.target.value;
                              setLocalData({ ...localData, videos: newVideos });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#7e7e7e]">Platform</label>
                          <select
                            value={video.platform}
                            onChange={(e) => {
                              const newVideos = [...localData.videos];
                              newVideos[idx].platform = e.target.value as VideoPlatform;
                              setLocalData({ ...localData, videos: newVideos });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          >
                            <option value="youtube">YouTube Long-Form (16:9)</option>
                            <option value="reels">Instagram Reels (9:16)</option>
                            <option value="tiktok">TikTok (9:16)</option>
                            <option value="commercial">Commercial / Ad Spot</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#7e7e7e]">Client Name</label>
                          <input
                            type="text"
                            value={video.client || ''}
                            onChange={(e) => {
                              const newVideos = [...localData.videos];
                              newVideos[idx].client = e.target.value;
                              setLocalData({ ...localData, videos: newVideos });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#7e7e7e]">Views / Metric</label>
                          <input
                            type="text"
                            value={video.views || ''}
                            onChange={(e) => {
                              const newVideos = [...localData.videos];
                              newVideos[idx].views = e.target.value;
                              setLocalData({ ...localData, videos: newVideos });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#7e7e7e]">Duration</label>
                          <input
                            type="text"
                            value={video.duration || ''}
                            onChange={(e) => {
                              const newVideos = [...localData.videos];
                              newVideos[idx].duration = e.target.value;
                              setLocalData({ ...localData, videos: newVideos });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">Services & Capabilities</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">Configure service accordion packages and scope.</p>
                </div>

                <div className="space-y-6">
                  {localData.services.map((svc, idx) => (
                    <div key={svc.id} className="p-6 bg-[#0a0a0a] border border-[#262626] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#e22718] font-bold">Service {svc.num}</span>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-[#7e7e7e]">Service Title</label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const newServices = [...localData.services];
                            newServices[idx].title = e.target.value;
                            setLocalData({ ...localData, services: newServices });
                          }}
                          className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-[#7e7e7e]">Tagline</label>
                        <input
                          type="text"
                          value={svc.tagline}
                          onChange={(e) => {
                            const newServices = [...localData.services];
                            newServices[idx].tagline = e.target.value;
                            setLocalData({ ...localData, services: newServices });
                          }}
                          className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-[#7e7e7e]">Full Description</label>
                        <textarea
                          rows={3}
                          value={svc.description}
                          onChange={(e) => {
                            const newServices = [...localData.services];
                            newServices[idx].description = e.target.value;
                            setLocalData({ ...localData, services: newServices });
                          }}
                          className="w-full p-3 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">Client Testimonials</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">Manage client reviews, channels, and metric badges.</p>
                </div>

                <div className="space-y-6">
                  {localData.testimonials.map((test, idx) => (
                    <div key={test.id} className="p-6 bg-[#0a0a0a] border border-[#262626] space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-[#7e7e7e]">Quote</label>
                        <textarea
                          rows={3}
                          value={test.quote}
                          onChange={(e) => {
                            const newTestimonials = [...localData.testimonials];
                            newTestimonials[idx].quote = e.target.value;
                            setLocalData({ ...localData, testimonials: newTestimonials });
                          }}
                          className="w-full p-3 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-[#7e7e7e]">Client Name</label>
                          <input
                            type="text"
                            value={test.name}
                            onChange={(e) => {
                              const newTestimonials = [...localData.testimonials];
                              newTestimonials[idx].name = e.target.value;
                              setLocalData({ ...localData, testimonials: newTestimonials });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-[#7e7e7e]">Role & Channel</label>
                          <input
                            type="text"
                            value={test.role}
                            onChange={(e) => {
                              const newTestimonials = [...localData.testimonials];
                              newTestimonials[idx].role = e.target.value;
                              setLocalData({ ...localData, testimonials: newTestimonials });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-[#7e7e7e]">Metric Badge</label>
                          <input
                            type="text"
                            value={test.metric || ''}
                            onChange={(e) => {
                              const newTestimonials = [...localData.testimonials];
                              newTestimonials[idx].metric = e.target.value;
                              setLocalData({ ...localData, testimonials: newTestimonials });
                            }}
                            className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SETTINGS & CONTACT */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">Site & Contact Settings</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">Configure direct contact handles, email, and WhatsApp.</p>
                </div>

                <div className="space-y-4 bg-[#0a0a0a] p-6 border border-[#262626]">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Contact Email</label>
                    <input
                      type="email"
                      value={localData.contact.email}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          contact: { ...localData.contact, email: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#bbbbbb]">WhatsApp Display</label>
                      <input
                        type="text"
                        value={localData.contact.whatsappDisplay}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            contact: { ...localData.contact, whatsappDisplay: e.target.value },
                          })
                        }
                        className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#bbbbbb]">WhatsApp International (For Chat Link)</label>
                      <input
                        type="text"
                        value={localData.contact.whatsappIntl}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            contact: { ...localData.contact, whatsappIntl: e.target.value },
                          })
                        }
                        className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#bbbbbb]">Location & Working Hours</label>
                    <input
                      type="text"
                      value={localData.contact.location}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          contact: { ...localData.contact, location: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 bg-[#141414] border border-[#3c3c3c] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BACKUP & RESTORE */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <h2 className="font-display font-bold text-3xl uppercase">Backup & Reset Controls</h2>
                  <p className="text-xs text-[#9a9a9a] mt-1">
                    Export your custom edits as a single JSON file, restore a prior backup, or reset to original.
                  </p>
                </div>

                <div className="p-6 bg-[#0a0a0a] border border-[#262626] space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Export / Import Backup
                  </h3>
                  <p className="text-xs text-[#9a9a9a] leading-relaxed">
                    Download everything (hero text, video catalog, custom services, reviews, and contact settings) in one clean JSON file.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={exportBackup}
                      className="inline-flex items-center gap-2 h-11 px-6 bg-[#1a1a1a] hover:bg-[#262626] border border-[#3c3c3c] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#e22718]" />
                      <span>Download Backup JSON</span>
                    </button>

                    <label className="inline-flex items-center gap-2 h-11 px-6 bg-[#1a1a1a] hover:bg-[#262626] border border-[#3c3c3c] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer">
                      <Upload className="w-4 h-4 text-[#3ec46d]" />
                      <span>Restore from File</span>
                      <input
                        type="file"
                        accept="application/json,.json"
                        onChange={handleFileRestore}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="p-6 bg-[#0a0a0a] border border-[#c8200f]/40 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff6a55]">
                    Reset to Factory Defaults
                  </h3>
                  <p className="text-xs text-[#9a9a9a] leading-relaxed">
                    Reverts all videos, text copy, and services back to the pristine design reference template.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all portfolio data back to original defaults?')) {
                        resetToDefaults();
                      }
                    }}
                    className="inline-flex items-center gap-2 h-10 px-5 border border-[#c8200f] text-[#ff6a55] hover:bg-[#c8200f] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
