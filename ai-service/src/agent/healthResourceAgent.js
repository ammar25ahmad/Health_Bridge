import { searchResources } from './tools/searchResources.js';
import { searchArticles } from './tools/searchArticles.js';
import { getResourceCategories } from './tools/getCategories.js';
import { AGENT_SYSTEM_PROMPT } from '../prompts/healthPrompts.js';

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

export async function runAgent(message) {
  const toolCalls = [];
  const searchQuery = extractSearchQuery(message);
  const category = detectCategory(message);

  const resources = await searchResources(searchQuery, category);
  toolCalls.push({
    tool: 'search_resources',
    query: searchQuery,
    category: category || 'all',
    resultCount: resources.length,
  });

  const articles = await searchArticles(searchQuery, category ? category.split(' ')[0] : null);
  toolCalls.push({
    tool: 'search_health_articles',
    query: searchQuery,
    resultCount: articles.length,
  });

  const categories = getResourceCategories();
  toolCalls.push({
    tool: 'get_resource_categories',
    resultCount: categories.length,
  });

  let answer = '';
  if (resources.length > 0 || articles.length > 0) {
    answer = `I found ${resources.length} resource(s) and ${articles.length} article(s) related to "${searchQuery}".\n\n`;

    if (resources.length > 0) {
      answer += '**Health Resources:**\n';
      resources.forEach((r, i) => {
        answer += `${i + 1}. **${r.name}** (${r.category})`;
        if (r.location) answer += ` - ${r.location}`;
        if (r.contactInformation) answer += ` | Contact: ${r.contactInformation}`;
        if (r.availability) answer += ` | Hours: ${r.availability}`;
        answer += '\n';
      });
      answer += '\n';
    }

    if (articles.length > 0) {
      answer += '**Related Educational Articles:**\n';
      articles.forEach((a, i) => {
        answer += `${i + 1}. **${a.title}** (${a.category})`;
        if (a.summary) answer += ` - ${a.summary}`;
        answer += '\n';
      });
    }

    answer += '\nPlease contact the resource directly for the most up-to-date information.';
  } else {
    answer = `I couldn't find specific resources matching "${searchQuery}". Here are the available categories you can search within:\n\n`;
    categories.forEach(c => {
      answer += `- **${c.name}**: ${c.description}\n`;
    });
    answer += '\nTry searching for one of these categories, or rephrase your query.';
  }

  answer += '\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.';

  return { answer, resources, articles, toolCalls };
}
