
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  Legend,
  Info
} from 'recharts';
import { HelpCircle, ChevronRight, Zap, Target, Layers } from 'lucide-react';

const data = [
  { gene: 'BRCA1', expression: 85, impact: 0.92, pValue: 0.00001, chr: 17, pos: 43044295, level: 'High' },
  { gene: 'TP53', expression: 45, impact: 0.88, pValue: 0.00003, chr: 17, pos: 7661779, level: 'High' },
  { gene: 'EGFR', expression: 92, impact: 0.74, pValue: 0.00012, chr: 7, pos: 55019017, level: 'Moderate' },
  { gene: 'MYC', expression: 120, impact: 0.65, pValue: 0.000001, chr: 8, pos: 127735434, level: 'Moderate' },
  { gene: 'PTEN', expression: 30, impact: 0.82, pValue: 0.00005, chr: 10, pos: 87863113, level: 'High' },
  { gene: 'APC', expression: 55, impact: 0.42, pValue: 0.0012, chr: 5, pos: 112707430, level: 'Low' },
  { gene: 'VHL', expression: 65, impact: 0.96, pValue: 0.000005, chr: 3, pos: 10141611, level: 'High' },
  { gene: 'RB1', expression: 40, impact: 0.78, pValue: 0.0002, chr: 13, pos: 48303751, level: 'Moderate' },
  { gene: 'KRAS', expression: 110, impact: 0.85, pValue: 0.000008, chr: 12, pos: 25205246, level: 'High' },
  { gene: 'PIK3CA', expression: 75, impact: 0.71, pValue: 0.00004, chr: 3, pos: 179148114, level: 'Moderate' },
];

const manhattanData = Array.from({ length: 60 }, (_, i) => ({
  index: i,
  logP: i % 12 === 0 ? Math.random() * 8 + 3 : Math.random() * 4 + 1,
  chr: Math.floor(i / 10) + 1,
  gene: `G-${i}`
}));

const Visualizer: React.FC = () => {
  const [activeCallout, setActiveCallout] = useState<string | null>('vep');

  const callouts = [
    { id: 'vep', label: 'VEP Scoring', icon: <Zap size={14} />, text: 'Variant Effect Predictor scores estimate the severity of a mutation on protein function.' },
    { id: 'manhattan', label: 'Loci Significance', icon: <Target size={14} />, text: 'Manhattan plots visualize statistical significance (-log10 p-values) across the genome.' },
    { id: 'omics', label: 'Omics Overlay', icon: <Layers size={14} />, text: 'Cross-referencing transcriptomics with genomics reveals functional hotspots.' }
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors custom-scrollbar pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">ScaleDown Analytics</p>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Multi-Omics Mapping</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Analyze complex genomic variants and their downstream transcriptional impacts through a unified latent visualization interface.
          </p>
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-sm">
            {callouts.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCallout(c.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold whitespace-nowrap ${activeCallout === c.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {activeCallout && (
            <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl animate-fadeIn">
              <p className="text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2 leading-relaxed">
                <HelpCircle size={14} className="shrink-0 mt-0.5" />
                {callouts.find(c => c.id === activeCallout)?.text}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Main Scatter Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Impact-Expression Matrix</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">VEP v110 • Log2 Expression</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> <span className="text-[10px] font-bold text-slate-400">High</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> <span className="text-[10px] font-bold text-slate-400">Med</span></div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" dark={{ stroke: "#1e293b" }} />
                <XAxis 
                  type="number" 
                  dataKey="impact" 
                  name="Impact" 
                  domain={[0, 1]} 
                  stroke="#64748b" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  type="number" 
                  dataKey="expression" 
                  name="Exp" 
                  stroke="#64748b" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <ZAxis type="number" dataKey="pValue" range={[200, 1200]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-2xl">
                          <p className="text-sm font-black text-blue-600 dark:text-blue-400 mb-2">{d.gene}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4 text-[10px] font-bold uppercase tracking-tighter">
                              <span className="text-slate-400">VEP Impact</span>
                              <span className="text-slate-900 dark:text-white">{d.impact}</span>
                            </div>
                            <div className="flex justify-between gap-4 text-[10px] font-bold uppercase tracking-tighter">
                              <span className="text-slate-400">Expression</span>
                              <span className="text-slate-900 dark:text-white">{d.expression}</span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                               <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${d.level === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>{d.level} Priority</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={data}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.level === 'High' ? '#ef4444' : entry.level === 'Moderate' ? '#f59e0b' : '#10b981'} 
                      fillOpacity={0.8}
                      className="hover:fill-opacity-100 transition-all cursor-pointer"
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-8 h-[500px]">
          {/* Loci Density Chart */}
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Differential Profiling</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(0, 7)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.1} />
                  <XAxis dataKey="gene" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1e293b', color: 'white' }}
                  />
                  <Bar dataKey="expression" radius={[12, 12, 12, 12]}>
                    {data.slice(0, 7).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.expression > 80 ? '#6366f1' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Manhattan Plot Highlight */}
          <div className="flex-1 bg-blue-600 rounded-[2.5rem] p-8 shadow-xl shadow-blue-600/20 text-white flex flex-col relative overflow-hidden group">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <h3 className="text-sm font-black uppercase tracking-widest mb-2">Discovery Focus</h3>
            <p className="text-xs font-medium text-blue-100 leading-relaxed max-w-[80%] mb-4">
              ScaleDown Engine identified <span className="font-black underline decoration-2">3 critical significance hotspots</span> crossing the 5e-08 threshold on Chr 3 and Chr 17.
            </p>
            <div className="mt-auto flex items-center gap-3">
               <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                 Export Hotspot Data
               </button>
               <ChevronRight size={18} className="text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Manhattan Plot (Full Width) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Genomic Significance Landscape</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global P-Value Distribution</p>
          </div>
          <div className="px-4 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl text-[10px] text-red-600 font-black uppercase tracking-widest">
            Threshold: 5e-8
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" dark={{ stroke: "#1e293b" }} />
              <XAxis type="number" dataKey="index" name="Position" stroke="#64748b" fontSize={10} hide />
              <YAxis type="number" dataKey="logP" name="-logP" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={manhattanData}>
                {manhattanData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.logP > 7 ? '#ef4444' : entry.chr % 2 === 0 ? '#3b82f6' : '#6366f1'} 
                    className="hover:scale-150 transition-transform origin-center"
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
