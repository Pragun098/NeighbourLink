import React from 'react';
import { Logo } from './Logo';
import { HeartHandshake, EyeOff, Home, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-paper mt-20 pt-16 pb-12 border-t-4 border-amber">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Banner */}
        <div className="bg-ink-dark/80 rounded-card p-6 sm:p-8 border border-paper/10 mb-14 text-center max-w-4xl mx-auto shadow-board">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-amber text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            The NeighbourLink Brand Promise
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl text-paper leading-snug">
            “We will never make you explain, publish who came, or ask you to reconcile.”
          </blockquote>
          <p className="text-paper/70 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            An open door is a choice, never a mystery. We turn private invitations into open doors, asking nothing of anyone.
          </p>
        </div>

        {/* 4 Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-ink-light/40 p-5 rounded-card border border-paper/10 hover:border-terracotta/40 transition-colors">
            <div className="w-9 h-9 rounded-chip bg-terracotta/20 text-terracotta flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5 text-terracotta-light" />
            </div>
            <h4 className="font-serif text-lg font-bold text-paper mb-1">Open, never owed</h4>
            <p className="text-paper/70 text-sm">An invitation is a gift, never a debt. No RSVP or obligation.</p>
          </div>

          <div className="bg-ink-light/40 p-5 rounded-card border border-paper/10 hover:border-amber/40 transition-colors">
            <div className="w-9 h-9 rounded-chip bg-amber/20 text-amber flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-amber" />
            </div>
            <h4 className="font-serif text-lg font-bold text-paper mb-1">Warmth before efficiency</h4>
            <p className="text-paper/70 text-sm">A kind word beats a clever feature. Paper and clay first, never cold tech.</p>
          </div>

          <div className="bg-ink-light/40 p-5 rounded-card border border-paper/10 hover:border-sage/40 transition-colors">
            <div className="w-9 h-9 rounded-chip bg-sage/20 text-sage flex items-center justify-center mb-3">
              <EyeOff className="w-5 h-5 text-sage" />
            </div>
            <h4 className="font-serif text-lg font-bold text-paper mb-1">Privacy by default</h4>
            <p className="text-paper/70 text-sm">No names needed, no accounts, no attendance kept. Read-only by design.</p>
          </div>

          <div className="bg-ink-light/40 p-5 rounded-card border border-paper/10 hover:border-paper/40 transition-colors">
            <div className="w-9 h-9 rounded-chip bg-paper/10 text-paper flex items-center justify-center mb-3">
              <Home className="w-5 h-5 text-paper" />
            </div>
            <h4 className="font-serif text-lg font-bold text-paper mb-1">Every household counts</h4>
            <p className="text-paper/70 text-sm">Each home is a door in the same lane. Grounded in friendly distance.</p>
          </div>
        </div>

        {/* Footer Bottom info */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-paper/15 text-xs text-paper/60 gap-4">
          <Logo variant="horizontal" size="sm" inverted={true} showTagline={true} />

          <div className="flex flex-wrap items-center justify-center gap-6 text-paper/70">
            <span>Archetype: The Caregiver</span>
            <span>•</span>
            <span>Paper-first initiative</span>
            <span>•</span>
            <span>No data trail</span>
          </div>

          <p className="text-center md:text-right text-paper/50 font-mono text-[11px]">
            NeighbourLink · Assignment 1 Design System · 2026
          </p>
        </div>
      </div>
    </footer>
  );
};
