import {
  PersonalInfoData,
  ProjectCaseStudy,
  ArticlePost,
  TimelineItem,
  SkillGroup,
  AdminSettings,
} from '@/types/cms';

export async function fetchPortfolioBundle() {
  const res = await fetch('/api/portfolio');
  if (!res.ok) throw new Error('Failed to load portfolio bundle');
  return res.json();
}

export async function fetchAdminState() {
  const res = await fetch('/api/admin/state');
  if (!res.ok) throw new Error('Failed to load admin state');
  return res.json();
}

export async function updateAdminProfile(payload: Partial<PersonalInfoData>) {
  const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function createAdminProject(payload: Partial<ProjectCaseStudy> & { title: string; summary: string }) {
  const res = await fetch('/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateAdminProject(slug: string, payload: Partial<ProjectCaseStudy>) {
  const res = await fetch(`/api/admin/projects/${encodeURIComponent(slug)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function deleteAdminProject(slug: string) {
  const res = await fetch(`/api/admin/projects/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

export async function createAdminArticle(payload: Partial<ArticlePost> & { title: string; content: string }) {
  const res = await fetch('/api/admin/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create article');
  return res.json();
}

export async function updateAdminArticle(slug: string, payload: Partial<ArticlePost>) {
  const res = await fetch(`/api/admin/articles/${encodeURIComponent(slug)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update article');
  return res.json();
}

export async function deleteAdminArticle(slug: string) {
  const res = await fetch(`/api/admin/articles/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete article');
  return res.json();
}

export async function createAdminTimeline(payload: Partial<TimelineItem> & { institution: string; program: string }) {
  const res = await fetch('/api/admin/timeline', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create timeline entry');
  return res.json();
}

export async function deleteAdminTimeline(id: string) {
  const res = await fetch(`/api/admin/timeline/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete timeline entry');
  return res.json();
}

export async function updateAdminSkills(skillGroups: SkillGroup[]) {
  const res = await fetch('/api/admin/skills', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skillGroups }),
  });
  if (!res.ok) throw new Error('Failed to update skills');
  return res.json();
}

export async function triggerRagReindex() {
  const res = await fetch('/api/admin/reindex', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reindex RAG chunks');
  return res.json();
}

export async function updateAvailabilitySettings(
  statusText: string,
  available: boolean = true,
  extra?: { model?: string; systemPromptNote?: string; newsletterEnabled?: boolean }
) {
  const res = await fetch('/api/admin/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ statusText, available, ...(extra || {}) }),
  });
  if (!res.ok) throw new Error('Failed to update availability settings');
  return res.json();
}

export async function createAdminContentItem(payload: {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  tags: string[];
  content: string;
}) {
  const res = await fetch('/api/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create content item');
  return res.json();
}

export async function deleteAdminContentItem(id: string) {
  const res = await fetch(`/api/admin/content/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete content item');
  return res.json();
}

export async function updateAdminMessageStatus(id: string, status: 'new' | 'read' | 'replied') {
  const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update message status');
  return res.json();
}

export async function deleteAdminMessage(id: string) {
  const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return res.json();
}

export async function resetAdminStore() {
  const res = await fetch('/api/admin/reset', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset store');
  return res.json();
}

export async function subscribeToNewsletter(email: string, source: string = '/newsletter') {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok) throw new Error('Failed to subscribe');
  return res.json();
}
 statusText, available, ...extra }),
  });
  if (!res.ok) throw new Error('Failed to update availability settings');
  return res.json();
}

export async function createAdminContentItem(payload: {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  tags: string[];
  content: string;
}) {
  const res = await fetch('/api/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create content item');
  return res.json();
}

export async function deleteAdminContentItem(id: string) {
  const res = await fetch(`/api/admin/content/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete content item');
  return res.json();
}

export async function updateAdminMessageStatus(id: string, status: 'new' | 'read' | 'replied') {
  const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update message status');
  return res.json();
}

export async function deleteAdminMessage(id: string) {
  const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return res.json();
}

export async function resetAdminStore() {
  const res = await fetch('/api/admin/reset', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset store');
  return res.json();
}

export async function subscribeToNewsletter(email: string, source: string = '/newsletter') {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok) throw new Error('Failed to subscribe');
  return res.json();
}
