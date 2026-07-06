import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MorphText from "./components/MorphText";
import AgentBentoGrid from "./components/AgentBentoGrid";
import { Terminal, Play, Cpu, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface TerminalLog {
  text: string;
  type: "system" | "success" | "warning" | "input" | "info";
  time: string;
}

export default function App() {
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { text: "AIYAN Agent Workspace OS v1.0.0 loaded.", type: "system", time: "21:44:09" },
    { text: "Systems: ONLINE. Network latency: 45ms. Sandbox ready.", type: "success", time: "21:44:10" },
    { text: "Type a command below or select a quick-start run preset.", type: "info", time: "21:44:10" }
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isRunningSim, setIsRunningSim] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addLog = (text: string, type: "system" | "success" | "warning" | "input" | "info") => {
    const timeStr = new Date().toTimeString().split(" ")[0];
    setTerminalLogs((prev) => [...prev, { text, type, time: timeStr }]);
  };

  const runSim = async (presetType: "pipeline" | "query" | "tools") => {
    if (isRunningSim) return;
    setIsRunningSim(true);

    if (presetType === "pipeline") {
      addLog("agy run-pipeline --agents=Planner,Researcher,Coder", "input");
      await delay(600);
      addLog("● [Planner] Decomposing task: 'Build new vector DB schema'", "info");
      await delay(800);
      addLog("✦ [Router] Redirecting subtask to [Researcher] & [Coder]", "info");
      await delay(1000);
      addLog("● [Researcher] Searching web for latest PGVector index designs...", "info");
      await delay(700);
      addLog("✔ [Researcher] Found 2 matching patterns. Latency: 280ms.", "success");
      await delay(800);
      addLog("● [Coder] Generating schema layout code...", "info");
      await delay(1200);
      addLog("✔ [Coder] Schema build succeeded. 248 lines generated.", "success");
      await delay(600);
      addLog("✦ [Reviewer] Auditing schema design. No issues found.", "info");
      await delay(700);
      addLog("✔ Pipeline run execution completed successfully. Total cost: $0.042.", "success");
    } else if (presetType === "query") {
      addLog("agy memory-query 'vector auth modules'", "input");
      await delay(500);
      addLog("● Connecting to semantic namespaces...", "info");
      await delay(800);
      addLog("● Indexing namespace [codebase] (342 documents)...", "info");
      await delay(600);
      addLog("✔ Search complete. Found 2 matches.", "success");
      addLog("  └ Match #1: /src/auth/embeddings.ts (Similarity: 0.92)", "system");
      addLog("  └ Match #2: /src/auth/jwt.ts (Similarity: 0.81)", "system");
    } else if (presetType === "tools") {
      addLog("agy telemetry-inspect --active-tools", "input");
      await delay(500);
      addLog("Telemetry report:", "system");
      addLog("  • web_search: 14 calls (avg latency: 280ms) - [100% OK]", "info");
      addLog("  • code_exec: 8 calls (avg latency: 1.2s) - [100% OK]", "info");
      addLog("  • file_read: 22 calls (avg latency: 12ms) - [100% OK]", "info");
      addLog("  • vector_query: 31 calls (avg latency: 95ms) - [100% OK]", "info");
    }

    setIsRunningSim(false);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    addLog(terminalInput, "input");
    setTerminalInput("");

    setTimeout(() => {
      if (cmd === "help") {
        addLog("Available commands: help, clear, pipeline, query, status, tools", "system");
      } else if (cmd === "clear") {
        setTerminalLogs([]);
      } else if (cmd === "pipeline") {
        runSim("pipeline");
      } else if (cmd === "query") {
        runSim("query");
      } else if (cmd === "tools") {
        runSim("tools");
      } else if (cmd === "status") {
        addLog("System: ACTIVE | Latency: 45ms | DB Connected: TRUE", "success");
      } else {
        addLog(`Unknown command: '${cmd}'. Type 'help' for suggestions.`, "warning");
      }
    }, 150);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#070609] text-zinc-100 selection:bg-violet-600 selection:text-white overflow-x-hidden antialiased relative font-sans">
      
      {/* Immersive Glowing Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full bg-violet-900/10 blur-[130px]" />
        <div className="absolute top-[30%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Header */}
      <Header onNavigate={handleNavigate} />

      <main id="main-content" className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          
          {/* Version badge */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-[10px] uppercase tracking-widest text-violet-400 font-mono mb-8"
          >
            <Sparkles className="h-3 w-3" />
            <span>AIYAN CORE ENGINE v1.2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </motion.div>

          {/* Morphing Word Hero Title */}
          <div className="mb-6 h-[80px] sm:h-[130px] flex items-center justify-center">
            <MorphText 
              words={["AGENTS", "WORKSPACES", "PIPELINES", "INTEGRATIONS"]} 
              interval={2500}
              fontSize="clamp(2.5rem, 8vw, 5.5rem)"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-xl font-medium text-neutral-400 max-w-2xl mt-4 leading-relaxed font-sans"
          >
            The Ultimate Command Center for Multi-Agent Orchestration.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs sm:text-sm text-neutral-500 max-w-xl mt-3 leading-relaxed font-sans"
          >
            Execute stateful agent loops, monitor token consumption metrics, inspect tool executions, and query semantic vector knowledge bases in one unified workspace.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
          >
            <button
              onClick={() => handleNavigate('bento')}
              className="px-8 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] cursor-pointer border border-violet-500/30"
            >
              Explore Sandbox Grid
            </button>
            <button
              onClick={() => handleNavigate('sandbox-terminal')}
              className="px-8 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-semibold text-xs uppercase tracking-wider transition-all duration-300 border border-white/5 hover:border-white/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <Terminal className="h-4 w-4" />
              <span>Interactive Shell</span>
            </button>
          </motion.div>

          {/* Key Specs Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 max-w-lg w-full mt-16 pt-8 border-t border-white/5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500"
          >
            <div className="flex flex-col items-center gap-1.5">
              <Cpu className="h-4 w-4 text-violet-400" />
              <span>100% Autonomous</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Secure Sandboxed</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span>Dev Telemetry</span>
            </div>
          </motion.div>

        </section>

        {/* BENTO GRID TELEMETRY SECTION */}
        <section id="bento" className="py-16 bg-[#08070a] border-t border-b border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center mb-12">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-400 font-bold">SYSTEM TELEMETRY</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Real-time Workspace State</h2>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
                Observe task routing, resource allocations, and logs generated by background agents.
              </p>
            </div>

            <AgentBentoGrid />

          </div>
        </section>

        {/* INTERACTIVE SANDBOX TERMINAL SECTION */}
        <section id="sandbox-terminal" className="py-20 max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-400 font-bold">RUNNER SANDBOX</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Simulate Agent Commands</h2>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Execute agent pipeline operations dynamically to observe console output response models.
            </p>
          </div>

          <div className="bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
            {/* Terminal Header */}
            <div className="bg-neutral-900 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-[10px] font-mono text-neutral-500 ml-2">sandbox://aiyan-workspace</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-neutral-500">online</span>
              </div>
            </div>

            {/* Quick Run Presets bar */}
            <div className="bg-neutral-900/40 border-b border-white/5 px-4 py-2 flex flex-wrap gap-2 items-center">
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider shrink-0">Presets:</span>
              <button
                disabled={isRunningSim}
                onClick={() => runSim("pipeline")}
                className="px-2.5 py-1 rounded bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 font-mono text-[9px] flex items-center gap-1 border border-violet-500/10 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Play className="h-2.5 w-2.5" />
                Run Pipeline
              </button>
              <button
                disabled={isRunningSim}
                onClick={() => runSim("query")}
                className="px-2.5 py-1 rounded bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 font-mono text-[9px] flex items-center gap-1 border border-cyan-500/10 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Play className="h-2.5 w-2.5" />
                Query Memory
              </button>
              <button
                disabled={isRunningSim}
                onClick={() => runSim("tools")}
                className="px-2.5 py-1 rounded bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-mono text-[9px] flex items-center gap-1 border border-emerald-500/10 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Play className="h-2.5 w-2.5" />
                Inspect Telemetry
              </button>
            </div>

            {/* Terminal logs display */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 selection:bg-violet-600 select-text">
              {terminalLogs.map((log, idx) => {
                let colorClass = "text-neutral-300";
                if (log.type === "success") colorClass = "text-emerald-400 font-medium";
                if (log.type === "warning") colorClass = "text-amber-400";
                if (log.type === "input") colorClass = "text-violet-400";
                if (log.type === "system") colorClass = "text-neutral-500";

                return (
                  <div key={idx} className="flex gap-2">
                    <span className="text-neutral-600 select-none">[{log.time}]</span>
                    {log.type === "input" && <span className="text-violet-400 select-none">&gt;</span>}
                    <span className={colorClass}>{log.text}</span>
                  </div>
                );
              })}
              {isRunningSim && (
                <div className="flex gap-2 text-neutral-400 animate-pulse">
                  <span className="text-neutral-600 select-none">[-]</span>
                  <span>Executing agent steps...</span>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="border-t border-white/5 flex bg-neutral-900/50">
              <div className="pl-4 flex items-center text-violet-400 font-mono text-xs select-none">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command ('help', 'pipeline', 'query', 'status', 'clear')..."
                className="flex-1 bg-transparent py-3.5 px-2 outline-none font-mono text-[11px] text-zinc-200 placeholder-neutral-600"
                disabled={isRunningSim}
              />
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
