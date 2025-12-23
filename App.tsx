
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import QuoteCard from './components/QuoteCard';
import { AppView, SavedQuote, Collection } from './types';
import { COLLECTIONS, STORAGE_KEY } from './constants';
import { Download, Trash2, Check, BookOpen, Palette, Quote, Info } from 'lucide-react';
import { toPng } from 'html-to-image';
// Duplicate import removed
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './quill-custom.css';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [history, setHistory] = useState<SavedQuote[]>([]);

  // Create State
  const [quoteText, setQuoteText] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = useCallback((quote: SavedQuote) => {
    const updated = [quote, ...history];
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [history]);

  const deleteFromHistory = (id: string) => {
    const updated = history.filter(q => q.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a');
    link.download = `muse_archive_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleGenerateAndSave = async () => {
    if (!quoteText.trim()) return;

    setIsGenerating(true);
    try {
      const element = document.getElementById('quote-preview');
      if (element) {
        // Wait for fonts to be ready to ensure correct rendering
        await document.fonts.ready;

        // Higher pixel ratio for ultra-crisp exports (4x resolution)
        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 4,
          backgroundColor: '#ffffff'
        });

        const newSavedQuote: SavedQuote = {
          id: Date.now().toString(),
          content: quoteText,
          collectionId: selectedCollection.id,
          createdAt: new Date().toISOString(),
          imageUrl: dataUrl
        };

        // 1. Document: Save to history (LocalStorage)
        saveToHistory(newSavedQuote);

        // 2. Save: Trigger immediate browser download
        downloadImage(dataUrl);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to generate and save", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportLedger = () => {
    if (history.length === 0) {
      alert("The archives are empty. There is nothing to export.");
      return;
    }
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `muse_ledger_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderHome = () => (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 text-center space-y-2">
        <h2 className="text-4xl font-serif-quote italic text-stone-800">The Private Library</h2>
        <p className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-bold">A digital record of fleeting revelations</p>
      </div>

      {history.length === 0 ? (
        <div className="py-20 md:py-32 flex flex-col items-center justify-center text-stone-300 border border-stone-100 rounded-sm bg-stone-50/20">
          <BookOpen size={48} className="mb-6 opacity-10" />
          <p className="font-serif italic text-lg text-stone-400">The archives are currently empty.</p>
          <button
            onClick={() => setView('create')}
            className="mt-6 text-stone-600 font-bold text-[10px] uppercase tracking-[0.3em] border-b border-stone-300 pb-1 hover:text-stone-900 transition-all"
          >
            Enter the Scriptorium
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {history.map((item) => {
            const collection = COLLECTIONS.find(c => c.id === item.collectionId);
            return (
              <div
                key={item.id}
                className="group relative bg-white academia-border p-4 paper-shadow transition-all hover:-translate-y-2"
              >
                <div className="aspect-[4/5] overflow-hidden mb-5 bg-stone-50 academia-border relative">
                  <img
                    src={item.imageUrl}
                    alt={item.content}
                    className="w-full h-full object-cover grayscale-[0.1] transition-all duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-6">
                    <button
                      onClick={() => item.imageUrl && downloadImage(item.imageUrl)}
                      className="p-3 bg-white text-stone-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => deleteFromHistory(item.id)}
                      className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform shadow-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-800">Folio No. {item.id.slice(-4)}</span>
                    <span className="text-[9px] font-medium tracking-widest text-stone-400">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full opacity-30 shadow-inner" style={{ backgroundColor: collection?.primary || '#000' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderCreate = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="lg:flex lg:gap-24 items-start">
        {/* Editor (Left) */}
        <div className="lg:w-[45%] space-y-14">
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Manuscript Scribe</h3>
              <span className="text-[10px] text-stone-300 uppercase tracking-widest font-mono">{quoteText.replace(/<[^>]*>/g, '').length} CP</span>
            </div>
            <div className="academia-border bg-white shadow-sm hover:shadow-md transition-shadow">
              <ErrorBoundary>
                <ReactQuill
                  theme="snow"
                  value={quoteText}
                  onChange={setQuoteText}
                  placeholder="Record your observation..."
                  modules={{
                    toolbar: [
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic'],
                      ['clean']
                    ]
                  }}
                />
              </ErrorBoundary>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 flex items-center gap-2">
                <Palette size={14} strokeWidth={1.5} /> Choice of Collection
              </h3>
              {selectedCollection.description && (
                <div className="flex items-center gap-1 group relative">
                  <Info size={12} className="text-stone-300" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-stone-800 text-white text-[9px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-normal font-medium">
                    {selectedCollection.description}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {COLLECTIONS.filter(c => !c.hidden).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCollection(c)}
                  className={`p-4 text-left transition-all academia-border flex flex-col gap-3 group relative ${selectedCollection.id === c.id
                    ? 'bg-stone-900 border-stone-900 text-stone-50 shadow-lg -translate-y-1'
                    : 'bg-white text-stone-500 hover:border-stone-400'
                    }`}
                >
                  <div className="w-full h-3 rounded-full shadow-inner" style={{ backgroundColor: c.background, border: '1px solid rgba(0,0,0,0.1)' }}></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">{c.name}</span>
                    <span className="text-[7px] opacity-60 uppercase tracking-widest font-medium">{c.language}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="pt-8">
            <button
              onClick={handleGenerateAndSave}
              disabled={!quoteText || isGenerating}
              className={`w-full py-8 flex items-center justify-center gap-5 font-bold uppercase tracking-[0.4em] text-[11px] transition-all shadow-2xl shadow-stone-200 ${!quoteText || isGenerating
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed shadow-none'
                : 'bg-stone-900 text-white hover:bg-black hover:-translate-y-1 active:scale-[0.98]'
                }`}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-stone-600 border-t-white rounded-full animate-spin" />
              ) : (
                <>Document and Save <Check size={18} /></>
              )}
            </button>
            {showSuccess && (
              <p className="text-center mt-8 text-xs font-serif italic text-stone-500 tracking-wide animate-in fade-in">This manuscript has been documented and saved to your device.</p>
            )}
          </div>
        </div>

        {/* Preview (Right) - Visible on all screens, stacks on mobile */}
        <div className="mt-12 lg:mt-0 lg:w-[55%]">
          <div className="sticky top-32">
            <div className="mb-12 flex items-center justify-between border-b border-stone-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedCollection.primary }}></div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-stone-600">The Folio Preview</h3>
              </div>
              <span className="text-[10px] italic text-stone-400 font-serif tracking-widest uppercase">Archival Resolution (3x)</span>
            </div>

            <QuoteCard
              content={quoteText}
              collection={selectedCollection}
              id="quote-preview"
            />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 academia-border bg-stone-50/50 border-dashed relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100/50 -rotate-45 translate-x-16 -translate-y-16"></div>
              <div className="space-y-6">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.4em] mb-2 underline underline-offset-4 decoration-stone-200">Export Parameters</p>
                <div className="grid grid-cols-1 gap-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                  <p className="flex justify-between border-b border-stone-100 pb-1"><span>Format</span> <span className="text-stone-800">PNG Lossless</span></p>
                  <p className="flex justify-between border-b border-stone-100 pb-1"><span>DPI</span> <span className="text-stone-800">300 (Print Ready)</span></p>
                  <p className="flex justify-between border-b border-stone-100 pb-1"><span>Lang</span> <span className="text-stone-800">{selectedCollection.language}</span></p>
                </div>
              </div>
              <div className="space-y-6 border-l border-stone-200 pl-8">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.4em] mb-2 underline underline-offset-4 decoration-stone-200">Manuscript Origin</p>
                <div className="grid grid-cols-1 gap-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                  <p className="flex justify-between border-b border-stone-100 pb-1"><span>Palette</span> <span className="text-stone-800">{selectedCollection.name}</span></p>
                  <p className="flex justify-between border-b border-stone-100 pb-1"><span>Theme</span> <span className="text-stone-800">{selectedCollection.id}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto py-20 animate-in fade-in duration-1000">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl font-serif-quote italic text-stone-800 tracking-tight">Atelier Management</h2>
        <div className="w-16 h-[2px] bg-stone-900 mx-auto mt-8"></div>
      </div>

      <div className="space-y-16">
        <div className="space-y-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-100 pb-4">Archives & Ledger</h3>
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={handleExportLedger}
              className="w-full flex items-center justify-between p-6 md:p-10 bg-white academia-border hover:bg-stone-50 transition-all group shadow-sm"
            >
              <div className="text-left space-y-2">
                <p className="font-bold text-[12px] uppercase tracking-widest text-stone-800">Export Complete Ledger</p>
                <p className="text-[10px] text-stone-400 leading-relaxed font-serif italic">Compile your entire history into a portable JSON document for safekeeping.</p>
              </div>
              <div className="p-4 rounded-full bg-stone-50 group-hover:bg-stone-900 group-hover:text-white transition-all">
                <Download size={24} strokeWidth={1.5} />
              </div>
            </button>
            <button
              onClick={() => {
                if (confirm("Are you certain you wish to incinerate the collection? This action is irreversible and the scrolls will be lost to time.")) {
                  localStorage.removeItem(STORAGE_KEY);
                  setHistory([]);
                  alert("Archive successfully incinerated.");
                }
              }}
              className="w-full flex items-center justify-between p-6 md:p-10 bg-white academia-border hover:bg-red-50/50 hover:border-red-100 transition-all group shadow-sm"
            >
              <div className="text-left space-y-2">
                <p className="font-bold text-[12px] uppercase tracking-widest text-stone-800 group-hover:text-red-700 transition-colors">Incinerate the Archive</p>
                <p className="text-[10px] text-stone-400 leading-relaxed font-serif italic">Permanently destroy all manuscripts stored on this device. Use with caution.</p>
              </div>
              <div className="p-4 rounded-full bg-stone-50 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Trash2 size={24} strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-100 pb-4">Our Philosophy</h3>
          <div className="p-6 md:p-12 bg-white academia-border font-serif italic text-base md:text-lg leading-loose text-stone-700 text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-4 left-4 text-stone-100 select-none"></div>
            "Muse is a sanctuary for the contemplative scribe. In an age of ephemeral chatter, we believe in the physical weight of words. Our tools are designed to transform fleeting internal echoes into timeless digital artifacts, etched in the colors of history."
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout activeView={view} onViewChange={setView}>
      {view === 'home' && renderHome()}
      {view === 'create' && renderCreate()}
      {view === 'settings' && renderSettings()}
    </Layout>
  );
};

export default App;
