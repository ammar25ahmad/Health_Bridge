import Resource from '../models/Resource.js';
import Article from '../models/Article.js';
import Question from '../models/Question.js';
import axios from 'axios';

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

const analyzeWithPython = async (resourceData) => {
  try {
    const response = await axios.post(`${PYTHON_SERVICE_URL}/analyze-resource`, {
      name: resourceData.name,
      description: resourceData.description,
      category: resourceData.category,
    }, { timeout: 5000 });
    return response.data;
  } catch (error) {
    return { category: resourceData.category, resourceType: 'Community Health Resource', relevanceScore: 0.5 };
  }
};

export const getResources = async (req, res) => {
  try {
    const { search, category, location, availability, status, limit = 50 } = req.query;
    const query = {};

    if (search) {
      query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    }
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (availability) query.availability = { $regex: availability, $options: 'i' };
    if (status) query.status = status;

    const resources = await Resource.find(query).sort({ createdAt: -1 }).limit(parseInt(limit));
    res.json({ success: true, data: { resources } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch resources' });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, data: { resource } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch resource' });
  }
};

export const createResource = async (req, res) => {
  try {
    const { name, category, description, location, contactInformation, availability } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, category, and description are required' });
    }

    const analysis = await analyzeWithPython({ name, description, category });

    const resource = await Resource.create({
      name, category, description, location, contactInformation, availability,
      createdBy: req.user.id,
      organization: req.user.name,
      analysis,
    });

    res.status(201).json({ success: true, data: { resource } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create resource' });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resource' });
    }

    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: { resource: updated } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update resource' });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resource' });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete resource' });
  }
};

export const updateResourceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const resource = await Resource.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, data: { resource } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

export const getArticles = async (req, res) => {
  try {
    const { search, category, limit = 50 } = req.query;
    const query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
    }
    if (category) query.category = category;

    const articles = await Article.find(query).sort({ createdAt: -1 }).limit(parseInt(limit));
    res.json({ success: true, data: { articles } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch articles' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: { article } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch article' });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, category, summary, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ success: false, message: 'Title, category, and content are required' });
    }
    const article = await Article.create({ title, category, summary, content });
    res.status(201).json({ success: true, data: { article } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create article' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: { article } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update article' });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete article' });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Question text is required' });
    }
    const question = await Question.create({ text, userId: req.user.id });
    res.status(201).json({ success: true, data: { question } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create question' });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).populate('userId', 'name email');
    res.json({ success: true, data: { questions } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, data: { question } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update question' });
  }
};
