import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KB_PATH = path.join(__dirname, '..', '..', '..', 'rag', 'knowledge-base');

export function loadKnowledgeBase() {
  const docs = [];
  try {
    const files = fs.readdirSync(KB_PATH).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(KB_PATH, file), 'utf-8');
      docs.push({ filename: file, content });
    }
  } catch (error) {
    console.error('Error loading knowledge base:', error.message);
  }
  return docs;
}

export function chunkDocument(doc, chunkSize = 500, overlap = 100) {
  const chunks = [];
  const words = doc.content.split(/\s+/);
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim().length > 20) {
      chunks.push({ filename: doc.filename, text: chunk });
    }
  }
  return chunks;
}

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function buildTF(chunks) {
  const allTokens = new Set();
  const chunkTokens = chunks.map(c => {
    const tokens = tokenize(c.text);
    tokens.forEach(t => allTokens.add(t));
    return tokens;
  });
  const vocab = [...allTokens];
  const tfidfVectors = chunkTokens.map(tokens => {
    const freq = {};
    tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
    return vocab.map(word => (freq[word] || 0) / tokens.length);
  });
  return { vocab, tfidfVectors };
}

export function retrieveRelevantChunks(query, topK = 3) {
  const docs = loadKnowledgeBase();
  if (docs.length === 0) return [];

  const allChunks = [];
  for (const doc of docs) {
    allChunks.push(...chunkDocument(doc));
  }
  if (allChunks.length === 0) return [];

  const { vocab, tfidfVectors } = buildTF(allChunks);
  const queryTokens = tokenize(query);
  const queryVec = vocab.map(word => {
    const count = queryTokens.filter(t => t === word).length;
    return count / Math.max(queryTokens.length, 1);
  });

  const scored = allChunks.map((chunk, i) => ({
    ...chunk,
    score: cosineSimilarity(queryVec, tfidfVectors[i]),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
