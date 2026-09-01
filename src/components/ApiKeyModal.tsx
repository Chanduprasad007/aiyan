import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existingKey = localStorage.getItem('AIYAN_GEMINI_API_KEY') || '';
    setApiKey(existingKey);
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('AIYAN_GEMINI_API_KEY', apiKey.trim());
    } else {
      localStorage.removeItem('AIYAN_GEMINI_API_KEY');
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem('AIYAN_GEMINI_API_KEY');
    setApiKey('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-[#141318] border border-[#c9a050]/30 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a050]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c9a050] to-[#b08535] flex items-center justify-center text-[#09080b] shadow-md shrink-0">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-white tracking-wide">
                  Gemini AI Settings
                </h3>
                <p className="text-xs text-[#c9a050] font-mono">Custom API Key Configuration</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              When browsing this static site on GitHub Pages, providing a free Google Gemini API key enables direct real-time bridal styling.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#c9a050] mb-1.5">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#c9a050] outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a050] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Get a free key from Google AI Studio</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="bg-[#09080b]/60 border border-white/5 rounded-xl p-3 flex items-start space-x-2 text-[11px] text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Keys are stored exclusively in your local browser storage (<code className="text-[#c9a050]">localStorage</code>) and are never shared.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Save Key</span>
                    </>
                  )}
                </button>

                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-3 border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
