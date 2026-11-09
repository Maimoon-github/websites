import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  retrieveKnowledgeChunks,
  searchSiteContent,
  calculateSkillCompatibility,
  executeMcpTool,
} from './portfolioLogic';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

test('filterProjects filters Maimoon case studies by category and query', () => {
  const allProjects = filterProjects(PROJECTS, 'all');
  assert.equal(allProjects.length, 3);

  const agentProjects = filterProjects(PROJECTS, 'agents');
  assert.equal(agentProjects.length, 2);
  assert.ok(agentProjects.some((p) => p.slug === 'agentic-review-architecture'));
  assert.ok(agentProjects.some((p) => p.slug === 'ai-learning-career-coach'));

  const ragProjects = filterProjects(PROJECTS, 'rag');
  assert.equal(ragProjects.length, 1);
  assert.equal(ragProjects[0].slug, 'fullstack-ai-portfolio-rag');

  const celerySearch = filterProjects(PROJECTS, 'all', 'celery');
  assert.equal(celerySearch.length, 1);
  assert.equal(celerySearch[0].slug, 'agentic-review-architecture');
});

test('retrieveKnowledgeChunks ranks relevant chunks with context boost', () => {
  const results = retrieveKnowledgeChunks('LangGraph and CrewAI with local Ollama', undefined, 3);
  assert.equal(results.length, 3);
  assert.ok(
    results[0].url.includes('ai-learning-career-coach') ||
      results[0].url.includes('orchestrating-langgraph')
  );

  const scoped = retrieveKnowledgeChunks(
    'What is the architecture?',
    undefined,
    2,
    'work:agentic-review-architecture'
  );
  assert.equal(scoped[0].url, '/work/agentic-review-architecture');
});

test('executeMcpTool handles all 4 Model Context Protocol tools', () => {
  const avail = executeMcpTool('check_availability');
  assert.equal(avail.email, 'ideal.rhel@gmail.com');
  assert.equal(avail.phone, '03153208241');
  assert.equal(avail.name, PERSONAL_INFO.name);

  const study = executeMcpTool('get_case_study', { slug: 'ai-learning-career-coach' });
  assert.equal(study.caseStudy?.title, 'AI-Learning-Career-Coach');

  const search = executeMcpTool('search_content', { query: 'DSAAMP Ammar Tufail', topK: 2 });
  assert.equal(search.results?.length, 2);
});

test('searchSiteContent and calculateSkillCompatibility return accurate matches', () => {
  const search = searchSiteContent('NixOS');
  assert.ok(search.writing.length >= 1);

  const compat = calculateSkillCompatibility(['LangGraph', 'CrewAI', 'FastAPI', 'Qdrant']);
  assert.equal(compat.score, 100);
  assert.equal(compat.missing.length, 0);
});
