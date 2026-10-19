/* Ayesha Amin CMS core — browser-only storage (IndexedDB), demo auth, sanitizer, SEO, sitemap. */
(function () {
  if (window.AyeshaCMS) return;
  const SALT = 'ayesha-cms-v1:';
  const DEFAULT_HASH = 'e3a768eac6d1197dd649fea8aeadc2618fbe8693b1c7b94c1ac0872db1e011e4';
  const RECOVERY_HASH = '8c152c58227f12b15f8121e4f4a7f88bf8378b3f19c7ea4c14e635fe5d039649';
  const SESSION_KEY = 'ayesha-cms-session';
  const SESSION_HOURS = 8;
  const MAX_REVISIONS = 30;
  const clone = o => JSON.parse(JSON.stringify(o));
  const uid = p => (p || 'id') + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  const now = () => new Date().toISOString();

  // ---------- IndexedDB ----------
  let dbp;
  function db() {
    if (!dbp) dbp = new Promise((res, rej) => {
      const r = indexedDB.open('ayesha-cms', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function idbGet(k) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('kv').objectStore('kv').get(k); t.onsuccess = () => res(t.result); t.onerror = () => rej(t.error); }); }
  async function idbSet(k, v) { const d = await db(); return new Promise((res, rej) => { const tx = d.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }

  // ---------- Video URLs ----------
  function parseVideo(url) {
    if (!url) return null;
    const u = String(url).trim();
    let m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
      const vertical = /\/shorts\//.test(u);
      return { platform: 'youtube', id: m[1], vertical, href: vertical ? `https://www.youtube.com/shorts/${m[1]}` : `https://www.youtube.com/watch?v=${m[1]}`, embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`, thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` };
    }
    if ((m = u.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)/))) {
      return { platform: 'reels', id: m[1], vertical: true, href: `https://www.instagram.com/reel/${m[1]}/`, embed: `https://www.instagram.com/reel/${m[1]}/embed/`, thumb: '' };
    }
    if ((m = u.match(/tiktok\.com\/.*?\/video\/(\d+)/)) || (m = u.match(/tiktok\.com\/embed\/(?:v2\/)?(\d+)/))) {
      return { platform: 'tiktok', id: m[1], vertical: true, href: u.split('?')[0], embed: `https://www.tiktok.com/embed/v2/${m[1]}`, thumb: '' };
    }
    if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{10,})/))) {
      return { platform: 'drive', id: m[1], vertical: false, href: `https://drive.google.com/file/d/${m[1]}/view`, embed: `https://drive.google.com/file/d/${m[1]}/preview`, thumb: `https://drive.google.com/thumbnail?id=${m[1]}&sz=w800` };
    }
    return null;
  }
  function videoError(url) {
    if (/vm\.tiktok\.com|vt\.tiktok\.com/.test(url)) return 'Short TikTok links can’t be read. Open it and paste the full tiktok.com/@user/video/… link.';
    return 'Not a recognised YouTube, Instagram Reel, TikTok or Google Drive link.';
  }
  const PLATFORM_LABEL = { youtube: 'YouTube', reels: 'Reels', tiktok: 'TikTok', drive: 'Drive' };

  // ---------- Sanitizer ----------
  const ALLOWED = { P: [], H2: [], H3: [], H4: [], STRONG: [], B: [], EM: [], I: [], U: [], S: [], A: ['href', 'target', 'rel', 'title'], UL: [], OL: [], LI: [], BLOCKQUOTE: [], HR: [], BR: [], TABLE: [], THEAD: [], TBODY: [], TR: [], TH: ['colspan', 'rowspan'], TD: ['colspan', 'rowspan'], FIGURE: ['data-align', 'data-ph', 'style'], FIGCAPTION: [], IMG: ['src', 'alt', 'title', 'width', 'height', 'data-media', 'style'], SPAN: [], CODE: [] };
  const RENAME = { DIV: 'P', H1: 'H2', H5: 'H4', H6: 'H4' };
  function safeUrl(v, img) {
    v = String(v || '').trim();
    if (img) return /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(v) || /^https:\/\//i.test(v) || /^assets\//.test(v) ? v : '';
    return /^(https?:|mailto:|tel:|#|\/)/i.test(v) ? v : '';
  }
  function cleanStyle(tag, s) {
    const out = [];
    const w = /(?:^|;)\s*width\s*:\s*(\d{1,4}(?:\.\d+)?)(px|%)/i.exec(s || '');
    const h = /(?:^|;)\s*height\s*:\s*(\d{1,4})px/i.exec(s || '');
    if (tag === 'FIGURE' && w) out.push(`width:${Math.min(+w[1], w[2] === '%' ? 100 : 2400)}${w[2]}`);
    if (tag === 'IMG' && h) out.push(`height:${h[1]}px`);
    return out.join(';');
  }
  function sanitize(html) {
    const doc = new DOMParser().parseFromString('<body>' + (html || '') + '</body>', 'text/html');
    const walk = (node, parent) => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 3) { parent.appendChild(document.createTextNode(ch.nodeValue)); return; }
        if (ch.nodeType !== 1) return;
        let tag = ch.tagName;
        if (/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|FORM|INPUT|BUTTON|TEXTAREA|SELECT|LINK|META|SVG|MATH|NOSCRIPT|TEMPLATE)$/.test(tag)) return;
        tag = RENAME[tag] || tag;
        if (!ALLOWED[tag]) { walk(ch, parent); return; }
        const el = document.createElement(tag);
        ALLOWED[tag].forEach(a => {
          if (!ch.hasAttribute(a)) return;
          let v = ch.getAttribute(a);
          if (a === 'href') v = safeUrl(v);
          if (a === 'src') v = safeUrl(v, true);
          if (a === 'style') v = cleanStyle(tag, v);
          if (a === 'data-align' && !/^(left|center|right|full)$/.test(v)) v = 'center';
          if (a === 'target') v = v === '_blank' ? '_blank' : '';
          if ((a === 'width' || a === 'height' || a === 'colspan' || a === 'rowspan') && !/^\d{1,4}$/.test(v)) v = '';
          if (v) el.setAttribute(a, v);
        });
        if (tag === 'A' && el.getAttribute('target') === '_blank') el.setAttribute('rel', 'noopener noreferrer');
        if (tag === 'IMG' && !el.getAttribute('src')) return;
        parent.appendChild(el);
        walk(ch, el);
      });
    };
    const out = document.createElement('div');
    walk(doc.body, out);
    // wrap stray inline content at top level into paragraphs
    const final = document.createElement('div');
    let p = null;
    [...out.childNodes].forEach(n => {
      const block = n.nodeType === 1 && /^(P|H2|H3|H4|UL|OL|BLOCKQUOTE|HR|TABLE|FIGURE)$/.test(n.tagName);
      if (block) { p = null; final.appendChild(n); }
      else {
        if (n.nodeType === 3 && !n.nodeValue.trim() && !p) return;
        if (!p) { p = document.createElement('p'); final.appendChild(p); }
        p.appendChild(n);
      }
    });
    return final.innerHTML;
  }

  // Shared prose stylesheet — the editor and the public site render rich text identically.
  function proseCSS(scope) {
    const s = `[${scope}]`;
    return `${s}{color:#d4d4d4;font-family:'Archivo',sans-serif;font-weight:300;font-size:18px;line-height:1.7;overflow-wrap:break-word}
${s}::after{content:"";display:table;clear:both}
${s} > *:first-child{margin-top:0}
${s} p{margin:0 0 1.1em}
${s} h2,${s} h3,${s} h4{font-family:'Saira Condensed',sans-serif;font-weight:700;text-transform:uppercase;color:#fff;line-height:1.05;margin:1.6em 0 .55em}
${s} h2{font-size:clamp(30px,3vw,44px)}${s} h3{font-size:clamp(24px,2.2vw,32px)}${s} h4{font-size:22px}
${s} strong,${s} b{font-weight:700;color:#fff}
${s} a{color:#fff;text-decoration:underline;text-decoration-color:#e22718;text-underline-offset:4px}
${s} a:hover{color:#e22718}
${s} ul,${s} ol{margin:0 0 1.2em;padding-left:1.3em}${s} li{margin:.3em 0}${s} li::marker{color:#e22718}
${s} blockquote{margin:1.6em 0;padding:4px 0 4px 28px;border-left:2px solid #e22718;font-size:1.25em;line-height:1.45;color:#fff}
${s} hr{border:0;border-top:1px solid #3c3c3c;margin:2.4em 0;clear:both}
${s} table{width:100%;border-collapse:collapse;margin:1.6em 0;font-size:16px;display:block;overflow-x:auto}
${s} th,${s} td{border:1px solid #3c3c3c;padding:10px 14px;text-align:left;vertical-align:top;min-width:80px}
${s} th{background:#1a1a1a;color:#fff;font-weight:700}
${s} figure{margin:8px auto 24px;max-width:100%}
${s} figure img{display:block;width:100%;height:auto;object-fit:cover}
${s} figure[data-align="left"]{float:left;margin:6px 28px 16px 0}
${s} figure[data-align="right"]{float:right;margin:6px 0 16px 28px}
${s} figure[data-align="center"]{margin-left:auto;margin-right:auto;clear:both}
${s} figure[data-align="full"]{width:100% !important;clear:both}
${s} figure[data-ph]{display:none}
${s} figcaption{font-size:13px;line-height:1.5;color:#9a9a9a;padding-top:10px}
@media (max-width:640px){${s} figure[data-align="left"],${s} figure[data-align="right"]{float:none;width:100% !important;margin:8px 0 24px}}`;
  }

  // ---------- Text helpers ----------
  function slugify(s) { return String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80); }
  function htmlToDoc(html) { return new DOMParser().parseFromString('<body>' + (html || '') + '</body>', 'text/html'); }
  function textOf(html) { return (htmlToDoc(html).body.textContent || '').replace(/\s+/g, ' ').trim(); }
  const words = t => (t.match(/[\p{L}\p{N}'’-]+/gu) || []);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Defaults ----------
  const XEE = ['vneWqyyYccI','eDflW11GcLE','_QxDiJhYwaY','lcQab-lClpc','O1MTGxw_iHA','f6LZhkiYOHE','k3j-Rn7NTn4','Hg6MDkujHSQ','8b8EjJhJj-0','TdY_YPaD2PE','VT8C7hK1bNw','SZ0LnaGmHbk','BrFbfGO2XG8','LlqCVIwKED4','IcPWD61lhtw'];
  const DSQ = ['nWz68cG_9zg','_7eu2J5Nqko','3vM2NUytlbY','BbtyjuZP1qI','J6VAthSaWQY','75N8mCouRGc','6kCgFdmyUSw','nfFgnYjRJ54','f2O-Sfy62Gg','XSl2O_lEI_w','A5mEck8nQ3c','J7efOgHo7hU','kHoGorEWs98','KHhA-X2M9To','cxdLBcoCyRo','xb188uxK2Yk','sgKX1Vs_Vo4','aACqF8yQMkU','i-GXJ0jUX2Y'];
  const DRIVE = ['12EHajgqSzSv1DW0_j6CuTWEMmnM3Zezs','1XoX_xMqmg-7DtUXS_QZ364BDk80BNaMf','1FKaRv2Sjag9juzow1WKNopE8nY3wGYwa','1DqqbKc8vOEVycUrNhghDHXRhGARkCJj0','1laO8TDcFE-uP18tBtPSImSHS0o0BqZ2s','1qPe-_GCjXJN0mIaBZB8LlzYHBtOV51vz','1KkxltGgR0i5_idor9LhB2S3XDfVNFNMx','1ZaecjIFBKIqTBUqSh7WF3TXPKrRBCPEt','1iFdkFwO2vuB5wRI34xngNupa74e8p7ug'];
  const p2 = n => String(n).padStart(2, '0');
  function defaultVideos() {
    const out = [];
    const xs = XEE.map((id, i) => ({ id: 'v_x' + i, url: `https://www.youtube.com/watch?v=${id}`, title: `Xee Ho ${p2(i + 1)}` }));
    const ds = DSQ.map((id, i) => ({ id: 'v_d' + i, url: `https://www.youtube.com/watch?v=${id}`, title: `Dr Shahid Qureshi ${p2(i + 1)}` }));
    const dr = DRIVE.map((id, i) => ({ id: 'v_g' + i, url: `https://drive.google.com/file/d/${id}/view`, title: `Drive edit ${p2(i + 1)}` }));
    for (let i = 0; i < 19; i++) [xs[i], ds[i], dr[i]].forEach(v => v && out.push(v));
    return out;
  }
  const sec = (type, data) => ({ id: uid('s'), type, hidden: false, data });
  function defaultHome() {
    return {
      title: 'Home', slug: '',
      seo: { title: 'Ayesha Amin | Professional Video Editor', desc: 'Ayesha Amin edits commercial brand promos, cinematic travel stories, and short-form reels, with dynamic pacing, crisp sound design, and color grading.', focusKw: 'video editor', canonical: '', noindex: false, ogTitle: '', ogDesc: '', ogImage: '' },
      sections: [
        sec('hero', { eyebrow: 'Ayesha Amin | Professional Video Editor', heading: 'From raw footage to stories that stay.', subheading: 'I edit commercial brand promos, cinematic travel stories, and short-form reels, with dynamic pacing, crisp sound design, and color grading that commands attention.', primaryLabel: 'View My Work', primaryTarget: '#work', secondaryLabel: 'Start a Project', secondaryTarget: '#contact', bgImage: '', overlay: 60, showSocial: true }),
        sec('about', { anchor: 'about', label: 'About', heading: 'About Me', body: "<p>I'm a video editor who believes every cut should serve the story. Working across Adobe Premiere Pro, Final Cut Pro, After Effects, and CapCut, I bring story, motion, and sound together into edits that feel effortless to watch.</p><p>My range runs from fast, scroll-stopping 30-second vertical reels to slow-burn 15-minute documentaries. Whatever the format, my focus stays the same: pacing that holds attention, rhythm that carries emotion, and work that connects with audiences naturally.</p>", closing: "Have a project in mind? Let's make something people remember.", buttonLabel: "Let's Talk", buttonTarget: '#contact', image: '', imageAlt: 'Portrait of Ayesha Amin' }),
        sec('work', { anchor: 'work', label: 'Work', heading: 'My Work', subheading: 'A selection of reels, brand films, vlogs, and cinematic edits.', showreelUrl: '', showFilters: true, perPage: 9 }),
        sec('services', { anchor: 'services', label: 'Services', heading: '', items: [
          { title: 'Social Media Reels & Shorts', tagline: 'Fast, scroll-stopping edits built for Instagram, TikTok, and YouTube Shorts.', body: 'I create trend-driven short-form videos designed to grab attention in the first second and hold it. Fast transitions, trending sounds, and dynamic text overlays help your content boost engagement and reach.', included: 'Custom animated subtitles, emojis, and zooms\nSound design with whooshes, risers, hits, and layered effects\nBeat-synced cuts and captions\nOptimized for 9:16 and 1:1 formats', samples: '' },
          { title: 'Corporate & Brand Videos', tagline: 'Polished, on-brand edits that build credibility.', body: 'I edit brand and corporate videos that strengthen your visual identity and help your business stand out. Every edit stays consistent with your brand, from motion graphics and logo reveals to voiceover sync and music.', included: 'Motion graphics, titles, and logo reveals\nMulti-cam interview editing\nProduct highlights and testimonial polishing\nVoiceover sync and audio denoising', samples: '' },
          { title: 'YouTube, Vlogs & Real Estate', tagline: 'Clean storytelling and pacing that keep viewers watching.', body: 'I edit YouTube videos, lifestyle vlogs, and luxury real estate walkthroughs that tell your story with clarity and emotion. From jump cuts and captions to color correction and background music, every frame is built to keep viewers engaged and subscribed.', included: 'Hook editing that earns the click and the watch\nCustom thumbnail design\nMulti-track audio leveling\nSubtitles and YouTube chapter markers', samples: `https://www.youtube.com/watch?v=${XEE[0]}\nhttps://www.youtube.com/watch?v=${XEE[1]}\nhttps://www.youtube.com/watch?v=${XEE[2]}` },
          { title: 'Cinematic & Travel Videos', tagline: 'Color-graded, music-driven stories that bring every journey to life.', body: 'I turn travel footage into cinematic stories with rich color grading, seamless transitions, and emotional music sync.', included: 'S-Log and C-Log LUT transformation\nCustom film grain and color grading\nAtmospheric foley and sound design\nSpeed ramping', samples: '' }
        ] }),
        sec('why', { anchor: 'why', label: 'Why Me', heading: 'Why Choose Me', items: [
          { icon: 'timer', title: 'Fast Turnaround', body: "Quick delivery with unlimited revisions until you're satisfied." },
          { icon: 'devices', title: 'Every Platform, Every Format', body: 'Edits optimized for 16:9, 9:16, and 1:1 across all major platforms.' },
          { icon: 'aperture', title: 'Detail-Driven Storytelling', body: 'Careful attention to story, pacing, and smooth audio-visual flow.' },
          { icon: 'users', title: 'True Collaboration', body: 'I work closely with you to bring your vision to life.' }
        ] }),
        sec('testimonials', { anchor: 'testimonials', label: 'Testimonials', heading: 'What My Clients Say', subheading: "Feedback from creators, brands, and businesses I've edited for.", autoplay: true, items: [
          { quote: 'As a small business owner, I appreciated how stress-free Ayesha made the process. The video turnaround was ultra-fast and the engagement on our reels doubled in the first week.', name: 'Shehran Amin', role: 'Small Business Owner, Peak Commerce' },
          { quote: 'Her editing skills are unmatched. She transformed our raw event and promo footage into high-performing, visually striking content that elevated our brand presence.', name: 'Nida Shahid', role: 'CEO, Apex Media Lab' },
          { quote: 'Ayesha truly understood my vision and turned it into impactful designs. The color grading and rhythm between sound and visual cuts went well beyond our expectations!', name: 'Mahar Talha', role: 'Marketing Director, Veloce Digital' },
          { quote: 'She took the time to understand our goals and delivered a design that resonated perfectly with our audience. Her motion graphics and pacing keep viewers glued until the end.', name: 'Maimoon Amin', role: 'Product Manager & Creator, NextWave Media' }
        ] }),
        sec('stats', { anchor: 'results', items: [
          { value: 30, suffix: '+', label: 'Creators and commercial partners worldwide' },
          { value: 99, suffix: '%', label: 'Client satisfaction rate' },
          { value: 200, suffix: '%', label: 'Average engagement growth for client channels, driven by retention-focused pacing' }
        ] }),
        sec('faq', { anchor: 'faq', label: 'FAQ', heading: 'Frequently Asked Questions', subheading: "Answers to the questions I hear most. Don't see yours? Feel free to reach out.", items: [
          { q: 'What types of videos do you edit?', a: 'Brand commercials and spots, Instagram Reels, TikToks, YouTube Shorts, full-length YouTube videos and podcasts, luxury real estate walkthroughs, documentary shorts, and cinematic travel films.' },
          { q: 'What software do you use?', a: 'Adobe Premiere Pro and Final Cut Pro for editing, After Effects for motion graphics and visual effects, Adobe Audition for sound design, and CapCut Pro for fast-paced vertical shorts.' },
          { q: "What's your turnaround time?", a: 'Short-form reels and Shorts are usually delivered in 24 to 48 hours. Standard YouTube videos (8 to 15 minutes) and corporate promos take 3 to 5 business days. Rush delivery is available for urgent launches.' },
          { q: 'Do you edit for social media platforms?', a: 'Yes. I specialize in social-first formats: 9:16 for Reels, TikTok, and Shorts, 1:1 for feed posts, and 16:9 for YouTube. Every edit uses strong hooks, animated captions, and sound effects to maximize retention.' },
          { q: 'How do I send you my footage?', a: 'Share your raw files, B-roll, and music briefs through Google Drive, Dropbox, or WeTransfer. For large projects, I provide a simple folder organization guide.' },
          { q: 'How do payments work?', a: 'A 50% deposit starts the project. The remaining 50% is due on final approval, after which you receive full-resolution, watermark-free master files. I accept bank transfer, EasyPaisa, JazzCash, and SadaPay.' }
        ] }),
        sec('contact', { anchor: 'contact', label: 'Contact', heading: "Let's Create Something Amazing", body: "Looking for video editing that grabs attention and tells a story? From YouTube videos to brand promos and social reels, let's make your content shine.", projectTypes: 'Social Media Reels & Shorts\nCorporate & Brand Videos\nYouTube, Vlogs & Real Estate\nCinematic & Travel Videos\nOther', submitLabel: 'Send Message' })
      ]
    };
  }
  function defaultSite() {
    return {
      header: { height: 96, logoWidth: 150, logo: 'assets/ayesha-logo.jpg', logoCropBottom: 25, sticky: true, hireLabel: 'Hire Me', hireTarget: '#contact', showHire: true },
      nav: [
        { label: 'About', target: '#about' }, { label: 'Work', target: '#work' }, { label: 'Why Me', target: '#why' },
        { label: 'Testimonials', target: '#testimonials' }, { label: 'FAQ', target: '#faq' }, { label: 'Blog', target: '/blog' }, { label: 'Contact', target: '#contact' }
      ],
      footer: { logoWidth: 150, quickLinks: [{ label: 'About', target: '#about' }, { label: 'Work', target: '#work' }, { label: 'FAQ', target: '#faq' }, { label: 'Contact', target: '#contact' }], copyright: '© Ayesha Amin. All rights reserved.' },
      social: [{ label: 'Facebook', url: '' }, { label: 'Twitter', url: '' }, { label: 'LinkedIn', url: '' }, { label: 'Dribbble', url: '' }],
      contact: { email: 'ayeshaminnle@gmail.com', whatsappDisplay: '0370 1421101', whatsappIntl: '+92 370 1421101', formEndpoint: '' },
      seo: { siteName: 'Ayesha Amin', baseUrl: '', titleTemplate: '%title% | Ayesha Amin', defaultOgImage: '', xHandle: '', robots: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /*?preview=\n\nSitemap: %baseUrl%/sitemap.xml' }
    };
  }
  function defaultPost() {
    return {
      title: 'Sample draft: planning a three-second hook', slug: 'planning-a-three-second-hook', excerpt: 'A sample draft post. Replace this with your own writing or delete it.',
      date: new Date().toISOString().slice(0, 10), categories: ['cat_editing'], tags: ['hooks', 'reels'], featuredImage: '',
      html: '<p>This is a sample draft so you can see how the blog editor, preview and SEO checks work. Edit or delete it from the dashboard.</p><h2>Start with the payoff</h2><p>Write your first section here.</p><h2>Cut on the beat</h2><p>Write your second section here.</p>',
      seo: { title: '', desc: '', focusKw: 'video hook', canonical: '', noindex: false, ogTitle: '', ogDesc: '', ogImage: '' }
    };
  }
  function seedState() {
    const t = now();
    const ent = (id, type, draft, live) => ({ id, type, draft, live, createdAt: t, updatedAt: t, publishedAt: live ? t : null, revisions: [] });
    const home = defaultHome(), site = defaultSite(), videos = { items: defaultVideos() };
    return {
      version: 1,
      entities: {
        home: ent('home', 'home', home, clone(home)),
        site: ent('site', 'site', site, clone(site)),
        videos: ent('videos', 'videos', videos, clone(videos)),
        post_sample: ent('post_sample', 'post', defaultPost(), null)
      },
      taxonomy: { categories: [{ id: 'cat_editing', name: 'Editing', slug: 'editing' }, { id: 'cat_process', name: 'Process', slug: 'process' }] },
      media: [],
      redirects: [],
      auth: { hash: DEFAULT_HASH, recoveryHash: RECOVERY_HASH, changedAt: null }
    };
  }

  // One-time removal of content created while the dashboard was being built and tested.
  function cleanBuildTests(s) {
    const isTest = m => m && m.name === 'test-red';
    const testIds = s.media.filter(isTest).map(m => m.id);
    s.media = s.media.filter(m => !isTest(m));
    const p = s.entities.post_sample;
    if (p && (p.live || (p.draft.html || '').includes('data-media'))) {
      const fresh = defaultPost(); fresh.date = p.draft.date || fresh.date;
      p.draft = fresh; p.live = null; p.publishedAt = null; p.lastLivePath = null; p.revisions = [];
    }
    if (s.entities.home) s.entities.home.revisions = s.entities.home.revisions.filter(r => !JSON.stringify(r.data).includes('TEST HEADING'));
    Object.keys(s.entities).forEach(k => { const e = s.entities[k]; if (e.type === 'page' && /^(Test Page|Changed title)$/.test(e.draft.title)) delete s.entities[k]; });
    s.redirects = s.redirects.filter(r => !/test-page|three-second/.test(r.from + r.to));
    const si = s.entities.site; if (si && si.live) si.draft = clone(si.live);
    if (testIds.length) Object.values(s.entities).forEach(e => { ['draft', 'live'].forEach(k => { if (e[k] && e[k].featuredImage && testIds.some(id => e[k].featuredImage === 'media:' + id)) e[k].featuredImage = ''; }); });
  }

  // ---------- Store ----------
  const listeners = new Set();
  const chan = 'BroadcastChannel' in window ? new BroadcastChannel('ayesha-cms') : null;
  const CMS = { state: null, saveStatus: 'idle', lastSaved: null, error: '' };
  const emit = () => listeners.forEach(fn => { try { fn(CMS); } catch (e) { console.error(e); } });
  CMS.subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn); };
  CMS.ready = (async () => {
    try {
      let s = await idbGet('state');
      if (!s) { s = seedState(); await idbSet('state', s); }
      if (!s.migratedV1) { cleanBuildTests(s); s.migratedV1 = true; await idbSet('state', s); }
      CMS.state = s;
    } catch (e) { CMS.error = 'Storage unavailable: ' + e.message; CMS.state = seedState(); }
    emit();
    return CMS;
  })();
  if (chan) chan.onmessage = async ev => { if (ev.data && ev.data.type === 'changed') { const s = await idbGet('state'); if (s) { CMS.state = s; emit(); } } };
  let saveTimer = null, savePromise = Promise.resolve();
  function persist() {
    CMS.saveStatus = 'saving'; emit();
    clearTimeout(saveTimer);
    return new Promise(res => {
      saveTimer = setTimeout(() => {
        savePromise = idbSet('state', CMS.state).then(() => {
          CMS.saveStatus = 'saved'; CMS.lastSaved = new Date(); chan && chan.postMessage({ type: 'changed' }); emit(); res(true);
        }).catch(e => { CMS.saveStatus = 'error'; CMS.error = e.message; emit(); res(false); });
      }, 600);
    });
  }
  CMS.flush = () => { if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; return idbSet('state', CMS.state).then(() => { CMS.saveStatus = 'saved'; CMS.lastSaved = new Date(); chan && chan.postMessage({ type: 'changed' }); emit(); }); } return savePromise; };
  window.addEventListener('beforeunload', e => { if (CMS.saveStatus === 'saving') { CMS.flush(); e.preventDefault(); e.returnValue = ''; } });

  CMS.entity = id => CMS.state && CMS.state.entities[id];
  CMS.list = type => Object.values(CMS.state ? CMS.state.entities : {}).filter(e => e.type === type).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  CMS.isDirty = id => { const e = CMS.entity(id); return !!e && (!e.live || JSON.stringify(e.draft) !== JSON.stringify(e.live)); };
  CMS.status = id => { const e = CMS.entity(id); if (!e) return 'missing'; if (!e.live) return e.publishedAt ? 'unpublished' : 'draft'; return CMS.isDirty(id) ? 'changed' : 'published'; };
  CMS.updateDraft = (id, fn) => {
    const e = CMS.entity(id); if (!e || !requireAuth()) return;
    const next = clone(e.draft); const r = fn(next); e.draft = r || next; e.updatedAt = now();
    return persist();
  };
  function pushRevision(e, label, kind) {
    e.revisions.unshift({ id: uid('r'), ts: now(), label, kind, data: clone(e.draft) });
    if (e.revisions.length > MAX_REVISIONS) e.revisions.length = MAX_REVISIONS;
  }
  function pathFor(e, data) {
    const d = data || e.draft;
    if (e.type === 'home') return '/';
    if (e.type === 'post') return '/blog/' + d.slug;
    if (e.type === 'page') return '/' + d.slug;
    return null;
  }
  CMS.pathFor = pathFor;
  CMS.slugTaken = (slug, exceptId, type) => {
    const reserved = ['blog', 'admin', 'sitemap.xml', 'robots.txt', 'preview', ''];
    if (type === 'page' && reserved.includes(slug)) return true;
    return Object.values(CMS.state.entities).some(o => o.id !== exceptId && o.type === type && (o.draft.slug === slug || (o.live && o.live.slug === slug)));
  };
  CMS.publish = id => {
    const e = CMS.entity(id); if (!e || !requireAuth()) return;
    if ((e.type === 'page' || e.type === 'post') && !e.draft.slug) e.draft.slug = slugify(e.draft.title) || id;
    if (e.type === 'post' || e.type === 'page' || e.type === 'home') e.draft.html !== undefined && (e.draft.html = sanitize(e.draft.html));
    const oldPath = e.live ? pathFor(e, e.live) : (e.lastLivePath || null);
    const newPath = pathFor(e);
    if (oldPath && newPath && oldPath !== newPath) {
      CMS.state.redirects = CMS.state.redirects.filter(r => r.from !== newPath);
      CMS.state.redirects.forEach(r => { if (r.to === oldPath) r.to = newPath; });
      CMS.state.redirects.push({ id: uid('rd'), from: oldPath, to: newPath, auto: true, createdAt: now() });
    }
    pushRevision(e, 'Published', 'publish');
    e.live = clone(e.draft); e.publishedAt = now(); e.lastLivePath = newPath; e.updatedAt = now();
    return persist();
  };
  CMS.unpublish = id => { const e = CMS.entity(id); if (!e || !requireAuth() || !e.live) return; if (e.type === 'home' || e.type === 'site' || e.type === 'videos') return; e.lastLivePath = pathFor(e, e.live); e.live = null; e.updatedAt = now(); return persist(); };
  CMS.discardDraft = id => { const e = CMS.entity(id); if (!e || !e.live || !requireAuth()) return; pushRevision(e, 'Before discarding changes', 'manual'); e.draft = clone(e.live); e.updatedAt = now(); return persist(); };
  CMS.saveRevision = (id, label) => { const e = CMS.entity(id); if (!e || !requireAuth()) return; pushRevision(e, label || 'Saved revision', 'manual'); return persist(); };
  CMS.restoreRevision = (id, revId) => {
    const e = CMS.entity(id); if (!e || !requireAuth()) return; const r = e.revisions.find(x => x.id === revId); if (!r) return;
    pushRevision(e, 'Before restoring ' + new Date(r.ts).toLocaleString(), 'manual');
    e.draft = clone(r.data); e.updatedAt = now(); return persist();
  };
  CMS.create = (type, data) => {
    if (!requireAuth()) return null;
    const id = uid(type), t = now();
    const base = type === 'post' ? { ...defaultPost(), title: 'Untitled post', slug: '', excerpt: '', html: '<p></p>', categories: [], tags: [], seo: { title: '', desc: '', focusKw: '', canonical: '', noindex: false, ogTitle: '', ogDesc: '', ogImage: '' } }
      : { title: 'Untitled page', slug: '', featuredImage: '', html: '<p></p>', seo: { title: '', desc: '', focusKw: '', canonical: '', noindex: false, ogTitle: '', ogDesc: '', ogImage: '' } };
    CMS.state.entities[id] = { id, type, draft: Object.assign(base, data || {}), live: null, createdAt: t, updatedAt: t, publishedAt: null, revisions: [] };
    persist(); return id;
  };
  CMS.remove = id => { const e = CMS.entity(id); if (!e || !requireAuth() || ['home', 'site', 'videos'].includes(id)) return; delete CMS.state.entities[id]; return persist(); };
  CMS.mutate = fn => { if (!requireAuth()) return; fn(CMS.state); return persist(); };

  // ---------- Media ----------
  const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_BYTES = 10 * 1024 * 1024, MAX_DIM = 2400;
  CMS.addMedia = async file => {
    if (!requireAuth()) throw new Error('Please sign in again.');
    if (!MEDIA_TYPES.includes(file.type)) throw new Error(`${file.name}: only JPG, PNG, WebP or GIF images are allowed.`);
    if (file.size > MAX_BYTES) throw new Error(`${file.name}: larger than 10 MB.`);
    const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(file); });
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error(`${file.name}: the file isn't a readable image.`)); i.src = dataUrl; });
    let out = dataUrl, w = img.naturalWidth, h = img.naturalHeight;
    if (file.type !== 'image/gif' && (w > MAX_DIM || h > MAX_DIM || file.size > 1.5 * 1024 * 1024)) {
      const k = Math.min(1, MAX_DIM / Math.max(w, h)); w = Math.round(w * k); h = Math.round(h * k);
      const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
      out = c.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.86);
      if (file.type === 'image/png' && out.length > 3e6) out = c.toDataURL('image/jpeg', 0.86);
    }
    const item = { id: uid('m'), name: file.name.replace(/\.[^.]+$/, ''), alt: '', src: out, w, h, bytes: Math.round(out.length * 0.75), type: file.type, createdAt: now() };
    CMS.state.media.unshift(item); persist(); return item;
  };
  CMS.updateMedia = (id, patch) => { const m = CMS.state.media.find(x => x.id === id); if (!m || !requireAuth()) return; Object.assign(m, patch); return persist(); };
  CMS.mediaUsage = id => { const m = CMS.state.media.find(x => x.id === id); if (!m) return []; const out = []; Object.values(CMS.state.entities).forEach(e => { const s = JSON.stringify(e.draft) + JSON.stringify(e.live || ''); if (s.includes(id) || s.includes(m.src.slice(0, 200))) out.push(e.draft.title || e.type); }); return out; };
  CMS.deleteMedia = id => { if (!requireAuth()) return; CMS.state.media = CMS.state.media.filter(x => x.id !== id); return persist(); };
  const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'], MAX_VIDEO = 200 * 1024 * 1024, vidUrls = {};
  CMS.addVideoFile = async file => {
    if (!requireAuth()) throw new Error('Please sign in again.');
    if (!VIDEO_TYPES.includes(file.type)) throw new Error(file.name + ': only MP4, WebM or MOV videos are allowed.');
    if (file.size > MAX_VIDEO) throw new Error(file.name + ': larger than 200 MB. Compress it or use a link instead.');
    const id = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    await idbSet('vfile:' + id, file);
    CMS.state.videoFiles = (CMS.state.videoFiles || []).concat({ id, name: file.name, size: file.size, type: file.type, added: now() });
    await persist(); return 'vfile:' + id;
  };
  CMS.videoFileMeta = ref => { const id = String(ref || '').replace(/^vfile:/, ''); return (CMS.state.videoFiles || []).find(x => x.id === id) || null; };
  CMS.videoFileUrl = async ref => { const id = String(ref || '').replace(/^vfile:/, ''); if (vidUrls[id]) return vidUrls[id]; const b = await idbGet('vfile:' + id); if (!b) return ''; return (vidUrls[id] = URL.createObjectURL(b)); };
  CMS.videoFileUrlSync = ref => vidUrls[String(ref || '').replace(/^vfile:/, '')] || '';
  CMS.mediaSrc = ref => { if (!ref) return ''; if (/^media:/.test(ref)) { const m = CMS.state.media.find(x => x.id === ref.slice(6)); return m ? m.src : ''; } return ref; };

  // ---------- Auth (browser-only demo) ----------
  async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  let fails = 0, lockUntil = 0;
  CMS.login = async pw => {
    await CMS.ready;
    if (Date.now() < lockUntil) throw new Error(`Too many attempts. Try again in ${Math.ceil((lockUntil - Date.now()) / 1000)}s.`);
    if ((await sha(SALT + pw)) !== CMS.state.auth.hash) { fails++; if (fails >= 5) { lockUntil = Date.now() + 30000; fails = 0; } throw new Error('Incorrect password.'); }
    fails = 0;
    const exp = Date.now() + SESSION_HOURS * 3600e3;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ exp, sig: await sha(CMS.state.auth.hash + ':' + exp) }));
    sessionOk = true; emit(); return true;
  };
  let sessionOk = false;
  CMS.checkSession = async () => {
    await CMS.ready;
    try { const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); sessionOk = !!s && s.exp > Date.now() && s.sig === (await sha(CMS.state.auth.hash + ':' + s.exp)); }
    catch (e) { sessionOk = false; }
    if (!sessionOk) localStorage.removeItem(SESSION_KEY);
    return sessionOk;
  };
  CMS.isAuthed = () => sessionOk;
  function requireAuth() { if (!sessionOk) { CMS.error = 'Not signed in.'; emit(); return false; } return true; }
  CMS.logout = () => { localStorage.removeItem(SESSION_KEY); sessionOk = false; emit(); };
  CMS.resetPassword = async (code, pw) => {
    await CMS.ready;
    if ((await sha(SALT + 'recovery:' + code.trim().toUpperCase())) !== CMS.state.auth.recoveryHash) throw new Error('That recovery code is not valid.');
    if (!pw || pw.length < 8) throw new Error('Use at least 8 characters.');
    CMS.state.auth.hash = await sha(SALT + pw); CMS.state.auth.changedAt = now();
    localStorage.removeItem(SESSION_KEY); sessionOk = false; await idbSet('state', CMS.state); emit(); return true;
  };
  CMS.changePassword = async (oldPw, pw) => {
    if (!requireAuth()) throw new Error('Not signed in.');
    if ((await sha(SALT + oldPw)) !== CMS.state.auth.hash) throw new Error('Current password is incorrect.');
    if (!pw || pw.length < 8) throw new Error('Use at least 8 characters.');
    CMS.state.auth.hash = await sha(SALT + pw); CMS.state.auth.changedAt = now(); await idbSet('state', CMS.state);
    await CMS.login(pw); return true;
  };
  CMS.newRecoveryCode = async () => {
    if (!requireAuth()) throw new Error('Not signed in.');
    const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = crypto.getRandomValues(new Uint8Array(8));
    const code = 'AYESHA-' + [...r].slice(0, 4).map(x => a[x % a.length]).join('') + '-' + [...r].slice(4).map(x => a[x % a.length]).join('');
    CMS.state.auth.recoveryHash = await sha(SALT + 'recovery:' + code); await idbSet('state', CMS.state); return code;
  };

  // ---------- Backup ----------
  CMS.exportJSON = () => { const s = clone(CMS.state); delete s.auth; return JSON.stringify(s, null, 2); };
  CMS.importJSON = text => { if (!requireAuth()) return; const s = JSON.parse(text); if (!s || !s.entities || !s.entities.home) throw new Error('This file is not an Ayesha CMS backup.'); s.auth = CMS.state.auth; CMS.state = s; return persist(); };

  // ---------- Routing / public reads ----------
  CMS.read = (id, preview) => { const e = CMS.entity(id); if (!e) return null; return preview ? e.draft : e.live; };
  CMS.resolve = (path, preview) => {
    path = '/' + String(path || '').replace(/^\/+|\/+$/g, '');
    const red = CMS.state.redirects.find(r => r.from === path);
    if (red && !preview) return { redirect: red.to };
    if (path === '/') return { kind: 'home', id: 'home' };
    const ents = Object.values(CMS.state.entities);
    const pick = d => (preview ? d.draft : d.live);
    if (path === '/blog') return { kind: 'blog' };
    let m;
    if ((m = path.match(/^\/blog\/([^/]+)$/))) { const e = ents.find(x => x.type === 'post' && pick(x) && pick(x).slug === m[1]); return e ? { kind: 'post', id: e.id } : { kind: '404' }; }
    if ((m = path.match(/^\/([^/]+)$/))) { const e = ents.find(x => x.type === 'page' && pick(x) && pick(x).slug === m[1]); return e ? { kind: 'page', id: e.id } : { kind: '404' }; }
    return { kind: '404' };
  };
  CMS.posts = preview => Object.values(CMS.state.entities).filter(e => e.type === 'post' && (preview ? e.draft : e.live)).map(e => ({ id: e.id, ...(preview ? e.draft : e.live), publishedAt: e.publishedAt })).sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // ---------- SEO ----------
  CMS.siteSeo = preview => (CMS.read('site', preview) || defaultSite()).seo;
  CMS.absUrl = (path, preview) => { const b = (CMS.siteSeo(preview).baseUrl || '').replace(/\/+$/, ''); return b ? b + path : path; };
  CMS.effectiveTitle = (d, kind, preview) => {
    const s = CMS.siteSeo(preview);
    if (d.seo && d.seo.title) return d.seo.title;
    if (kind === 'home') return s.siteName;
    return (s.titleTemplate || '%title%').replace('%title%', d.title || '').replace('%sitename%', s.siteName);
  };
  CMS.effectiveDesc = d => (d.seo && d.seo.desc) || d.excerpt || textOf(d.html || '').slice(0, 155);
  CMS.homeText = d => (d.sections || []).filter(s => !s.hidden).map(s => Object.values(s.data).map(v => Array.isArray(v) ? v.map(i => Object.values(i).join(' ')).join(' ') : typeof v === 'string' ? (/</.test(v) ? textOf(v) : v) : '').join(' ')).join(' ');

  CMS.analyze = (d, kind, preview) => {
    const site = CMS.siteSeo(preview);
    const seo = d.seo || {};
    const html = kind === 'home' ? (d.sections || []).filter(s => !s.hidden).map(s => (s.data.heading ? `<h2>${esc(s.data.heading)}</h2>` : '') + (s.data.body && /</.test(s.data.body) ? s.data.body : `<p>${esc(s.data.body || s.data.subheading || '')}</p>`) + (s.data.html || '')).join('') : (d.html || '');
    const doc = htmlToDoc(html);
    const text = kind === 'home' ? CMS.homeText(d) : textOf(html);
    const W = words(text), wc = W.length;
    const title = CMS.effectiveTitle(d, kind, preview);
    const desc = seo.desc || '';
    const slug = kind === 'home' ? '' : (d.slug || '');
    const kw = (seo.focusKw || '').trim().toLowerCase();
    const P = (label, ok, okText, badText, na) => ({ label, status: na ? 'na' : ok ? 'pass' : 'improve', detail: na ? na : ok ? okText : badText });
    const groups = [];
    groups.push({ name: 'Search appearance', checks: [
      P('SEO title length', title.length >= 30 && title.length <= 60, `${title.length} characters. Fits most results.`, title.length < 30 ? `${title.length} characters. Aim for 30–60 so it describes the page fully.` : `${title.length} characters. Over 60 may be cut off in results.`),
      P('Meta description', desc.length >= 120 && desc.length <= 160, `${desc.length} characters.`, !desc ? 'Add a meta description. Search engines may otherwise pick text from the page.' : `${desc.length} characters. Aim for 120–160.`),
      P('URL slug', /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && slug.length <= 60, 'Short, lowercase and hyphenated.', !slug ? 'Add a slug.' : 'Use lowercase words separated by hyphens, under 60 characters.', kind === 'home' ? 'The homepage lives at the site root.' : ''),
      P('Canonical URL', !seo.canonical || /^https:\/\//.test(seo.canonical), seo.canonical ? 'Custom canonical set.' : 'Uses this page’s own URL.', 'Canonical must be a full https:// URL.'),
      P('Indexing', !seo.noindex, 'Search engines may index this page.', 'Set to noindex. This page is hidden from search results and the sitemap.')
    ] });
    const kwChecks = [];
    if (!kw) kwChecks.push({ label: 'Focus keyword', status: 'na', detail: 'Add a focus keyword to check how well the page covers it.' });
    else {
      const count = (text.toLowerCase().match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      const density = wc ? (count * kw.split(/\s+/).length / wc) * 100 : 0;
      const heads = [...doc.querySelectorAll('h2,h3,h4')].map(h => h.textContent.toLowerCase());
      const first = (kind === 'home' ? text : (doc.querySelector('p') || { textContent: '' }).textContent).toLowerCase().slice(0, 300);
      const imgs = [...doc.querySelectorAll('img')];
      kwChecks.push(
        P('Keyword in SEO title', title.toLowerCase().includes(kw), 'Found in the title.', 'Use the keyword naturally in the SEO title.'),
        P('Keyword in meta description', desc.toLowerCase().includes(kw), 'Found in the description.', 'Mention the keyword in the meta description.'),
        P('Keyword in URL', slug.includes(slugify(kw)), 'Found in the slug.', 'Consider including the keyword in the slug.', kind === 'home' ? 'Not applicable to the homepage.' : ''),
        P('Keyword in introduction', first.includes(kw), 'Appears near the start.', 'Mention it in the first paragraph.'),
        P('Keyword in a subheading', heads.some(h => h.includes(kw)), 'Used in a subheading.', 'Use it (or a close variation) in at least one subheading.'),
        P('Keyword frequency', density >= 0.5 && density <= 2.5, `Used ${count}×. Natural frequency.`, density > 2.5 ? `Used ${count}× (${density.toFixed(1)}%). Use it less often so the text reads naturally.` : `Used ${count}×. Mention it a little more where it fits naturally.`, wc < 50 ? 'Not enough text to judge yet.' : ''),
        P('Keyword in image alt text', imgs.some(i => (i.getAttribute('alt') || '').toLowerCase().includes(kw)), 'An image alt text includes it.', 'Where accurate, describe an image using the keyword.', imgs.length ? '' : 'No images in the content.')
      );
    }
    groups.push({ name: 'Focus keyword', checks: kwChecks });
    const headings = [...doc.querySelectorAll('h1,h2,h3,h4')].map(h => +h.tagName[1]);
    let skipped = false; headings.reduce((prev, l) => { if (l > prev + 1) skipped = true; return l; }, 1);
    const imgs = [...doc.querySelectorAll('img')];
    const links = [...doc.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
    const base = (site.baseUrl || '').replace(/\/+$/, '');
    const internal = links.filter(h => h.startsWith('/') || h.startsWith('#') || (base && h.startsWith(base)));
    const external = links.filter(h => /^https?:/.test(h) && !(base && h.startsWith(base)));
    const minWords = kind === 'post' ? 600 : 300;
    groups.push({ name: 'Content', checks: [
      P('Content length', wc >= minWords, `${wc} words.`, `${wc} words. ${kind === 'post' ? 'Posts' : 'Pages'} usually need ${minWords}+ words to cover a topic well.`, kind === 'home' ? '' : ''),
      P('Heading structure', !headings.includes(1) && !skipped, headings.length ? 'Subheadings follow a logical order.' : 'No subheadings yet.', headings.includes(1) ? 'The page title is the H1. Use H2 and below inside the content.' : 'A heading level is skipped (e.g. H2 → H4).', kind === 'home' ? 'Homepage headings are set by its sections.' : ''),
      P('Image alt text', imgs.every(i => (i.getAttribute('alt') || '').trim()), `All ${imgs.length} images have alt text.`, `${imgs.filter(i => !(i.getAttribute('alt') || '').trim()).length} image(s) missing alt text.`, imgs.length ? '' : 'No images in the content.'),
      P('Internal links', internal.length > 0, `${internal.length} internal link(s).`, 'Link to at least one related page on your site.', kind === 'home' ? 'Homepage navigation covers this.' : ''),
      P('External links', external.length > 0, `${external.length} external link(s).`, 'Where useful, link to a relevant outside source.', kind === 'home' ? 'Not applicable to the homepage.' : ''),
      P('Featured image', !!(d.featuredImage || seo.ogImage), 'Set.', 'Add a featured image. It is also used when the page is shared.', kind === 'home' ? '' : '')
    ].filter(c => !(kind === 'home' && c.label === 'Featured image')) });
    const sentences = text.split(/[.!?]+\s/).filter(s => s.trim());
    const avg = sentences.length ? wc / sentences.length : 0;
    const paras = [...doc.querySelectorAll('p')].map(p => words(p.textContent).length);
    const longParas = paras.filter(n => n > 150).length;
    let gap = 0, maxGap = 0; [...doc.body.children].forEach(el => { if (/^H[2-4]$/.test(el.tagName)) gap = 0; else { gap += words(el.textContent).length; maxGap = Math.max(maxGap, gap); } });
    groups.push({ name: 'Readability', checks: [
      P('Sentence length', avg <= 20, `Average ${avg.toFixed(0)} words per sentence.`, `Average ${avg.toFixed(0)} words per sentence. Shorter sentences are easier to scan.`, wc < 50 ? 'Not enough text to judge yet.' : ''),
      P('Paragraph length', longParas === 0, 'Paragraphs are a comfortable length.', `${longParas} paragraph(s) over 150 words. Split them up.`, kind === 'home' || !paras.length ? 'Not enough text to judge yet.' : ''),
      P('Subheading spacing', maxGap <= 300, 'Text is broken up by subheadings.', `A stretch of ${maxGap} words has no subheading. Add one every ~300 words.`, kind === 'home' || wc < 300 ? 'Not needed at this length.' : '')
    ] });
    groups.push({ name: 'Social sharing', checks: [
      P('Share image', !!(seo.ogImage || d.featuredImage || site.defaultOgImage), 'An image will show when shared.', 'Add a social image, a featured image, or a site default share image.'),
      P('Share title and description', true, seo.ogTitle || seo.ogDesc ? 'Custom share text set.' : 'Falls back to the SEO title and description.', '')
    ] });
    const all = groups.flatMap(g => g.checks);
    return { groups, title, desc, counts: { pass: all.filter(c => c.status === 'pass').length, improve: all.filter(c => c.status === 'improve').length, na: all.filter(c => c.status === 'na').length }, words: wc };
  };

  CMS.headFor = (route, preview) => {
    const site = CMS.read('site', preview) || defaultSite();
    const s = site.seo;
    let d = null, kind = route.kind, path = '/';
    if (kind === 'home') d = CMS.read('home', preview);
    if (kind === 'page' || kind === 'post') { d = CMS.read(route.id, preview); path = CMS.pathFor({ type: kind }, d); }
    if (kind === 'blog') { d = { title: 'Blog', seo: { desc: `Writing on video editing from ${s.siteName}.` } }; path = '/blog'; }
    if (kind === '404') return { title: 'Page not found | ' + s.siteName, desc: '', robots: 'noindex, nofollow', canonical: '', jsonld: null, og: {} };
    const seo = (d && d.seo) || {};
    const title = CMS.effectiveTitle(d, kind, preview), desc = kind === 'home' ? seo.desc : CMS.effectiveDesc(d);
    const url = seo.canonical || CMS.absUrl(path, preview);
    const img = CMS.mediaSrc(seo.ogImage || d.featuredImage || s.defaultOgImage);
    const author = { '@type': 'Person', name: 'Ayesha Amin', jobTitle: 'Professional Video Editor' };
    const crumbs = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: CMS.absUrl(it[1], preview) })) });
    let graph = [];
    if (kind === 'home') graph = [{ '@type': 'WebSite', name: s.siteName, url: CMS.absUrl('/', preview) }, { ...author, url: CMS.absUrl('/', preview), email: 'mailto:' + site.contact.email, sameAs: site.social.map(x => x.url).filter(Boolean) }];
    if (kind === 'page') graph = [{ '@type': 'WebPage', name: d.title, url }, crumbs([['Home', '/'], [d.title, path]])];
    if (kind === 'blog') graph = [{ '@type': 'Blog', name: s.siteName + ' Blog', url }, crumbs([['Home', '/'], ['Blog', '/blog']])];
    if (kind === 'post') graph = [{ '@type': 'BlogPosting', headline: d.title, description: desc, datePublished: d.date, dateModified: (CMS.entity(route.id) || {}).updatedAt, author, image: img && !/^data:/.test(img) ? img : undefined, mainEntityOfPage: url }, crumbs([['Home', '/'], ['Blog', '/blog'], [d.title, path]])];
    return {
      title, desc, canonical: url, robots: preview || seo.noindex ? 'noindex, nofollow' : 'index, follow',
      og: { 'og:type': kind === 'post' ? 'article' : 'website', 'og:title': seo.ogTitle || title, 'og:description': seo.ogDesc || desc, 'og:url': url, 'og:image': img && !/^data:/.test(img) ? img : '', 'og:site_name': s.siteName, 'twitter:card': img ? 'summary_large_image' : 'summary', 'twitter:title': seo.ogTitle || title, 'twitter:description': seo.ogDesc || desc, 'twitter:site': s.xHandle || '' },
      jsonld: graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
    };
  };
  CMS.applyHead = h => {
    document.title = h.title;
    const meta = (attr, key, val) => { let el = document.head.querySelector(`meta[${attr}="${key}"]`); if (!val) { el && el.remove(); return; } if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); } el.setAttribute('content', val); };
    meta('name', 'description', h.desc); meta('name', 'robots', h.robots);
    Object.entries(h.og || {}).forEach(([k, v]) => meta(k.startsWith('og:') ? 'property' : 'name', k, v));
    let link = document.head.querySelector('link[rel="canonical"]');
    if (h.canonical && /^https?:/.test(h.canonical)) { if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); } link.href = h.canonical; } else if (link) link.remove();
    let ld = document.getElementById('cms-jsonld');
    if (h.jsonld) { if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'cms-jsonld'; document.head.appendChild(ld); } ld.textContent = JSON.stringify(h.jsonld); } else if (ld) ld.remove();
  };

  CMS.sitemap = () => {
    const urls = [];
    const add = (path, lastmod) => urls.push({ loc: CMS.absUrl(path), lastmod: (lastmod || now()).slice(0, 10) });
    const E = CMS.state.entities;
    if (E.home.live && !E.home.live.seo.noindex) add('/', E.home.publishedAt);
    Object.values(E).filter(e => e.type === 'page' && e.live && !e.live.seo.noindex).forEach(e => add('/' + e.live.slug, e.publishedAt));
    const posts = Object.values(E).filter(e => e.type === 'post' && e.live && !e.live.seo.noindex);
    if (posts.length) add('/blog', posts.map(p => p.publishedAt).sort().pop());
    posts.forEach(e => add('/blog/' + e.live.slug, e.publishedAt));
    return { urls, xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n` };
  };
  CMS.robotsTxt = () => { const s = (CMS.read('site', false) || defaultSite()).seo; return (s.robots || '').replace(/%baseUrl%/g, (s.baseUrl || '').replace(/\/+$/, '') || '[Placeholder: site URL]'); };

  // Plain-text paragraph editing: blank line = new paragraph, "## " = heading, "- " = list item.
  function htmlToText(html) {
    const body = htmlToDoc(html).body; const out = [];
    [...body.children].forEach(el => {
      const t = el.tagName, txt = el.textContent.replace(/\s+/g, ' ').trim();
      if (t === 'H2') out.push('## ' + txt); else if (t === 'H3' || t === 'H4') out.push('### ' + txt);
      else if (t === 'UL' || t === 'OL') out.push([...el.querySelectorAll('li')].map(li => '- ' + li.textContent.trim()).join('\n'));
      else if (t === 'BLOCKQUOTE') out.push('> ' + txt);
      else if (t === 'P') out.push(el.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim());
      else if (txt) out.push(txt);
    });
    if (!out.length && body.textContent.trim()) out.push(body.textContent.trim());
    return out.filter(Boolean).join('\n\n');
  }
  function textToHtml(text) {
    return String(text || '').replace(/\r/g, '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).map(b => {
      if (/^### /.test(b)) return `<h3>${esc(b.slice(4))}</h3>`;
      if (/^## /.test(b)) return `<h2>${esc(b.slice(3))}</h2>`;
      if (/^> /.test(b)) return `<blockquote>${esc(b.slice(2))}</blockquote>`;
      const lines = b.split('\n');
      if (lines.every(l => /^- /.test(l))) return `<ul>${lines.map(l => `<li>${esc(l.slice(2))}</li>`).join('')}</ul>`;
      return `<p>${lines.map(esc).join('<br>')}</p>`;
    }).join('');
  }

  Object.assign(CMS, { htmlToText, textToHtml, parseVideo, videoError, PLATFORM_LABEL, sanitize, proseCSS, slugify, textOf, uid, clone, esc, defaults: { home: defaultHome, site: defaultSite } });
  window.AyeshaCMS = CMS;
})();
