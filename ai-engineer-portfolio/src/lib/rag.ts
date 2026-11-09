export {
  filterProjects,
  retrieveKnowledgeChunks,
  searchSiteContent,
  calculateSkillCompatibility,
  executeMcpTool,
} from '@/utils/portfolioLogic';

/**
 * Deterministic 64-dimensional normalized vector embedding generator
 * compatible with PostgreSQL pgvector / Qdrant / Upstash Vector ingestion schemas.
 */
export function computeDeterministicEmbedding(text: string, dimensions: number = 64): number[] {
  const vec = new Array<number>(dimensions).fill(0);
  const clean = text.toLowerCase();
  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i);
    const idx = (code * 31 + i * 17) % dimensions;
    vec[idx] += 1 + (code % 7) * 0.1;
  }
  const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vec.map((v) => Number((v / norm).toFixed(4)));
}
