import React, { useEffect } from 'react';
import { Mic, MicOff, Loader, XCircle } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useAIResponse } from '../hooks/useAIResponse';

export default function VoiceAssistant() {
  const {
    isListening,
    transcript,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useSpeechRecognition();

  const {
    isProcessing,
    response,
    error: aiError,
    processQuery
  } = useAIResponse();

  // Auto-stop listening when we have a transcript
  useEffect(() => {
    if (transcript && isListening) {
      stopListening();
    }
  }, [transcript, isListening, stopListening]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleProcessInput = async () => {
    if (transcript) {
      await processQuery(transcript);
    }
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-red-50 text-red-600 rounded-lg shadow-lg p-4">
          Voice recognition is not supported in your browser.
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Voice Assistant</h3>
          <div className="flex gap-2">
            {transcript && (
              <button
                onClick={resetTranscript}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Clear"
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            )}
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {isListening && (
          <div className="mb-4 text-center text-sm text-gray-600">
            Listening... Speak now
          </div>
        )}

        {speechError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {speechError}
          </div>
        )}
        
        {transcript && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">You said:</p>
            <p className="text-gray-900">{transcript}</p>
            {!isProcessing && (
              <button
                onClick={handleProcessInput}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
              >
                Get Answer
              </button>
            )}
          </div>
        )}
        
        {isProcessing && (
          <div className="flex items-center justify-center py-2">
            <Loader className="h-5 w-5 text-green-600 animate-spin" />
          </div>
        )}
        
        {aiError && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {aiError}
          </div>
        )}
        
        {response && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Assistant:</p>
            <p className="text-gray-900">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}