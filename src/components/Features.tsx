import React from 'react';
import { Mic, FlaskConical, Brain, Sprout } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice Assistance',
    description: 'Interact naturally with our AI assistant for instant farming guidance and recommendations.'
  },
  {
    icon: FlaskConical,
    title: 'Soil Analysis',
    description: 'Get detailed soil health reports and nutrient recommendations for optimal crop growth.'
  },
  {
    icon: Brain,
    title: 'AI Predictions',
    description: 'Leverage machine learning for accurate crop disease predictions and prevention strategies.'
  },
  {
    icon: Sprout,
    title: 'Crop Management',
    description: 'Access personalized crop management plans based on your specific farming conditions.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Empowering Farmers with Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you make data-driven decisions for better yields
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <feature.icon className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}