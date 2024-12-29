import React from 'react';
import { ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Voice Input',
    description: 'Simply speak to our AI assistant about your farming concerns or questions'
  },
  {
    number: '02',
    title: 'Data Analysis',
    description: 'Our AI processes your input and analyzes soil data using advanced algorithms'
  },
  {
    number: '03',
    title: 'Smart Recommendations',
    description: 'Receive personalized recommendations for fertilizers and crop management'
  },
  {
    number: '04',
    title: 'Implementation',
    description: 'Apply the recommendations and track progress through our platform'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How KisanSeva.ai Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple four-step process to transform your farming practices
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <span className="text-4xl font-bold text-green-600">{step.number}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-green-600 h-8 w-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}