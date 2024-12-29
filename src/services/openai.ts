import OpenAI from 'openai';
import { getEnvConfig } from '../config/env';

let openai: OpenAI | null = null;

function initializeOpenAI() {
  try {
    const { OPENAI_API_KEY } = getEnvConfig();
    
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      throw new Error('Please set a valid OpenAI API key in your .env file');
    }

    openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error('OpenAI initialization error:', error);
    throw error;
  }
}

export async function getAIResponse(prompt: string): Promise<string> {
  if (!openai) {
    initializeOpenAI();
  }

  try {
    if (!openai) {
      throw new Error('OpenAI client not initialized');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are KisanSeva.ai, an expert agricultural assistant. Provide concise, practical advice for farmers about soil health, crop management, and sustainable farming practices. Focus on actionable recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "I apologize, but I couldn't process your request. Please try again.";
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    if (error?.error?.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your .env file and ensure you have added a valid key.');
    }
    
    throw new Error('Failed to get AI response. Please try again later.');
  }
}