import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getVocabularyWord = async () => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash',

       generationConfig: {
      temperature: 0.9, // add randomness to avoid repeated words
      topK: 40,
      topP: 0.9,
    },
   });

  const prompt = `
You are an intelligent vocabulary generator. Provide exactly ONE NEW English vocabulary word in the strict JSON format below. Avoid repeating previously used words and ensure the word is uncommon but useful.

Return ONLY the following format, with no markdown, no comments, no explanation, and no extra text:

{
  "word": "alleviate",
  "meaning": "To make pain, problems, or suffering less severe.",
  "difficulty": "medium",
  "type": "verb",
  "examples": [
    "The doctor gave her medicine to alleviate the pain.",
    "Yoga can help alleviate stress.",
    "Policies were introduced to alleviate poverty in rural areas."
  ]
}
🟢 Rules:
- Difficulty must be one of: easy, medium, hard.
- Type should be one of: noun, verb, adjective, adverb, etc.
- Examples should be real-life and complete, grammatically correct sentences.
- Do NOT include any explanation outside the JSON.
- Do NOT wrap JSON in markdown (no triple backticks or text).
- Do NOT add extra commentary.
- Always return only the plain JSON object.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    
    let jsonText = response.text().trim();

    console.log(jsonText);
    // Sanitize if markdown was added (safety fallback)
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json|```/g, '').trim();
    }


    const res = JSON.parse(jsonText);
    console.log('✅ Parsed vocabulary object:\n', res);
    return  res;
  } catch (error) {
    console.error('❌ Gemini error:', error);
    throw new Error('Failed to fetch vocabulary word from Gemini.');
  }
};
