
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  BrainCircuit, 
  Info, 
  AlertCircle, 
  RefreshCw, 
  Dna, 
  Microscope, 
  Database, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { ScaleDownAI } from '../services/geminiService';

const Workspace: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'hypothesis' | 'compression'>('hypothesis');
  const [copied, setCopied] = useState(false);
  const aiRef = useRef<ScaleDownAI | null>(null);

  useEffect(() => {
    aiRef.current = new ScaleDownAI();
  }, []);

  const handleAction = async (text?: string) => {
    const activeQuery = text || query;
    if (!activeQuery.trim() || !aiRef.current) return;
    
    setLoading(true);
    setResponse('');
    if (!text) setQuery('');
    
    try {
      let result = '';
      if (mode === 'hypothesis') {
        result = await aiRef.current.generateHypothesis(activeQuery);
      } else {
        result = await aiRef.current.simulateCompression(activeQuery);
      }
      setResponse(result);
    } catch (e: any) {
      setResponse("Discovery Synthesis Failed: " + (e.message || "Unknown engine error."));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templates = [
    { 
      title: "Variant Analysis", 
      icon: <Dna size={16} />, 
      prompt: "Analyze the functional impact of the missense variant rs113488022 (V600E) in the BRAF gene using VEP logic.",
      color: "blue"
    },
    { 
      title: "Disease Pleiotropy", 
      icon: <Microscope size={16} />, 
      prompt: "Predict novel pleiotropic links between Hypertension and Type 2 Diabetes based on latent GWAS signaling patterns.",
      color: "purple"
    },
    { 
      title: "Paper Synthesis", 
      icon: <FileText size={16} />, 
      prompt: "Summarize the recent multi-omics findings for Amyotrophic Lateral Sclerosis (ALS) pathogenesis, highlighting regulatory hotspots.",
      color: "emerald"
    }
  ];

  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto animate-fadeIn overflow-hidden">
      {/* Header with Mode Toggle */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-600 text-[10px] font-black text-white rounded-md uppercase tracking-tighter shadow-sm">ScaleDown v2</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Genomic Workspace</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">The intersection of Latent Logic and Biological Discovery.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner backdrop-blur-md">
          <button 
            onClick={() => setMode('hypothesis')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${mode === 'hypothesis' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-slate-200 dark:ring-slate-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Sparkles size={14} /> Hypothesis Engine
          </button>
          <button 
            onClick={() => setMode('compression')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${mode === 'compression' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-slate-200 dark:ring-slate-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Database size={14} /> Semantic Compression
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Main Display Area */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 overflow-y-auto mb-8 shadow-2xl relative custom-scrollbar ring-1 ring-slate-200/50 dark:ring-white/5">
          {response ? (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Synthesis Output</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{mode === 'hypothesis' ? 'Multi-Omics Inference' : 'Latent Feature Mapping'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyResponse} 
                    className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-600 rounded-xl transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[10px] font-bold uppercase"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Synthesis'}
                  </button>
                  <button 
                    onClick={() => { setResponse(''); setQuery(''); }} 
                    className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-xl transition-all border border-slate-200 dark:border-slate-700"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
              
              <div className="prose dark:prose-invert prose-blue max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-wrap selection:bg-blue-100 dark:selection:bg-blue-900/30">
                {response}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mb-8 relative group cursor-default">
                  <BrainCircuit size={48} className="text-slate-200 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg animate-bounce">
                    <Sparkles size={16} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Initialize Discovery</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-12">
                  Select a template below or enter a custom multi-omics query to start the ScaleDown synthesis engine.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                  {templates.map((t, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleAction(t.prompt)}
                      className="group p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                    >
                      <div className={`p-2 w-fit rounded-lg mb-4 bg-${t.color}-100 dark:bg-${t.color}-900/20 text-${t.color}-600 dark:text-${t.color}-400 group-hover:scale-110 transition-transform`}>
                        {t.icon}
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">{t.title}</h5>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {t.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md rounded-[2rem] flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                   <div className="w-20 h-20 border-[6px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
                   <Dna className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">ScaleDown Synthesis Active</p>
                  <p className="text-xs text-slate-500 font-medium animate-pulse tracking-widest uppercase">Cross-referencing multi-omics latent space...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Dock */}
        <div className="relative group max-w-5xl mx-auto w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
          <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center p-2 pr-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAction();
                }
              }}
              placeholder={mode === 'hypothesis' ? "Ask Gene to predict a gene-disease link..." : "Paste dense genomic data for semantic clumping..."}
              className="flex-1 bg-transparent border-none py-4 px-6 text-sm focus:ring-0 focus:outline-none min-h-[60px] max-h-[200px] resize-none dark:text-white font-medium"
            />
            <div className="flex items-center gap-3 pl-4 md:pl-0">
              <button
                onClick={() => handleAction()}
                disabled={loading || !query.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 active:scale-95 group/btn"
              >
                <Send size={20} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pb-4">
          <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
            <Database size={12} /> Sync: Ensembl REST v110
          </div>
          <div className="flex items-center gap-2 hover:text-purple-500 transition-colors">
            <Info size={12} /> Privacy: Local Context Encryption
          </div>
          <div className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
            <Check size={12} /> Engine: ScaleDown-Pro (Gemini 3)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
