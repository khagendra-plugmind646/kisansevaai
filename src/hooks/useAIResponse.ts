import { useState } from 'react';
import { getAIResponse } from '../services/openai';

export function useAIResponse() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processQuery = async (query: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const aiResponse = await getAIResponse(query);
      setResponse(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process your query. Please try again.');
      console.error('AI Processing Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    response,
    error,
    processQuery
  };
}