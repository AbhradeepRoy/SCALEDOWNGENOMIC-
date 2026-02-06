
import React, { useState, useEffect } from 'react';
import { Video, Play, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { ScaleDownAI } from '../services/geminiService';

const VideoLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // Check for API key and prompt selection
    // @ts-ignore
    if (typeof window.aistudio !== 'undefined' && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    
    const ai = new ScaleDownAI();
    try {
      const url = await ai.generateEducationalVideo(prompt);
      setVideoUrl(url);
    } catch (e: any) {
      setError(e.message || "Failed to generate video. Please ensure you have selected a paid API key.");
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    "CRISPR-Cas9 Mechanism",
    "Mendelian Inheritance",
    "DNA Transcription & Translation",
    "Epigenetic Methylation",
    "Single-cell RNA Sequencing"
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-3 text-slate-900 dark:text-white">
          <Video className="text-blue-500" size={36} /> Video Education Lab
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Transform complex genomic concepts into 1080p educational animations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-500" /> Lesson Generation
            </h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a genomic topic to create an animated lesson..."
              className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none dark:text-white"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
              {loading ? 'Synthesizing Animation...' : 'Generate Animated Video'}
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Suggested Topics</h4>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setPrompt(t)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-xs transition-colors border border-slate-200 dark:border-slate-700 dark:text-slate-300"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center min-h-[400px] overflow-hidden relative">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-cover rounded-xl"
            />
          ) : loading ? (
            <div className="text-center space-y-4 p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">Rendering Animation...</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">This can take a few minutes. We're compressing complex biological structures into high-fidelity visuals.</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center space-y-4 p-8">
              <AlertCircle size={48} className="text-red-500 mx-auto" />
              <p className="text-sm text-red-500 max-w-xs">{error}</p>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-xs text-blue-500 underline">Check billing docs</a>
            </div>
          ) : (
            <div className="text-center p-8 opacity-40">
              <Video size={64} className="mx-auto mb-4" />
              <p className="text-sm font-medium">Ready to visualize genomic knowledge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLab;
