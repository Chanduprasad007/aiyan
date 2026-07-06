import { Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08070a] border-t border-white/5 text-neutral-400 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/5">
          
          {/* Logo & Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
                <Cpu className="text-white h-4.5 w-4.5" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block">AIYAN</span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-violet-400 block font-bold uppercase font-sans">AGENT WORKSPACE</span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              The premier orchestrator and command center for modular multi-agent networks. Build, test, and optimize stateful LLM pipelines in real-time.
            </p>
          </div>

          {/* Docs & Specs */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-[9px] text-violet-400 uppercase tracking-widest font-bold">API Specifications</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pipeline" className="hover:text-white transition-colors duration-200">/v1/pipeline - Routing</a>
              </li>
              <li>
                <a href="#monitor" className="hover:text-white transition-colors duration-200">/v1/telemetry - Token Metrics</a>
              </li>
              <li>
                <a href="#knowledge" className="hover:text-white transition-colors duration-200">/v1/memory - Vector Retrieval</a>
              </li>
            </ul>
          </div>

          {/* Operational Status */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[9px] text-violet-400 uppercase tracking-widest font-bold">Platform Status</h4>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg w-fit text-xs font-mono">
              <CheckCircle className="h-4 w-4" />
              <span>All Systems Operational</span>
            </div>
            <p className="text-[10px] text-neutral-500">API latency: 45ms. Sandbox: Ready.</p>
          </div>

        </div>

        {/* Bottom section copyright and attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© 2026 Aiyan Agent Workspace. All Rights Reserved.</p>
          <div className="flex items-center space-x-2">
            <span>Orchestrated with precision</span>
            <span className="text-violet-500">✦</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
