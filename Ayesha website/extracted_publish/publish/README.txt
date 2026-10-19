AYESHA AMIN PORTFOLIO — PUBLISH PACKAGE

Upload everything in this folder to the root of your web host (Netlify, Vercel, GitHub Pages, cPanel, Hostinger, etc). Keep the folder structure intact.

index.html        Public portfolio website (homepage, blog, pages)
admin.html        Admin dashboard  (yoursite.com/admin.html)
support.js        Runtime required by both pages
cms/cms-core.js   Content storage + publishing logic
assets/           Logo and images

Admin login
  Password:       Maimoo00@n
  Recovery code:  AYESHA-7KQ2-M9XD
  Change both before going live.

Important
- Content is stored in the browser (localStorage). Edits made in admin.html are only visible in the same browser on the same domain. To make edits visible to every visitor, connect a backend (Supabase, Firebase, or similar).
- Contact form needs a form service (e.g. Formspree) to deliver messages.
- The site must be served over http(s); opening index.html directly from disk may block some features.
- Netlify quick deploy: drag this folder onto app.netlify.com/drop.
