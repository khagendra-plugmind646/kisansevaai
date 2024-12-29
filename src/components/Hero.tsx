import React from 'react';
import { Mic } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Smart Farming with
              <span className="text-green-600"> Voice Assistance</span>
            </h1>
            <p className="text-xl text-gray-600">
              Revolutionizing agriculture with AI-powered soil analysis, personalized recommendations, and voice-assisted crop management.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>Try Voice Assistant</span>
              </button>
              <button 
                onClick={onGetStarted}
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
              alt="Smart Farming"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}