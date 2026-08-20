import { searchResources } from './tools/searchResources.js';
import { searchArticles } from './tools/searchArticles.js';
import { getResourceCategories } from './tools/getCategories.js';

const CATEGORY_MAP = {
  vaccination: 'Vaccination Centers',
  vaccine: 'Vaccination Centers',
  immunization: 'Vaccination Centers',
  clinic: 'Clinics',
  doctor: 'Clinics',
  emergency: 'Emergency Contacts',
  'emergency contacts': 'Emergency Contacts',
  mental: 'Mental Wellness',
  counseling: 'Mental Wellness',
  therapy: 'Mental Wellness',
  preventive: 'Preventive Care',
  screening: 'Preventive Care',
  checkup: 'Preventive Care',
  program: 'Public Health Programs',
  community: 'Public Health Programs',
};

function detectCategory(message) {
  const lower = message.toLowerCase();
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return category;
  }
  return null;
}

function extractSearchQuery(message) {
  const lower = message.toLowerCase();
  const prefixes = ['i need', 'find', 'search for', 'looking for', 'show me', 'get me', 'where can i find'];
  let query = message;
  for (const prefix of prefixes) {
    if (lower.startsWith(prefix)) {
      query = message.slice(prefix.length).trim();
      break;
    }
  }
  return query;
}

const AGENT_LLM_PROMPT = `You are HealthBridge's Health Resource Agent. You help users find health resources, articles, and information.

RULES:
1. Use the tool results provided below to answer the user's question
2. Present resources and articles in a clear, organized way
3. Include relevant contact information, location, and availability
4. If no results were found, suggest broadening the search or trying different keywords
5. Always end with the health disclaimer
6. Use natural, conversational language

DISCLAIMER: "HealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice."`;

function buildToolContext(resources, articles, categories) {
  let context = '';
  if (resources.length > 0) {
    context += 'FOUND RESOURCES:\n';
    resources.forEach((r, i) => {
      context += `${i + 1}. Name: ${r.name}\n   Category: ${r.category}\n   Description: ${r.description}\n`;
      if (r.location) context += `   Location: ${r.location}\n`;
      if (r.contactInformation) context += `   Contact: ${r.contactInformation}\n`;
      if (r.availability) context += `   Hours: ${r.availability}\n`;
      context += '\n';
    });
  }
  if (articles.length > 0) {
    context += 'FOUND ARTICLES:\n';
    articles.forEach((a, i) => {
      context += `${i + 1}. Title: ${a.title}\n   Category: ${a.category}\n`;
      if (a.summary) context += `   Summary: ${a.summary}\n`;
      context += '\n';
    });
  }
  context += `AVAILABLE CATEGORIES: ${categories.map(c => c.name).join(', ')}\n`;
  return context;
}

function buildFallbackResponse(message, resources, articles, categories) {
  const answer = [];
  if (resources.length > 0 || articles.length > 0) {
    answer.push(`I found ${resources.length} resource(s) and ${articles.length} article(s) related to your query.`);
    if (resources.length > 0) {
      answer.push('\n**Health Resources:**');
      resources.forEach((r, i) => {
        let line = `${i + 1}. **${r.name}** (${r.category})`;
        if (r.location) line += ` — ${r.location}`;
        if (r.contactInformation) line += ` | Contact: ${r.contactInformation}`;
        if (r.availability) line += ` | Hours: ${r.availability}`;
        answer.push(line);
      });
    }
    if (articles.length > 0) {
      answer.push('\n**Related Articles:**');
      articles.forEach((a, i) => {
        let line = `${i + 1}. **${a.title}** (${a.category})`;
        if (a.summary) line += ` — ${a.summary}`;
        answer.push(line);
      });
    }
    answer.push('\nPlease contact the resource directly for the most up-to-date information.');
  } else {
    answer.push(`I couldn't find specific resources matching your query. Here are the available categories you can search within:\n`);
    categories.forEach(c => {
      answer.push(`- **${c.name}**: ${c.description}`);
    });
    answer.push('\nTry searching for one of these categories, or rephrase your query.');
  }
  answer.push('\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.');
  return answer.join('\n');
}

export async function runAgent(message) {
  const searchQuery = extractSearchQuery(message);
  const category = detectCategory(message);

  const resources = await searchResources(searchQuery, category);
  const articles = await searchArticles(searchQuery, category ? category.split(' ')[0] : null);
  const categories = getResourceCategories();

  const toolCalls = [
    { tool: 'search_resources', query: searchQuery, category: category || 'all', resultCount: resources.length },
    { tool: 'search_health_articles', query: searchQuery, resultCount: articles.length },
    { tool: 'get_resource_categories', resultCount: categories.length },
  ];

  const context = buildToolContext(resources, articles, categories);

  let answer;
  try {
    const { callGemini } = await import('../services/llm.service.js');
    const userPrompt = `USER QUERY: ${message}\n\n${context}`;
    answer = await callGemini(AGENT_LLM_PROMPT, userPrompt);
  } catch (error) {
    answer = buildFallbackResponse(message, resources, articles, categories);
  }

  return { answer, resources, articles, toolCalls };
}
