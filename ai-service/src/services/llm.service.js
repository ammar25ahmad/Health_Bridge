import { HEALTH_SYSTEM_PROMPT, RAG_SYSTEM_PROMPT } from '../prompts/healthPrompts.js';
import { retrieveRelevantChunks } from './rag.service.js';

const LLM_API_KEY = process.env.LLM_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function callGemini(systemPrompt, userMessage) {
  if (!LLM_API_KEY) {
    return generateFallbackResponse(userMessage, systemPrompt === RAG_SYSTEM_PROMPT);
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': LLM_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return generateFallbackResponse(userMessage, systemPrompt === RAG_SYSTEM_PROMPT);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || generateFallbackResponse(userMessage, false);
  } catch (error) {
    console.error('Gemini call failed:', error.message);
    return generateFallbackResponse(userMessage, systemPrompt === RAG_SYSTEM_PROMPT);
  }
}

function generateFallbackResponse(message, useRag = false) {
  const lower = message.toLowerCase();

  if (lower.includes('diagnos') || lower.includes('do i have') || lower.includes('am i sick')) {
    return `I understand your concern, but I cannot diagnose medical conditions. HealthBridge provides general educational information only.\n\nPlease consult a qualified healthcare professional who can properly evaluate your symptoms and provide personalized medical advice.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('emergency') || lower.includes('chest pain') || lower.includes('can\'t breathe') || lower.includes('unconscious')) {
    return `If you or someone near you is experiencing a medical emergency, please call emergency services (911) immediately. Do not rely on online information for emergencies.\n\nHealthBridge provides general educational information and is not a substitute for emergency medical services.`;
  }

  if (lower.includes('hypertension') || lower.includes('blood pressure')) {
    return `**Understanding Hypertension Prevention**\n\nHypertension (high blood pressure) is a common condition that can be managed through lifestyle changes:\n\n1. **Diet**: Eat fruits, vegetables, whole grains. Limit salt to less than 2,300mg/day\n2. **Exercise**: At least 150 minutes of moderate activity per week\n3. **Weight**: Maintain a healthy BMI (18.5-24.9)\n4. **Limit alcohol**: No more than 1-2 drinks per day\n5. **Manage stress**: Practice relaxation techniques\n6. **Regular monitoring**: Check blood pressure regularly\n\nThese are general educational guidelines. Please consult a healthcare professional for personalized advice.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('vaccin') || lower.includes('immuniz')) {
    return `**Vaccination Basics**\n\nVaccines help your immune system learn to fight specific diseases. Key points:\n\n- Vaccines contain weakened or inactive parts of a germ\n- They train your body to recognize and fight infections\n- Community immunity protects those who cannot be vaccinated\n- Common vaccines include flu, COVID-19, MMR, and tetanus\n- Many vaccines are available at no cost through public health programs\n\nFor personalized vaccination advice, consult your healthcare provider.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('nutrition') || lower.includes('diet') || lower.includes('food') || lower.includes('eat')) {
    return `**Healthy Nutrition Habits**\n\nGood nutrition supports overall health:\n\n1. Eat 5+ servings of fruits and vegetables daily\n2. Choose whole grains over refined grains\n3. Include lean proteins (fish, chicken, beans, nuts)\n4. Limit processed foods and added sugars\n5. Stay hydrated with 6-8 glasses of water daily\n6. Practice portion control\n\nA balanced diet is the foundation of good health.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('hygiene') || lower.includes('hand washing') || lower.includes('clean')) {
    return `**Hand Hygiene Importance**\n\nProper hand hygiene prevents the spread of infections:\n\n- Wash hands for at least 20 seconds with soap and water\n- Wash before eating, after using the bathroom, and after coughing/sneezing\n- Use hand sanitizer (60%+ alcohol) when soap isn't available\n- Handwashing can reduce respiratory infections by 16-21%\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('first aid') || lower.includes('burn') || lower.includes('wound') || lower.includes('cut')) {
    return `**First Aid Basics**\n\nEssential first aid knowledge:\n\n- For minor cuts: Clean with water, apply ointment, bandage\n- For burns: Cool under running water for 10-20 minutes, don't apply ice\n- For choking: Perform abdominal thrusts (Heimlich maneuver)\n- For severe bleeding: Apply firm, direct pressure\n\nAlways seek professional medical help for serious injuries.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('mental') || lower.includes('stress') || lower.includes('anxiety') || lower.includes('depression')) {
    return `**Mental Health & Stress Management**\n\nMental health is just as important as physical health. Here are some helpful strategies:\n\n1. **Stay connected**: Maintain relationships with friends and family\n2. **Exercise regularly**: Physical activity helps reduce stress and anxiety\n3. **Practice mindfulness**: Meditation and deep breathing can calm the mind\n4. **Get enough sleep**: Aim for 7-9 hours per night\n5. **Set boundaries**: Learn to say no to avoid burnout\n6. **Seek help**: Talk to a mental health professional if needed\n\nMany communities offer free or low-cost mental health services. Don't hesitate to reach out.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('exercise') || lower.includes('fitness') || lower.includes('workout') || lower.includes('physical activity')) {
    return `**Exercise & Physical Activity Guidelines**\n\nRegular physical activity is one of the best things you can do for your health:\n\n- **Adults**: At least 150 minutes of moderate activity per week (e.g., brisk walking)\n- **Or**: 75 minutes of vigorous activity per week (e.g., running)\n- **Plus**: Strength training 2+ days per week\n\nBenefits of regular exercise:\n- Reduces risk of heart disease, diabetes, and some cancers\n- Improves mood and mental health\n- Helps maintain a healthy weight\n- Strengthens bones and muscles\n- Improves sleep quality\n\nStart slow and gradually increase intensity. Any movement is better than none!\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired') || lower.includes('fatigue')) {
    return `**Healthy Sleep Habits**\n\nQuality sleep is essential for physical and mental health:\n\n- **Adults need 7-9 hours** of sleep per night\n- **Keep a consistent schedule**: Go to bed and wake up at the same time daily\n- **Create a good environment**: Dark, cool, and quiet room\n- **Limit screens**: Avoid phones/computers 1 hour before bed\n- **Avoid caffeine**: After 2 PM if possible\n- **Exercise earlier**: But not close to bedtime\n\nIf you consistently struggle with sleep, consider consulting a healthcare professional.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('pregnant') || lower.includes('pregnancy') || lower.includes('prenatal') || lower.includes('maternal')) {
    return `**Prenatal Health Information**\n\nHealthy pregnancy practices for expecting mothers:\n\n- **Prenatal care**: Start regular checkups early\n- **Folic acid**: Take 400-800mcg daily, especially in the first trimester\n- **Nutrition**: Eat a balanced diet rich in iron, calcium, and protein\n- **Stay active**: Safe exercises include walking and prenatal yoga\n- **Avoid**: Alcohol, tobacco, and excessive caffeine\n- **Rest**: Get adequate sleep and manage stress\n\nAlways consult your obstetrician or midwife for personalized prenatal advice.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  if (lower.includes('diabetes') || lower.includes('sugar') || lower.includes('glucose')) {
    return `**Understanding Diabetes Prevention**\n\nDiabetes is a condition that affects how your body processes blood sugar. Here are key prevention strategies:\n\n1. **Maintain a healthy weight**: Being overweight increases risk\n2. **Eat balanced meals**: Focus on whole grains, vegetables, and lean proteins\n3. **Exercise regularly**: At least 150 minutes per week\n4. **Monitor blood sugar**: Especially if you have risk factors\n5. **Limit sugary drinks**: Water is always the best choice\n6. **Get regular checkups**: Early detection is key\n\nRisk factors include family history, age, and lifestyle. Talk to your doctor about screening.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
  }

  return `I can help you learn about health topics. Here are some things I can explain:\n\n- Vaccination basics\n- Healthy nutrition habits\n- Hand hygiene and cleanliness\n- First aid principles\n- Preventive healthcare\n- Mental health and stress management\n- Exercise and fitness guidelines\n- Sleep hygiene\n- Diabetes prevention\n- Maternal health\n\nPlease ask a specific health education question, and I'll provide general educational information.\n\nHealthBridge provides general educational information and is not a medical diagnosis or a substitute for professional medical advice.`;
}

export async function chatWithLLM(message) {
  return callGemini(HEALTH_SYSTEM_PROMPT, message);
}

export async function ragQuery(message) {
  const chunks = retrieveRelevantChunks(message, 3);
  const sources = [...new Set(chunks.map(c => c.filename))];
  const context = chunks.map(c => c.text).join('\n\n---\n\n');

  const prompt = context
    ? `Use the following knowledge base documents to answer the question. Base your answer primarily on this information.\n\nKNOWLEDGE BASE:\n${context}\n\nQUESTION: ${message}`
    : `No relevant knowledge base documents were found for this question. Provide general educational information if possible.\n\nQUESTION: ${message}`;

  const answer = await callGemini(RAG_SYSTEM_PROMPT, prompt);
  return { answer, sources };
}
