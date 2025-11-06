
import React, { useState } from 'react';
import { KnowledgeLevel, LearningStyle, LearningPlan } from './types';
import { generateLearningPlan } from './services/geminiService';

import Header from './components/Header';
import Footer from './components/Footer';
import StepIndicator from './components/StepIndicator';
import TopicStep from './components/TopicStep';
import KnowledgeLevelStep from './components/KnowledgeLevelStep';
import LearningStyleStep from './components/LearningStyleStep';
import LoadingScreen from './components/LoadingScreen';
import PlanResult from './components/PlanResult';

type AppState = 'topic' | 'level' | 'style' | 'loading' | 'result' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('topic');
  const [topic, setTopic] = useState('');
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel | null>(null);
  const [learningStyles, setLearningStyles] = useState<LearningStyle[]>([]);
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRestart = () => {
    setAppState('topic');
    setTopic('');
    setKnowledgeLevel(null);
    setLearningStyles([]);
    setLearningPlan(null);
    setError(null);
  };

  const handleTopicSubmit = (submittedTopic: string) => {
    setTopic(submittedTopic);
    setAppState('level');
  };

  const handleLevelSelect = (selectedLevel: KnowledgeLevel) => {
    setKnowledgeLevel(selectedLevel);
    setAppState('style');
  };

  const handleGeneratePlan = async (selectedStyles: LearningStyle[]) => {
    setLearningStyles(selectedStyles);
    setAppState('loading');
    setError(null);

    if (!topic || !knowledgeLevel) {
      setError("Something went wrong. Please start over.");
      setAppState('error');
      return;
    }

    try {
      const plan = await generateLearningPlan(topic, knowledgeLevel, selectedStyles);
      setLearningPlan(plan);
      setAppState('result');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      setAppState('error');
    }
  };

  const renderContent = () => {
    const currentStepNumber = appState === 'topic' ? 1 : appState === 'level' ? 2 : 3;

    if (appState === 'topic' || appState === 'level' || appState === 'style') {
      return (
        <div className="w-full">
            <StepIndicator currentStep={currentStepNumber} />
            {appState === 'topic' && <TopicStep onNext={handleTopicSubmit} />}
            {appState === 'level' && <KnowledgeLevelStep onSelect={handleLevelSelect} />}
            {appState === 'style' && <LearningStyleStep onGenerate={handleGeneratePlan} />}
        </div>
      );
    }

    switch (appState) {
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return learningPlan ? <PlanResult plan={learningPlan} onRestart={handleRestart} /> : null;
      case 'error':
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button onClick={handleRestart} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700">
      <Header onRestart={handleRestart} showRestart={appState === 'result'} />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
