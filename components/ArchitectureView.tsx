
import React from 'react';
import { Database, Cpu, Share2, Search, ArrowRight, Zap, Info } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="p-8 animate-fadeIn text-slate-900 dark:text-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">System Architecture</h2>
        <p className="text-slate-500 dark:text-slate-400">Modular discovery engine for high-throughput multi-omics synthesis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Input Layer */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
            <Database size={16} /> Data Ingestion
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-4 shadow-sm dark:shadow-xl">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors">
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">NCBI Entrez</span>
              <p className="text-sm mt-1">Pubmed, Gene, SRA streams</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors">
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">Ensembl REST</span>
              <p className="text-sm mt-1">Genome mapping & VEP data</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors">
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">GWAS Catalog</span>
              <p className="text-sm mt-1">Phenotype-Variant associations</p>
            </div>
          </div>
        </div>

        {/* Processing Layer */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2">
            <Cpu size={16} /> ScaleDown Engine
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl space-y-4 shadow-sm dark:shadow-xl relative z-10">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block">
               <ArrowRight className="text-slate-400 dark:text-slate-600" />
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-500/30">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300">
                <Zap className="text-yellow-500" size={16} /> Semantic Compression
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Latent feature extraction of 1M+ variants into vectorized 'Genomic Embeddings'.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold mb-1">Sliding Window Context</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">Hierarchical summarization of 10k+ gene clusters.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold mb-1">Variant Effect Predictor</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Custom scoring for non-synonymous mutations.</p>
            </div>
          </div>
        </div>

        {/* Intelligence Layer */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-widest flex items-center gap-2">
            <Share2 size={16} /> Reasoning Layer
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-4 shadow-sm dark:shadow-xl relative">
             <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block">
               <ArrowRight className="text-slate-400 dark:text-slate-600" />
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-500/30">
              <h4 className="text-sm font-bold text-green-700 dark:text-green-300 font-bold">Hypothesis Gen</h4>
              <p className="text-xs mt-1 text-slate-600 dark:text-slate-300">Multi-omics synthesis identifying novel regulatory networks.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold font-bold">Research Visuals</h4>
              <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Integrated genomic mapping & animated educational content.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Compression Description */}
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 p-6 rounded-2xl shadow-sm">
        <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Info size={18} /> Deep Dive: Genomic Embeddings & 85% Token Reduction
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Traditional LLMs struggle with raw genomic sequences (A, T, C, G) because individual base pairs hold minimal semantic weight in isolation, quickly exhausting context windows. 
            ScaleDown's <span className="font-bold text-blue-600 dark:text-blue-300">Semantic Compression</span> bypasses this by translating raw sequences into <span className="font-bold">Genomic Embeddings</span>.
          </p>
          <p>
            By clumping variants based on Linkage Disequilibrium (LD) and annotating them with pre-computed VEP impact scores, we prioritize biologically active loci. 
            This results in an <span className="font-bold text-green-600 dark:text-green-400">85% reduction in token overhead</span>, allowing our assistant to analyze massive multi-omics datasets while maintaining the "local alignment" nuances required for precise clinical reasoning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
