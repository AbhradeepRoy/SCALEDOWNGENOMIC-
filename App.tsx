
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ArchitectureView from './components/ArchitectureView';
import RoadmapView from './components/RoadmapView';
import Workspace from './components/Workspace';
import Visualizer from './components/Visualizer';
import BoilerplateView from './components/BoilerplateView';
import VideoLab from './components/VideoLab';
import GeneBot from './components/GeneBot';
import OnboardingSummary from './components/OnboardingSummary';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.ARCHITECTURE);
  const [isDark, setIsDark] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    // Show summary on first load if not dismissed before
    const hasSeenSummary = localStorage.getItem('scaledown_onboarding_seen');
    if (!hasSeenSummary) {
      setShowSummary(true);
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  const closeSummary = () => {
    setShowSummary(false);
    localStorage.setItem('scaledown_onboarding_seen', 'true');
  };

  const openSummary = () => setShowSummary(true);

  const renderView = () => {
    switch (currentView) {
      case ViewMode.ARCHITECTURE:
        return <ArchitectureView />;
      case ViewMode.ROADMAP:
        return <RoadmapView />;
      case ViewMode.WORKSPACE:
        return <Workspace />;
      case ViewMode.VISUALIZER:
        return <Visualizer />;
      case ViewMode.VIDEO_LAB:
        return <VideoLab />;
      case ViewMode.BOILERPLATE:
        return <BoilerplateView />;
      default:
        return <ArchitectureView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 ml-64 relative overflow-y-auto h-screen scroll-smooth">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 dark:bg-purple-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        {/* Help button to re-open summary */}
        <button 
          onClick={openSummary}
          className="absolute top-6 right-6 z-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Quick Help</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
        </button>

        <div className="h-full">
          {renderView()}
        </div>
      </main>

      <GeneBot />
      {showSummary && <OnboardingSummary onClose={closeSummary} />}
    </div>
  );
};

export default App;
