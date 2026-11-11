import React, { useState } from 'react';
import { Logo } from './Logo';
import { Volume2, Menu, X } from 'lucide-react';
import { doorChime } from '../../utils/audio';

export type NavTab = 'mirror' | 'board' | 'season' | 'threshold' | 'story';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isLargeText: boolean;
  onToggleTextSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isLargeText,
  onToggleTextSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chimePlaying, setChimePlaying] = useState(false);

  const handlePlayChime = () => {
    setChimePlaying(true);
    doorChime.playChime();
    setTimeout(() => setChimePlaying(false), 2400);
  };

  const navItems: { id: NavTab; label: string; number: string; iconLabel: string }[] = [
    { id: 'mirror', label: 'Mirror Page', number: '08', iconLabel: 'Read-only digital' },
    { id: 'board', label: 'Open Door Board', number: '01', iconLabel: 'Gate noticeboard' },
    { id: 'season', label: 'Season Card', number: '06', iconLabel: 'Yearly dates' },
    { id: 'threshold', label: 'The Threshold', number: '07', iconLabel: 'Lamp & doorstep' },
    { id: 'story', label: 'Brand & Story', number: 'Kit', iconLabel: 'Purpose & design' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-ink/10 transition-all">
      {/* Top micro-bar: Brand Promise reminder */}
      <div className="bg-ink text-paper text-xs py-1.5 px-4 text-center tracking-wide font-sans flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber inline-block animate-pulse" />
        <span className="font-medium">Every door, a little open.</span>
        <span className="hidden md:inline text-paper/60">|</span>
        <span className="hidden md:inline text-paper/80 italic font-serif">Come as you are, whenever you can.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Tagline */}
          <Logo
            variant="horizontal"
            size="md"
            showTagline={true}
            onClick={() => onSelectTab('mirror')}
            className="select-none"
          />

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-2 rounded-chip text-sm transition-all duration-200 flex items-center gap-2 font-medium ${
                    isActive
                      ? 'bg-ink text-paper shadow-sm'
                      : 'text-ink/80 hover:text-ink hover:bg-paper-warm'
                  }`}
                >
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-amber text-ink font-bold' : 'bg-ink/5 text-ink/60'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Audio Chime & Text Size Toggle */}
          <div className="flex items-center gap-2">
            {/* Chime trigger */}
            <button
              onClick={handlePlayChime}
              title="Play the NeighbourLink Door Chime (G4 -> D5 soft bell)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-chip text-xs font-medium border transition-all duration-200 ${
                chimePlaying
                  ? 'bg-amber text-ink border-amber shadow-lamp scale-105'
                  : 'bg-paper-warm text-ink border-ink/15 hover:border-amber hover:bg-amber/15'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${chimePlaying ? 'animate-bounce text-ink' : 'text-amber-dark'}`} />
              <span className="hidden sm:inline">Chime</span>
              <span className="text-[10px] text-ink/60 font-mono">G4·D5</span>
            </button>

            {/* A+ Text Size toggle */}
            <button
              onClick={onToggleTextSize}
              title={isLargeText ? 'Reset text size' : 'Enlarge text (A+ Accessibility)'}
              className={`px-2.5 py-1.5 rounded-chip text-xs font-bold border transition-colors ${
                isLargeText
                  ? 'bg-terracotta text-paper border-terracotta'
                  : 'bg-paper-warm text-ink border-ink/15 hover:border-ink/40'
              }`}
            >
              {isLargeText ? 'A (Normal)' : 'A+'}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-chip text-ink hover:bg-paper-warm border border-ink/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-card border-b border-ink/10 px-4 pt-3 pb-5 space-y-1 animate-fadeIn">
          <div className="text-xs uppercase tracking-wider text-ink/50 px-3 pb-1 font-bold">
            Sections & Collaterals
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-chip text-sm flex items-center justify-between font-medium ${
                  isActive
                    ? 'bg-ink text-paper'
                    : 'text-ink hover:bg-paper-warm'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                      isActive ? 'bg-amber text-ink font-bold' : 'bg-ink/10 text-ink/70'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-ink/50">{item.iconLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
