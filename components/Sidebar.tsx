
import React from 'react';
import { 
  Dna, 
  Layers, 
  Calendar, 
  Terminal, 
  Activity, 
  ChevronRight,
  FlaskConical,
  Video,
  Sun,
  Moon,
  HelpCircle
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isDark, toggleTheme }) => {
  const sections = [
    {
      title: "Core Platform",
      items: [
        { id: ViewMode.ARCHITECTURE, label: 'Architecture', icon: Layers, desc: 'Engine logic' },
        { id: ViewMode.WORKSPACE, label: 'Discovery Lab', icon: FlaskConical, desc: 'AI Synthesis' },
        { id: ViewMode.VISUALIZER, label: 'Multi-Omics', icon: Activity, desc: 'Data Mapping' },
      ]
    },
    {
      title: "Resources",
      items: [
        { id: ViewMode.VIDEO_LAB, label: 'Education Lab', icon: Video, desc: '3D Animations' },
        { id: ViewMode.BOILERPLATE, label: 'Python SDK', icon: Terminal, desc: 'Code Engine' },
        { id: ViewMode.ROADMAP, label: 'Roadmap', icon: Calendar, desc: 'Dev Progress' },
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 z-50 transition-colors shadow-xl">
      <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <Dna className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">ScaleDown</h1>
            <p className="text-[10px] text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest mt-1">Research v2.5</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`w-full group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border ${
                    currentView === item.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    currentView === item.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500/10'
                  }`}>
                    <item.icon size={18} className={currentView === item.id ? 'text-white' : 'group-hover:text-blue-500'} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold leading-none">{item.label}</p>
                    <p className={`text-[10px] mt-1 font-medium ${currentView === item.id ? 'text-blue-100' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        >
          <div className="flex items-center gap-3">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-bold">{isDark ? 'Light' : 'Dark'} Mode</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-300'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isDark ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </button>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Systems Active</span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">ScaleDown Node: 0x9f...a2<br/>Latent Sync: 99.8%</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
