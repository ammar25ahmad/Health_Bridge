import { chatWithLLM, ragQuery } from '../services/llm.service.js';
import { runAgent } from '../agent/healthResourceAgent.js';

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const answer = await chatWithLLM(message);
    res.json({ success: true, data: { answer } });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'AI service error' });
  }
};

export const ragChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const result = await ragQuery(message);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('RAG error:', error);
    res.status(500).json({ success: false, message: 'RAG service error' });
  }
};

export const agentChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const result = await runAgent(message);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({ success: false, message: 'Agent service error' });
  }
};
