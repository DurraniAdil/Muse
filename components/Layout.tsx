
import React from 'react';
import { BookOpen, PenTool, Settings, Archive, Library } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] pb-20 md:pb-0">
      {/* Literary Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-stone-200 px-6 py-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <img src="/media/muse.ico" alt="Muse Logo" className="w-9 h-9 opacity-80" />
            <h1 className="text-2xl font-serif-quote italic font-semibold tracking-wide text-stone-800">Muse</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-stone-500">
            <button
              onClick={() => onViewChange('home')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'home' ? 'text-stone-900 border-b border-stone-900' : ''}`}
            >
              Archive
            </button>
            <button
              onClick={() => onViewChange('create')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'create' ? 'text-stone-900 border-b border-stone-900' : ''}`}
            >
              Scriptorium
            </button>
            <button
              onClick={() => onViewChange('settings')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'settings' ? 'text-stone-900 border-b border-stone-900' : ''}`}
            >
              Settings
            </button>
          </nav>

          <div className="flex items-center gap-4 hidden md:flex">
            <button
              onClick={() => onViewChange('create')}
              className="bg-stone-800 text-stone-50 px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-tighter hover:bg-stone-900 transition-all shadow-md"
            >
              New Manuscript
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 lg:px-12">
        {children}
      </main>



      {/* Mobile Nav Bar - Hidden on Large screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FDFBF7]/90 backdrop-blur-md border-t border-stone-200 flex items-center justify-around py-4 z-50">
        <button onClick={() => onViewChange('home')} className={`p-2 transition-colors ${activeView === 'home' ? 'text-stone-900' : 'text-stone-400'}`}>
          <Library size={24} />
        </button>
        <button onClick={() => onViewChange('create')} className={`p-2 transition-colors ${activeView === 'create' ? 'text-stone-900' : 'text-stone-400'}`}>
          <PenTool size={24} />
        </button>
        <button onClick={() => onViewChange('settings')} className={`p-2 transition-colors ${activeView === 'settings' ? 'text-stone-900' : 'text-stone-400'}`}>
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
};

export default Layout;
