
import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { RoadmapStep } from '../types';

const RoadmapView: React.FC = () => {
  const roadmap: RoadmapStep[] = [
    { day: 1, title: 'Foundational Ingestion', status: 'completed', tasks: ['Ensembl REST Wrapper', 'NCBI Entrez API integration', 'Variant Data Normalization'] },
    { day: 2, title: 'Semantic Compression Engine', status: 'current', tasks: ['Latent space vectorization for SNPs', 'Token reduction logic (85% target)', 'Clumping & Pruning algorithms'] },
    { day: 3, title: 'Context Management', status: 'upcoming', tasks: ['Hierarchical summarization for 10k genes', 'Sliding window alignment logic', 'Memory-efficient sequence chunking'] },
    { day: 4, title: 'Functional Predictors', status: 'upcoming', tasks: ['Custom VEP implementation', 'Pathway enrichment automation', 'SIFT/PolyPhen score integration'] },
    { day: 5, title: 'Reasoning Layer', status: 'upcoming', tasks: ['Multi-omics synthesis pipeline', 'Hypothesis generation prompts', 'Scientific citation cross-ref'] },
    { day: 6, title: 'Visual Synthesis', status: 'upcoming', tasks: ['Plotly-based Manhattan plots', 'Circos mapping implementation', 'Network topology visualization'] },
    { day: 7, title: 'Stress Testing & QA', status: 'upcoming', tasks: ['Benchmarking against benchmark sets', 'End-to-end multi-omics validation', 'ScaleDown Final Synthesis'] },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-2">7-Day Sprint Roadmap</h2>
        <p className="text-slate-400">Engineering the ScaleDown Bioinformatics Engine</p>
      </div>

      <div className="relative border-l-2 border-slate-700 ml-4 space-y-12">
        {roadmap.map((step) => (
          <div key={step.day} className="relative pl-10">
            {/* Timeline Marker */}
            <div className={`absolute -left-[21px] top-0 p-1 rounded-full border-4 border-[#0f172a] transition-colors ${
              step.status === 'completed' ? 'bg-green-500' : 
              step.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'
            }`}>
              {step.status === 'completed' ? <CheckCircle2 size={16} className="text-white" /> : 
               step.status === 'current' ? <Clock size={16} className="text-white" /> : <Circle size={16} className="text-slate-400" />}
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              step.status === 'current' ? 'bg-blue-900/20 border-blue-500/50 shadow-lg shadow-blue-500/10' : 'bg-slate-800 border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Day {step.day}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  step.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  step.status === 'current' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-500'
                }`}>
                  {step.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <ul className="space-y-3">
                {step.tasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className={`w-1.5 h-1.5 rounded-full ${step.status === 'completed' ? 'bg-green-500' : 'bg-slate-600'}`} />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;
