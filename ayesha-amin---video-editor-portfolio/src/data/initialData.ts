import { PortfolioData } from '@/types/portfolio';

// Public asset paths for Next.js
const heroImage = '/images/hero_video_editor_cinematic_1791189011868.jpg';
const aboutImage = '/images/about_editor_portrait_1791189023987.jpg';
const travelThumb = '/images/showreel_thumbnail_travel_1791189035691.jpg';
const commercialThumb = '/images/showreel_thumbnail_commercial_1791189045925.jpg';
const docThumb = '/images/showreel_thumbnail_documentary_1791189057203.jpg';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  site: {
    siteName: 'Ayesha Amin · Portfolio',
    logoText: 'AYESHA AMIN',
    headerHeight: 88,
    logoWidth: 160,
    social: [
      { label: 'YouTube', url: 'https://youtube.com/@ayeshaamin', platform: 'youtube' },
      { label: 'Instagram', url: 'https://instagram.com/ayesha.edits', platform: 'instagram' },
      { label: 'TikTok', url: 'https://tiktok.com/@ayesha.edits', platform: 'tiktok' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/ayesha-amin-editor', platform: 'linkedin' },
      { label: 'X (Twitter)', url: 'https://x.com/ayesha_edits', platform: 'twitter' },
    ],
  },
  contact: {
    email: 'ayesha.amin.edits@gmail.com',
    whatsappDisplay: '+92 370 1421101',
    whatsappIntl: '+923701421101',
    location: 'Lahore, Pakistan · Working Worldwide (UTC+5)',
    availability: 'Available for Select Projects & Monthly Retainers',
    formEndpoint: '',
  },
  hero: {
    eyebrow: 'Ayesha Amin · Video Editor & Motion Designer',
    heading: 'TURNING RAW FOOTAGE INTO HIGH-RETENTION VISUAL STORIES',
    subheading: 'Specialized in dynamic viral short-form reels, high-converting commercial cuts, talking-head YouTube pacing, and cinematic narratives engineered to capture and hold viewer attention.',
    primaryLabel: 'View Showreel',
    primaryTarget: '#work',
    secondaryLabel: 'Start a Project',
    secondaryTarget: '#contact',
    bgImage: heroImage,
    overlayOpacity: 65,
    showSocial: true,
  },
  about: {
    label: '01 — ABOUT ME',
    heading: "I CRAFT EDITS THAT DON'T JUST GET WATCHED — THEY GET REMEMBERED",
    body: [
      "I'm Ayesha Amin, a professional creative video editor with over 5 years of dedicated experience crafting high-retention video content for industry-leading creators, digital brands, and production agencies worldwide.",
      'In an era of 3-second attention spans and infinite feeds, traditional video editing is no longer enough. I engineer edits with intention: kinetic sound design, micro-zooms, visual rhythm matching the soundtrack, custom kinetic typography, and surgical Hollywood-grade color grading.',
      'From fast-paced 9:16 viral reels that generate millions of impressions to deep 30-minute documentary storytelling, my work blends psychological retention tactics with pristine aesthetic beauty.',
    ],
    closing: 'Pacing is emotion. Sound is memory. The cut is where the magic lives.',
    buttonLabel: 'Explore Capabilities',
    buttonTarget: '#services',
    image: aboutImage,
    imageAlt: 'Portrait of Ayesha Amin, professional creative video editor in studio',
    statsHighlight: {
      value: '150M+',
      label: 'Organic audience reach across edited client projects',
    },
    skills: [
      {
        category: 'NLE & Software Mastery',
        items: ['Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'Frame.io', 'Final Cut Pro'],
      },
      {
        category: 'Creative Disciplines',
        items: ['Retention-First Pacing', 'Kinetic Typography', 'Sound Design & Foley', 'Color Grading', '3D Camera Tracking'],
      },
      {
        category: 'Platforms & Formats',
        items: ['YouTube Long-Form (16:9)', 'Instagram Reels (9:16)', 'TikTok Organic', 'Paid Meta/TikTok Ads', '4K Cinema Exports'],
      },
    ],
  },
  showreelReels: [
    {
      id: 'reel-1',
      title: 'Neon Tokyo Travel Reel',
      platformLabel: 'Shorts · 4.2M Views',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      thumb: travelThumb,
      vertical: true,
    },
    {
      id: 'reel-2',
      title: 'Luxury Automotive Cyber Commercial',
      platformLabel: 'Reels · Spec Ad',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      thumb: commercialThumb,
      vertical: true,
    },
    {
      id: 'reel-3',
      title: 'Documentary Story Hook',
      platformLabel: 'TikTok · 1.8M Views',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      thumb: docThumb,
      vertical: true,
    },
    {
      id: 'reel-4',
      title: 'Tech Founder Talking Head',
      platformLabel: 'Shorts · 92% Retention',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      thumb: heroImage,
      vertical: true,
    },
    {
      id: 'reel-5',
      title: 'Sound Design & Foley Breakdown',
      platformLabel: 'Reels · Sound Reel',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      thumb: travelThumb,
      vertical: true,
    },
  ],
  videos: [
    {
      id: 'vid-1',
      title: 'Expedition Northern Peaks: 4K Cinematic Travel Documentary',
      platform: 'youtube',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: travelThumb,
      duration: '14:20',
      views: '2.4M Views',
      client: 'Wilderness Explorers Channel',
      description: 'Full-length travel documentary with custom DaVinci Resolve color grading, drone footage pacing, and immersive multi-channel sound design.',
      vertical: false,
      featured: true,
    },
    {
      id: 'vid-2',
      title: 'Apex Cyber Sport: Commercial Brand Spot',
      platform: 'commercial',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: commercialThumb,
      duration: '0:60',
      views: 'Brand Campaign',
      client: 'Apex Automotive Group',
      description: 'High-octane commercial spot with speed ramps, kinetic bass-boosted sound design, and custom 3D typography overlays.',
      vertical: false,
      featured: true,
    },
    {
      id: 'vid-3',
      title: 'Mastering the 3-Second Hook: Retention Breakdown',
      platform: 'youtube',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: docThumb,
      duration: '18:45',
      views: '980K Views',
      client: 'Creator Blueprint Podcast',
      description: 'Talking-head video editing with dynamic motion graphics, pattern interrupts every 4 seconds, and chaptered editorial breakdown.',
      vertical: false,
      featured: true,
    },
    {
      id: 'vid-4',
      title: 'Tokyo Rain & Neon: Anamorphic Color Grading Showcase',
      platform: 'commercial',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: heroImage,
      duration: '02:15',
      views: 'Color Reel',
      client: 'Cinematic Looks Studio',
      description: 'Color grading showreel demonstrating before-and-after log to 35mm film print emulation with custom grain and halation.',
      vertical: false,
      featured: false,
    },
    {
      id: 'vid-5',
      title: 'Why 99% of Startups Fail in Year One',
      platform: 'reels',
      url: 'https://instagram.com/reels/sample1',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: aboutImage,
      duration: '0:48',
      views: '3.8M Views',
      client: 'Venture Capital Daily',
      description: 'Fast-paced vertical reel engineered for 120% completion rate with kinetic typography, relevant b-roll cuts, and trending audio.',
      vertical: true,
      featured: true,
    },
    {
      id: 'vid-6',
      title: 'Foley & Sound Design Secrets of Blockbuster Cinema',
      platform: 'tiktok',
      url: 'https://tiktok.com/@ayesha.edits/video/1',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: travelThumb,
      duration: '0:55',
      views: '1.2M Views',
      client: 'Film Craft Academy',
      description: 'Multi-layer sound design tutorial showcasing how 8 separate audio stems turn dull footage into an intense cinematic scene.',
      vertical: true,
      featured: false,
    },
    {
      id: 'vid-7',
      title: 'Aura Chronograph: Luxury Horology Launch Film',
      platform: 'commercial',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: commercialThumb,
      duration: '01:30',
      views: 'Direct ROAS 3.6x',
      client: 'Aura Luxury Timepieces',
      description: 'Macro mechanical cinematography with pristine color balance, ticking audio rhythm, and elegant title card motion design.',
      vertical: false,
      featured: false,
    },
    {
      id: 'vid-8',
      title: 'From Zero to $100K/Mo Agency: Founder Story',
      platform: 'youtube',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: docThumb,
      duration: '22:10',
      views: '1.5M Views',
      client: 'Scale Agency Channel',
      description: 'Comprehensive long-form documentary edit with custom lower thirds, smooth map animations, and emotional music shifts.',
      vertical: false,
      featured: false,
    },
    {
      id: 'vid-9',
      title: 'How I Grade 10-Bit Log Footage in 5 Minutes',
      platform: 'reels',
      url: 'https://instagram.com/reels/sample2',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumb: heroImage,
      duration: '0:52',
      views: '2.1M Views',
      client: 'Creative Suite Weekly',
      description: 'Snappy split-screen tutorial breaking down CST nodes, primaries, and film curve adjustments with clean graphic callouts.',
      vertical: true,
      featured: false,
    },
  ],
  services: [
    {
      id: 'svc-1',
      num: '01',
      title: 'Short-Form Viral Edits',
      tagline: 'Engineered for maximum retention, completion rates & algorithmic reach on TikTok, Reels & Shorts.',
      description: 'Transform raw vertical clips and talking-head recordings into viral social assets. Every second is designed to stop the scroll, reset visual attention, and guide the viewer to your call-to-action.',
      included: [
        'Hook optimization in the first 2.5 seconds',
        'Custom kinetic typography & animated subtitles',
        'Multi-layer sound design, risers, hits & sound effects',
        'Fast-paced b-roll, motion graphics & visual punch-ins',
        'Seamless looping transitions for increased view velocity',
      ],
      samples: ['Neon Tokyo Travel Reel', 'Tech Founder Talking Head', 'Why 99% of Startups Fail in Year One'],
    },
    {
      id: 'svc-2',
      num: '02',
      title: 'YouTube Long-Form & Podcasts',
      tagline: 'Engaging, narrative-driven editing that keeps audiences watching through 20+ minute deep dives.',
      description: 'Turn rambling multi-camera footage and podcast recordings into tightly paced, episodic YouTube gold. I eliminate dead air, introduce dynamic camera shifts, structure story arcs, and design high-CTR thumbnails companion moments.',
      included: [
        'Multi-cam sync & seamless switching',
        'Dead-air removal & rhythm tuning',
        'Chapter cards, animated motion charts & map graphics',
        'Engaging b-roll curation & historical archival research',
        'Audio leveling, noise removal & speech enhancement',
      ],
      samples: ['Expedition Northern Peaks: 4K Travel Film', 'From Zero to $100K/Mo Agency: Founder Story'],
    },
    {
      id: 'svc-3',
      num: '03',
      title: 'Commercial Ads & Brand Promos',
      tagline: 'High-converting video commercials crafted to drive direct-response sales and elevate brand prestige.',
      description: 'From luxury product launches to performance marketing ad creatives. Each edit combines premium visual aesthetics with direct-response fundamentals to generate measurable return on ad spend (ROAS).',
      included: [
        'Multiple hook variations for A/B testing (3x hooks per ad)',
        'Speed ramps, sleek motion blur & product highlight zooms',
        '3D tracking & sleek digital UI mockups',
        'Platform-native sizing (16:9, 1:1, 9:16) with safe-zone compliance',
        'Commercial music licensing coordination & mixdown',
      ],
      samples: ['Apex Cyber Sport: Commercial Brand Spot', 'Aura Chronograph: Luxury Launch Film'],
    },
    {
      id: 'svc-4',
      num: '04',
      title: 'Color Grading & Look Development',
      tagline: 'Cinema-grade color transformation in DaVinci Resolve that creates an unmistakable visual identity.',
      description: 'Give your project that coveted Hollywood celluloid look. Working in a calibrated color space, I perform precision exposure balancing, skin tone isolation, color separation, and authentic analog film stock print emulation.',
      included: [
        'Color space transforms (Sony S-Log3, Canon C-Log, ARRI LogC, Apple ProRes Log)',
        'Skin tone correction & natural texture preservation',
        'Film grain, halation, and bloom emulation (Kodak Vision3, 2383 D65 print)',
        'Shot-to-shot matching across mixed camera setups',
        'Delivery in Rec.709, HDR10, and high-bitrate archival formats',
      ],
      samples: ['Tokyo Rain & Neon: Anamorphic Color Grading Showcase'],
    },
    {
      id: 'svc-5',
      num: '05',
      title: 'Audio Mastering & Sound Design',
      tagline: 'Immersive auditory depth that makes your video feel three-dimensional and emotionally gripping.',
      description: 'Audio is 50% of the cinematic experience. I construct layered foley, environmental ambient beds, impact risers, and vocal clarity that pulls viewers directly into your world.',
      included: [
        'Surgical dialogue noise reduction & spectral de-reverberation',
        'Custom foley (footsteps, paper rustle, mechanical clicks, whooshes)',
        'Bass drops, tension risers, and beat-matched percussion hits',
        'Dynamic music ducking around dialogue',
        'Standardized broadcast loudness mastering (-14 LUFS for YouTube/Spotify)',
      ],
      samples: ['Foley & Sound Design Secrets of Blockbuster Cinema'],
    },
  ],
  why: [
    {
      id: 'why-1',
      num: '01',
      icon: 'timer',
      title: '24–48h First Cuts',
      description: 'Speed wins in the creator economy. Receive polished first cuts in 24–48 hours, with rapid revision rounds hosted on Frame.io for timestamped feedback.',
    },
    {
      id: 'why-2',
      num: '02',
      icon: 'zap',
      title: 'Retention-First Architecture',
      description: "I don't just cut randomly to music. Every cut, zoom, text pop, and sound effect is engineered to reset the viewer's psychological attention span before boredom strikes.",
    },
    {
      id: 'why-3',
      num: '03',
      icon: 'aperture',
      title: 'Hollywood-Grade Grading',
      description: 'No flat, muddy exports. Every project undergoes full node-based color grading in DaVinci Resolve Studio with calibrated monitoring for rich contrast and vibrant skin tones.',
    },
    {
      id: 'why-4',
      num: '04',
      icon: 'users',
      title: 'Dependable Creative Partner',
      description: 'Proactive communication, reliable delivery timelines, and zero ghosting. I treat your brand like my own, learning your voice and creative goals inside out.',
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      quote: "Ayesha transformed our YouTube channel's average view duration from 3:12 to over 8:40. Her pacing and sound design instincts are unmatched. Our subscriber count doubled in 4 months.",
      name: 'Marcus Vance',
      role: 'Host & Creator',
      company: 'Vance Tech Media (1.4M Subs)',
      metric: '+175% View Duration',
    },
    {
      id: 'test-2',
      quote: 'We spent $80k on paid ads last quarter, and Ayesha’s short-form cuts generated our highest ROAS of the entire year (3.8x). She understands consumer attention better than our internal marketing team.',
      name: 'Elena Rostova',
      role: 'Chief Marketing Officer',
      company: 'Aura Lifestyle Brands',
      metric: '3.8x Ad ROAS',
    },
    {
      id: 'test-3',
      quote: "Finding an editor who understands cinematic documentary pacing AND high-energy social hooks is nearly impossible. Ayesha bridges both worlds effortlessly. She's on a permanent monthly retainer with us.",
      name: 'Julian Sterling',
      role: 'Documentary Director & Producer',
      company: 'Nomad Films Ltd.',
      metric: 'Permanent Retainer',
    },
    {
      id: 'test-4',
      quote: "The turnaround time is absurdly fast without any drop in detail. Her audio mixing alone takes our videos to a level that sounds like a Netflix release. Can't recommend her enough!",
      name: 'Zackariah Chen',
      role: 'Founder & CEO',
      company: 'HyperGrowth Media Group',
      metric: '48h Turnaround',
    },
  ],
  stats: [
    { id: 'stat-1', value: 150, suffix: 'M+', label: 'Organic Views Generated' },
    { id: 'stat-2', value: 500, suffix: '+', label: 'Videos Edited & Delivered' },
    { id: 'stat-3', value: 98, suffix: '%', label: 'Client Retention & Satisfaction' },
    { id: 'stat-4', value: 48, suffix: 'h', label: 'Average First Cut Delivery' },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is your typical turnaround time for a project?',
      answer: 'For short-form reels and TikToks, first drafts are delivered within 24 to 48 hours. For long-form YouTube videos (10–25 minutes), typical turnaround is 3 to 5 business days depending on complexity. Rush delivery options are available for time-sensitive launches.',
      category: 'Process',
    },
    {
      id: 'faq-2',
      question: 'How do we send raw footage and collaborate?',
      answer: 'We use Google Drive, Dropbox, or Frame.io for full-resolution raw footage transfers. For feedback, I provide Frame.io links where you can click directly on the video frame and leave timestamped visual notes, making revisions lightning fast and frictionless.',
      category: 'Workflow',
    },
    {
      id: 'faq-3',
      question: 'How many rounds of revisions are included?',
      answer: 'Every project includes up to 2 comprehensive rounds of revisions to ensure you are 100% thrilled with the outcome. Because we align on reference videos, pacing, and style before editing begins, 90% of our projects are approved on the first or second cut.',
      category: 'Pricing & Terms',
    },
    {
      id: 'faq-4',
      question: 'Do you provide music and sound effects licensing?',
      answer: 'Yes! All music and sound effects used in your edits are licensed for commercial use across YouTube, Instagram, TikTok, and paid advertising platforms through our subscriptions with Artlist, Musicbed, and Epidemic Sound.',
      category: 'Licensing',
    },
    {
      id: 'faq-5',
      question: 'Do you offer monthly retainer packages for consistent creators?',
      answer: 'Yes, monthly retainers are actually my preferred working model! Retainers guarantee reserved editing bandwidth, priority turnaround, customized project templates, and discounted batch rates. Inquire via the contact form to discuss custom package tiers.',
      category: 'Pricing & Terms',
    },
    {
      id: 'faq-6',
      question: 'What video editing and color grading software do you use?',
      answer: 'My primary editing NLE is Adobe Premiere Pro, paired with DaVinci Resolve Studio for high-end color grading and look development. For motion graphics and VFX, I utilize Adobe After Effects with professional plugins like Mocha Pro and Boris FX.',
      category: 'Technical',
    },
  ],
  blog: [
    {
      id: 'post-1',
      title: 'The 3-Second Hook Architecture: How to Engineer 80%+ Retention on Reels',
      slug: '3-second-hook-architecture',
      date: '2026-09-18',
      category: 'Retention Tactics',
      readTime: '6 min read',
      excerpt: 'Most video editors lose 60% of their audience before the first sentence finishes. Here is the exact psychological framework we use to stop the thumb and lock viewer focus.',
      coverImage: travelThumb,
      tags: ['Short-Form', 'TikTok', 'Retention', 'Viral Pacing'],
      content: `
# The 3-Second Hook Architecture

In the modern algorithm, you don't have a 10-second intro. You don't even have 5 seconds. You have **800 milliseconds** to prevent the upward swipe, and **2.2 seconds** to justify why the viewer should invest the next 50 seconds of their life into your clip.

### 1. The Three Layers of a Weaponized Hook

To stop a thumb, you must trigger three independent sensory responses simultaneously:

1. **The Visual Pattern Interrupt**: Don't start on an ordinary static webcam shot. Start on mid-motion, an unexpected prop, high-contrast lighting, or an extreme macro zoom.
2. **The Audio Shockwave**: The silence right before a crisp foley hit or sound effect acts like a starter pistol for human attention.
3. **The Unresolved Cognitive Loop**: State the climax or question, but withhold the answer. "This single editing mistake cost a creator $40,000..." immediately opens an open loop in the viewer's brain.

### 2. The 4-Second Micro-Reset

Once the hook lands, human attention decays exponentially. To maintain retention past the 15-second mark, we implement **micro-resets** every 3 to 4 seconds:
- A subtle camera punch-in (100% to 112% scale)
- A directional whoosh with matching screen pan
- A kinetic subtitle color shift highlighting operative verbs

When executed with surgical restraint, the viewer doesn't perceive the cuts—they simply feel compelled to keep watching.
      `,
    },
    {
      id: 'post-2',
      title: "Why Sound Design Accounts for 70% of an Edit's Cinematic Emotion",
      slug: 'sound-design-secrets-video-editing',
      date: '2026-08-24',
      category: 'Sound Design',
      readTime: '8 min read',
      excerpt: "George Lucas famously said 'Sound is 50% of the movie going experience.' For modern digital video, it's closer to 70%. Here is how to build immersive 8-layer soundscapes.",
      coverImage: commercialThumb,
      tags: ['Audio Mastering', 'Foley', 'Premiere Pro', 'Fairlight'],
      content: `
# Why Sound Design Accounts for 70% of an Edit's Cinematic Emotion

You can watch a video with 720p footage and pristine audio, and your brain accepts it as professional. But watch 8K footage with tinny, echoing phone audio, and you will click away within three seconds.

### The 8-Layer Audio Architecture

In every high-end commercial or documentary we edit, we construct audio on an 8-stem template:

1. **Dialogue Core**: Cleaned through spectral de-noise, high-passed at 80Hz, subtly compressed with a 3:1 ratio, and centered.
2. **Room Tone & Ambience**: The quiet background acoustic presence of the physical space (forest breeze, HVAC hum, city rumble).
3. **Foley Realism**: Micro-sounds that match on-screen physics—paper rustling, jacket friction, keyboard clacks.
4. **Sub-Bass Drops (20–60Hz)**: Felt rather than heard, adding weight to dramatic reveals.
5. **Risers & White Noise Sweeps**: Building subconscious anticipation into upcoming visual transitions.
6. **Percussive Impact Hits**: Reinforcing bold text titles and section markers.
7. **Melodic Score**: The emotional backbone, carefully ducked -18dB under spoken words.
8. **Reverb Tails**: Spatial depth that places the viewer inside the frame.
      `,
    },
    {
      id: 'post-3',
      title: 'The DaVinci Resolve Color Grading Pipeline for Commercial Cinema',
      slug: 'davinci-resolve-color-grading-pipeline',
      date: '2026-07-30',
      category: 'Color Grading',
      readTime: '7 min read',
      excerpt: 'Moving past simple slap-on LUTs: A breakdown of our node tree workflow in DaVinci Resolve Studio for film print emulation and skin tone protection.',
      coverImage: heroImage,
      tags: ['DaVinci Resolve', 'Color Grading', 'LUTs', 'Cinema'],
      content: `
# The DaVinci Resolve Color Grading Pipeline for Commercial Cinema

Slapping a generic internet LUT onto your raw footage is the quickest way to ruin dynamic range, crush shadow detail, and make skin tones look like orange plastic. Professional colorists build modular node trees that treat luminance, chrominance, and print emulation in separate calibrated stages.

### The 6-Node Master Tree

Our standardized node tree workflow operates in DaVinci YRGB Color Managed space:

- **Node 1: Color Space Transform (CST In)**: Maps camera raw log (e.g. S-Log3/S-Gamut3.Cine) cleanly into DaVinci Wide Gamut / Intermediate.
- **Node 2: Exposure & Primaries**: Setting pivot, contrast, and balance using wheels rather than curves for smooth roll-off.
- **Node 3: Skin Tone Qualifier**: Isolate skin vector tones on the vectorscope indicator line to ensure natural health and glow.
- **Node 4: Creative Look & Split Toning**: Introducing subtle complementary hues—warm amber midtones and cool cyan shadows.
- **Node 5: Film Print Emulation (FPE)**: Applying Kodak 2383 D65 print curves for classic cinema contrast roll-off.
- **Node 6: Film Grain & Halation**: Adding authentic 35mm optical grain focused in midtones, with reddish glow around high-contrast edges.
      `,
    },
  ],
};
