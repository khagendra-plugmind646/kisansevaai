interface EnvConfig {
  OPENAI_API_KEY: string;
}

export function getEnvConfig(): EnvConfig {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file');
  }

  return {
    OPENAI_API_KEY: apiKey
  };
}