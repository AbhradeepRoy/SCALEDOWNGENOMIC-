
import React from 'react';
import { X, Zap, Bot, Video, Layers, FlaskConical, CheckCircle } from 'lucide-react';

interface OnboardingSummaryProps {
  onClose: () => void;
}

const OnboardingSummary: React.FC<OnboardingSummaryProps> = ({ onClose }) => {
  const features = [
    {
      icon: <Layers className="text-blue-500" size={24} />,
      title: "ScaleDown Architecture",
      desc: "Deep dive into our 'Semantic Genomic Compression' logic that reduces token overhead by 85% using Genomic Embeddings."
    },
    {
      icon: <Bot className="text-purple-500" size={24} />,
      title: "Gene: Your Multilingual Assistant",
      desc: "Meet Gene, a specialized genomic bot supporting all Indian languages to help resolve your bioinformatics queries."
    },
    {
      icon: <Video className="text-red-500" size={24} />,
      title: "Genomic Video Lab",
      desc: "Generate high-fidelity animated educational videos to teach complex topics like CRISPR or Mendelian inheritance."
    },
    {
      icon: <FlaskConical className="text-green-500" size={24} />,
      title: "Discovery Workspace",
      desc: "Synthesize multi-omics data, predict variant effects (VEP), and generate novel scientific hypotheses."
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="relative p-8 overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 mb-6">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Welcome to ScaleDown</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              You've just launched the world's first high-throughput bioinformatics discovery engine powered by Semantic Compression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="shrink-0">{f.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600/5 dark:bg-blue-600/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 mb-8">
            <h5 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
              <CheckCircle size={14} /> Getting Started
            </h5>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside">
              <li>Explore the <strong>Architecture</strong> to understand our 85% token reduction logic.</li>
              <li>Use the <strong>Workspace</strong> to analyze raw genomic variants or sequences.</li>
              <li>Ask <strong>Gene</strong> (bottom right) for multilingual research assistance.</li>
              <li>Check the <strong>Video Lab</strong> to visualize complex biological mechanisms.</li>
            </ol>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
          >
            Enter the Discovery Engine
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSummary;
