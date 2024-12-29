import { useState, useEffect, useCallback } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false; // Changed to false to prevent multiple results
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Set language explicitly
      
      recognition.onstart = () => {
        setError(null);
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };
      
      recognition.onerror = (event) => {
        switch (event.error) {
          case 'no-speech':
            setError('No speech was detected. Please try again.');
            break;
          case 'audio-capture':
            setError('No microphone was found. Ensure it is plugged in and allowed.');
            break;
          case 'not-allowed':
            setError('Microphone permission was denied. Please allow access.');
            break;
          default:
            setError('An error occurred with speech recognition.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Automatically restart if we're still supposed to be listening
        if (isListening && !error) {
          recognition.start();
        }
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      setError(null);
      try {
        recognition.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: !!recognition
  };
}