import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import VoiceAssistant from './components/VoiceAssistant';
import OnboardingForm from './components/OnboardingForm';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <VoiceAssistant />
      {showOnboarding && <OnboardingForm onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}

export default App;