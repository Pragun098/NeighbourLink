import React, { useState } from 'react';
import { COLLATERALS_DATA, VOCABULARY_COMPARISON } from '../../data/mockData';
import type { CollateralItem } from '../../types';
import { doorChime } from '../../utils/audio';
import { HelpCircle, Check } from 'lucide-react';

export const BrandStoryView: React.FC = () => {
  const [activeStoryTab, setActiveStoryTab] = useState<'narrative' | 'vocabulary' | 'collaterals' | 'checklist'>('narrative');
  const [selectedCollateral, setSelectedCollateral] = useState<CollateralItem | null>(COLLATERALS_DATA[0]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    doorChime.playChime();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistItems = [
    { id: 'logo-1', category: 'Logo', label: 'Gap between the two homes is visible' },
    { id: 'logo-2', category: 'Logo', label: 'Lamp is lit and amber (#EBA43B)' },
    { id: 'logo-3', category: 'Logo', label: 'Clear space equals at least one lamp diameter' },
    { id: 'color-1', category: 'Colour', label: 'Paper leads (~55%), then Ink (20%), Terracotta (12%), Amber (8%)' },
    { id: 'color-2', category: 'Colour', label: 'One amber lamp per layout as the shared light' },
    { id: 'color-3', category: 'Colour', label: 'Text pairings meet 4.5:1 AA contrast' },
    { id: 'type-1', category: 'Typography', label: 'Caladea Bold for headings, Carlito for text' },
    { id: 'type-2', category: 'Typography', label: 'Sentence case, left aligned (60–70 characters/line)' },
    { id: 'voice-1', category: 'Voice', label: 'Says "come", never "must" or "RSVP"' },
    { id: 'voice-2', category: 'Voice', label: 'No names needed, no reply needed, no attendance kept' },
    { id: 'sound-1', category: 'Sound', label: 'Chime G4 to D5 once, never looping, below 55 dB' },
    { id: 'space-1', category: 'Experience', label: 'Warm 2700 K light only; paper and clay first; no plastic' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* View Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/20 text-ink text-xs font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          Brand Foundation & Strategy Manual
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-2">
          Beyond Walls, Building Bonds
        </h2>
        <p className="text-ink/75 text-sm sm:text-base">
          A community initiative first and a service second. It answers the emotional problem, not just the logistics of dates.
        </p>

        {/* Tab switch */}
        <div className="mt-6 inline-flex p-1 bg-paper-deep rounded-chip border border-ink/10 text-xs flex-wrap justify-center">
          <button
            onClick={() => setActiveStoryTab('narrative')}
            className={`px-4 py-2 rounded-chip font-medium transition-all ${
              activeStoryTab === 'narrative' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            The Problem & Brand Story
          </button>
          <button
            onClick={() => setActiveStoryTab('vocabulary')}
            className={`px-4 py-2 rounded-chip font-medium transition-all ${
              activeStoryTab === 'vocabulary' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            Vocabulary of Belonging
          </button>
          <button
            onClick={() => setActiveStoryTab('collaterals')}
            className={`px-4 py-2 rounded-chip font-medium transition-all ${
              activeStoryTab === 'collaterals' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            The Ten Collaterals
          </button>
          <button
            onClick={() => setActiveStoryTab('checklist')}
            className={`px-4 py-2 rounded-chip font-medium transition-all ${
              activeStoryTab === 'checklist' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            Consistency Checklist
          </button>
        </div>
      </div>

      {/* TAB 1: Problem & Brand Story */}
      {activeStoryTab === 'narrative' && (
        <div className="space-y-10 animate-fadeIn">
          {/* Original Problem Statement Banner */}
          <div className="bg-ink text-paper rounded-card p-6 sm:p-8 border-l-8 border-terracotta shadow-board">
            <span className="text-xs font-mono uppercase tracking-wider text-amber font-bold">
              Original Assignment Problem Statement
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl font-bold my-3 text-paper leading-snug">
              “Two families have shared a wall and festival calendar for 30 years, but this year only one was invited.”
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-paper/15 text-xs text-paper/80">
              <div>
                <strong className="text-amber block mb-1">What we can see:</strong>
                30 years side by side, a shared wall and calendar. One household invited, one not.
              </div>
              <div>
                <strong className="text-amber block mb-1">What we cannot know:</strong>
                Was it deliberate, accidental, or a lost message? Has something changed at home?
              </div>
              <div>
                <strong className="text-amber block mb-1">Our Design Stance:</strong>
                No villain. No assumed intent. No pressure. Smallest gesture first.
              </div>
            </div>
          </div>

          {/* Brand Story: The Lamp on the Wall */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Story Card */}
            <div className="bg-paper-card border border-ink/15 rounded-card p-6 sm:p-8 shadow-paper flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                  <span className="text-xs font-mono uppercase font-bold text-terracotta">
                    Brand Story
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-4">
                  The Lamp on the Wall
                </h3>
                <div className="space-y-3 font-serif text-ink/85 leading-relaxed text-sm sm:text-base">
                  <p>
                    Thirty winters ago, two families set a lamp on the wall they shared. It stayed lit without any rules.
                  </p>
                  <p>
                    This year, one lamp went unanswered. Nobody knew why, and nobody asked, because asking can feel like blaming.
                  </p>
                  <p>
                    NeighbourLink puts a lamp back where everyone can see it: a board by the gate that says our door is open.
                  </p>
                  <p className="font-bold text-terracotta italic">
                    “Come for ten minutes, or not at all. The door stays open.”
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink/60">
                <span>Archetype: The Caregiver</span>
                <span className="italic">Everyman supporting voice</span>
              </div>
            </div>

            {/* Why Not Simply Tell Them to Talk? */}
            <div className="bg-paper-warm border border-ink/15 rounded-card p-6 sm:p-8 shadow-paper">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-terracotta" />
                <span>Why not simply tell them to talk?</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-ink/80">
                <div className="p-3 bg-paper rounded-chip border border-ink/5">
                  <strong className="text-ink block">1. It raises the stakes:</strong>
                  “Why wasn't I invited?” makes one person name a hurt and the other defend a choice. Both risk losing face.
                </div>
                <div className="p-3 bg-paper rounded-chip border border-ink/5">
                  <strong className="text-ink block">2. It assumes the cause is known:</strong>
                  Hypotheses show it could be an oversight, a hard year, or a lost message.
                </div>
                <div className="p-3 bg-paper rounded-chip border border-ink/5">
                  <strong className="text-ink block">3. It makes reconciliation the price of return:</strong>
                  Research on neighbor ties points to “friendly distance”, not forced closeness <em>(Journal of Sociology, 2018)</em>.
                </div>
                <div className="p-3 bg-paper rounded-chip border border-ink/5">
                  <strong className="text-ink block">4. It leaves two households alone with it:</strong>
                  An open board adds a neutral third place where either can step back in quietly.
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Foundation 4-Pillar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper-card p-5 rounded-card border border-ink/15">
              <span className="text-[10px] font-mono text-terracotta uppercase font-bold">Purpose</span>
              <h4 className="font-serif text-lg font-bold text-ink mt-1 mb-2">Keep neighbours connected</h4>
              <p className="text-xs text-ink/75">
                Through the moments that matter, so nobody has to wonder whether they still belong.
              </p>
            </div>
            <div className="bg-paper-card p-5 rounded-card border border-ink/15">
              <span className="text-[10px] font-mono text-amber-dark uppercase font-bold">Vision</span>
              <h4 className="font-serif text-lg font-bold text-ink mt-1 mb-2">A closed door is a choice</h4>
              <p className="text-xs text-ink/75">
                Never a mystery, and shared traditions outlast changes in who is hosting.
              </p>
            </div>
            <div className="bg-paper-card p-5 rounded-card border border-ink/15">
              <span className="text-[10px] font-mono text-sage-dark uppercase font-bold">Mission</span>
              <h4 className="font-serif text-lg font-bold text-ink mt-1 mb-2">Give neighbours a simple way</h4>
              <p className="text-xs text-ink/75">
                A voluntary, private way to open their celebrations, send a warm word, and find their way back without explaining.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Vocabulary of Belonging */}
      {activeStoryTab === 'vocabulary' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-paper-card border border-ink/15 rounded-card p-6 sm:p-8 shadow-paper">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-ink/10">
              <div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  Vocabulary: What We Say, and What We Leave Out
                </h3>
                <p className="text-xs text-ink/65">
                  Plain, warm, never pushy. Written as a neighbour would say it at the gate.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-sage/20 text-ink text-xs font-bold">
                  Warmth before efficiency
                </span>
              </div>
            </div>

            {/* Approved vs Avoided words */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Words We Use */}
              <div className="bg-[#EBF3ED] border border-sage rounded-card p-5">
                <span className="text-xs font-mono uppercase tracking-wider text-ink font-bold block mb-3">
                  ✓ Words & Phrases We Use
                </span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['door', 'open', 'come', 'whenever', 'thinking of you', 'no reply needed', 'gate', 'lane', 'tea', 'lamp'].map((w) => (
                    <span key={w} className="px-2.5 py-1 bg-paper rounded-chip text-xs font-semibold text-ink border border-sage/60">
                      {w}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5 text-xs text-ink/80 italic font-serif">
                  <p>• “Our door is open.”</p>
                  <p>• “Come for ten minutes or the whole evening.”</p>
                  <p>• “Tea at 5. No sign-up.”</p>
                  <p>• “No names needed.”</p>
                  <p>• “Come as you are, whenever you can.”</p>
                </div>
              </div>

              {/* Words We Avoid */}
              <div className="bg-[#F8E8E4] border border-terracotta/40 rounded-card p-5">
                <span className="text-xs font-mono uppercase tracking-wider text-terracotta font-bold block mb-3">
                  ✕ Words We Avoid (Pressure & Tech Words)
                </span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['reconnect', 'fix', 'reconcile', 'missed out', 'must', 'RSVP', 'attendance', 'guest list', 'platform', 'mandatory'].map((w) => (
                    <span key={w} className="px-2.5 py-1 bg-paper rounded-chip text-xs font-semibold text-terracotta border border-terracotta/30 line-through">
                      {w}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5 text-xs text-terracotta/90 italic font-serif">
                  <p>• Avoid “Don't miss out! Reconnect today!”</p>
                  <p>• Avoid “We noticed you haven't been coming.”</p>
                  <p>• Avoid “Mandatory neighbourly participation.”</p>
                  <p>• Avoid “Please confirm your attendance.”</p>
                  <p>• Avoid “RSVP by Friday.”</p>
                </div>
              </div>
            </div>

            {/* Substitution Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-ink/10 rounded-chip">
                <thead className="bg-paper-warm text-ink font-bold uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-3 border-b border-ink/10">Instead of (High pressure)</th>
                    <th className="p-3 border-b border-ink/10">Say (NeighbourLink voice)</th>
                    <th className="p-3 border-b border-ink/10">Why it fits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 bg-paper">
                  {VOCABULARY_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-paper-warm/50">
                      <td className="p-3 text-terracotta font-semibold line-through">{row.avoid}</td>
                      <td className="p-3 text-ink font-bold font-serif text-sm">“{row.say}”</td>
                      <td className="p-3 text-ink/70">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: The Ten Collaterals Showcase */}
      {activeStoryTab === 'collaterals' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Collateral Grid Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {COLLATERALS_DATA.map((col) => {
              const isSelected = selectedCollateral?.id === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => {
                    doorChime.playChime();
                    setSelectedCollateral(col);
                  }}
                  className={`p-3 rounded-card border text-left transition-all ${
                    isSelected
                      ? 'bg-ink text-paper border-ink shadow-md'
                      : 'bg-paper text-ink border-ink/15 hover:border-amber hover:bg-paper-warm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-mono font-bold ${isSelected ? 'text-amber' : 'text-terracotta'}`}>
                      {col.number}
                    </span>
                    <span className="text-[10px] text-ink/50 font-mono">
                      {col.dimensions[0]}
                    </span>
                  </div>
                  <div className={`font-serif font-bold text-sm leading-tight ${isSelected ? 'text-paper' : 'text-ink'}`}>
                    {col.name}
                  </div>
                  <div className={`text-[11px] italic font-serif mt-1 ${isSelected ? 'text-paper/70' : 'text-ink/60'}`}>
                    {col.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Collateral Full Specification Card */}
          {selectedCollateral && (
            <div className="bg-paper-card border-2 border-ink/20 rounded-card p-6 sm:p-8 shadow-board">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink/15">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-amber text-ink">
                      COLLATERAL {selectedCollateral.number}
                    </span>
                    <div className="flex gap-1.5">
                      {selectedCollateral.dimensions.map((dim) => (
                        <span key={dim} className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/10 text-ink/70 font-semibold">
                          {dim}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-ink">
                    {selectedCollateral.name}
                  </h3>
                  <p className="font-serif italic text-sm text-terracotta">
                    “{selectedCollateral.tagline}”
                  </p>
                </div>

                <div className="bg-paper-warm p-3 rounded-chip border border-ink/10 text-xs font-mono text-ink/80">
                  {selectedCollateral.specification}
                </div>
              </div>

              {/* What it does */}
              <div className="my-5">
                <span className="text-xs font-mono uppercase text-ink/50 font-bold block mb-1">
                  What it does
                </span>
                <p className="font-serif text-lg text-ink leading-relaxed">
                  {selectedCollateral.whatItDoes}
                </p>
              </div>

              {/* Identity Applied */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 bg-paper-warm p-4 rounded-chip border border-ink/10">
                {selectedCollateral.identityApplied.visual && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-terracotta font-bold block mb-1">Visual</span>
                    <p className="text-xs text-ink/80">{selectedCollateral.identityApplied.visual}</p>
                  </div>
                )}
                {selectedCollateral.identityApplied.spatial && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink font-bold block mb-1">Spatial</span>
                    <p className="text-xs text-ink/80">{selectedCollateral.identityApplied.spatial}</p>
                  </div>
                )}
                {selectedCollateral.identityApplied.experiential && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-sage-dark font-bold block mb-1">Experiential</span>
                    <p className="text-xs text-ink/80">{selectedCollateral.identityApplied.experiential}</p>
                  </div>
                )}
                {selectedCollateral.identityApplied.aural && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-dark font-bold block mb-1">Aural</span>
                    <p className="text-xs text-ink/80">{selectedCollateral.identityApplied.aural}</p>
                  </div>
                )}
              </div>

              {/* Do / Avoid Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[#EBF3ED] rounded-chip border border-sage text-xs">
                  <strong className="text-ink font-bold block mb-1">DO:</strong>
                  {selectedCollateral.doText}
                </div>
                <div className="p-3 bg-[#F8E8E4] rounded-chip border border-terracotta/40 text-xs">
                  <strong className="text-terracotta font-bold block mb-1">AVOID:</strong>
                  {selectedCollateral.avoidText}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Consistency Checklist */}
      {activeStoryTab === 'checklist' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-paper-card border border-ink/15 rounded-card p-6 sm:p-8 shadow-paper">
            <div className="mb-6 pb-4 border-b border-ink/10">
              <span className="text-xs font-mono uppercase font-bold text-terracotta">
                Implementation & Quality Control
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink mt-1">
                Design System Consistency Checklist
              </h3>
              <p className="text-xs text-ink/65">
                Run through this before anything is printed, built or published. Grounded in page 33 of the guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 rounded-chip border cursor-pointer flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-ink text-paper border-ink shadow-sm'
                        : 'bg-paper text-ink border-ink/15 hover:border-amber hover:bg-paper-warm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-chip border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-amber border-amber text-ink' : 'border-ink/30 bg-paper'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono uppercase ${isChecked ? 'text-amber' : 'text-ink/50'}`}>
                          {item.category}
                        </span>
                        <div className={`text-xs font-medium ${isChecked ? 'text-paper' : 'text-ink'}`}>
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-paper-deep rounded-chip border border-ink/10 flex items-center justify-between text-xs text-ink/80">
              <span>
                Completed: {Object.values(checkedItems).filter(Boolean).length} / {checklistItems.length} checks passed
              </span>
              <button
                onClick={() => {
                  doorChime.playChime();
                  const all: Record<string, boolean> = {};
                  checklistItems.forEach((it) => (all[it.id] = true));
                  setCheckedItems(all);
                }}
                className="font-bold text-terracotta hover:underline"
              >
                Mark all verified
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
