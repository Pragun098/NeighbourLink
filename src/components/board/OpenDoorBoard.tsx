import React, { useState } from 'react';
import type { OpenDoorCard, NeighbourNote } from '../../types';
import { CardModal } from './CardModal';
import { NeighbourNoteModal } from './NeighbourNoteModal';
import { Plus, Sun, Moon, QrCode, FileText } from 'lucide-react';
import { doorChime } from '../../utils/audio';

interface OpenDoorBoardProps {
  cards: OpenDoorCard[];
  notes: NeighbourNote[];
  onAddCard: (card: OpenDoorCard) => void;
  onAddNote: (note: NeighbourNote) => void;
  onNavigateToMirror: () => void;
}

export const OpenDoorBoard: React.FC<OpenDoorBoardProps> = ({
  cards,
  notes,
  onAddCard,
  onAddNote,
  onNavigateToMirror,
}) => {
  const [isDuskLit, setIsDuskLit] = useState(true);
  const [selectedCard, setSelectedCard] = useState<OpenDoorCard | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const toggleDuskLight = () => {
    doorChime.playChime();
    setIsDuskLit(!isDuskLit);
  };

  const handleOpenCard = (card: OpenDoorCard) => {
    doorChime.playChime();
    setSelectedCard(card);
    setIsCardModalOpen(true);
  };

  const handleStartCreateCard = () => {
    doorChime.playChime();
    setSelectedCard(null);
    setIsCardModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* View Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/20 text-ink text-xs font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          Collateral 01 · Communal Noticeboard at the Gate
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-2">The Open Door Board</h2>
        <p className="text-ink/75 text-sm sm:text-base">
          A neutral shared space at the lane gate where open invitations are visible to everyone, so nobody has to guess.
          Weatherproof, strap-mounted, and lit at dusk.
        </p>

        {/* Board Lighting & Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            onClick={toggleDuskLight}
            className={`flex items-center gap-2 px-4 py-2 rounded-chip text-xs font-bold border transition-all ${
              isDuskLit
                ? 'bg-amber text-ink border-amber shadow-lamp'
                : 'bg-paper-warm text-ink/70 border-ink/20 hover:border-amber'
            }`}
          >
            {isDuskLit ? <Sun className="w-4 h-4 text-ink" /> : <Moon className="w-4 h-4 text-ink/50" />}
            <span>{isDuskLit ? 'Lit at Dusk (2700K Solar)' : 'Unlit (Daytime)'}</span>
          </button>

          <button
            onClick={handleStartCreateCard}
            className="flex items-center gap-2 px-4 py-2 rounded-chip bg-terracotta text-paper text-xs font-bold hover:bg-terracotta-dark shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Pin an Open Door Card</span>
          </button>

          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-chip bg-sage text-ink text-xs font-bold hover:bg-sage-dark hover:text-paper shadow-sm transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Take a Neighbour Note</span>
          </button>
        </div>
      </div>

      {/* Physical Board Simulation Container */}
      <div className="relative max-w-4xl mx-auto my-8">
        {/* Physical Mounting Straps (Strap-mounted, no drilling) */}
        <div className="absolute -top-6 left-16 w-4 h-12 bg-ink/40 rounded-sm z-0" />
        <div className="absolute -top-6 right-16 w-4 h-12 bg-ink/40 rounded-sm z-0" />

        {/* Terracotta Pitched Roof */}
        <div className="relative z-10 w-full">
          <div className="mx-auto w-[104%] -ml-[2%] h-12 bg-terracotta rounded-t-xl shadow-md flex items-center justify-center relative overflow-hidden">
            {/* Wooden overhang shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-terracotta-dark/40" />
            <div className="text-center font-mono text-[11px] uppercase tracking-widest text-paper/80 font-bold">
              COMMUNAL GATE NOTICEBOARD · 90 × 120 CM
            </div>
          </div>
        </div>

        {/* Board Main Ink Wooden Body */}
        <div
          className={`relative z-10 bg-ink rounded-b-card p-6 sm:p-10 border-4 border-t-0 border-terracotta shadow-board transition-all duration-500 ${
            isDuskLit ? 'ring-8 ring-amber/20 shadow-lamp-lg' : ''
          }`}
        >
          {/* Top Amber Lamp in the Gap below the roof */}
          <div className="flex flex-col items-center justify-center -mt-3 mb-8">
            <div
              className={`w-12 h-12 rounded-full transition-all duration-700 flex items-center justify-center ${
                isDuskLit
                  ? 'bg-amber shadow-lamp-lg scale-110'
                  : 'bg-amber-dark/40 opacity-70'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-paper/60 blur-[1px]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper tracking-tight mt-3">
              Open Door Board
            </h3>
            <p className="text-paper/70 font-serif italic text-xs mt-0.5">
              Every door, a little open. Come as you are, whenever you can.
            </p>
          </div>

          {/* Notice Board Cards Grid (Open Door Cards pinned to board) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            {cards.map((card) => {
              return (
                <div
                  key={card.id}
                  onClick={() => handleOpenCard(card)}
                  className="bg-paper-card border border-paper/40 rounded-card p-5 cursor-pointer shadow-paper hover:-translate-y-1 transition-all duration-200 relative group"
                >
                  {/* Decorative Pin at top center */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber border-2 border-ink shadow-sm flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-paper" />
                  </div>

                  {/* Terracotta Header */}
                  <div className="bg-terracotta text-paper px-3 py-1.5 -mx-5 -mt-5 rounded-t-card flex items-center justify-between mb-3">
                    <span className="font-serif text-xs font-bold uppercase tracking-wider">
                      OUR DOOR IS OPEN
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber" />
                  </div>

                  {/* Card Content lines */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-ink/50">Festival</span>
                      <h4 className="font-handwriting text-2xl font-bold text-ink leading-tight">
                        {card.festival}
                      </h4>
                    </div>

                    <div className="bg-paper-warm/70 p-2 rounded-chip border border-ink/5">
                      <div className="text-xs font-bold text-ink">{card.dayAndTime}</div>
                      <div className="text-xs text-ink/70">From: {card.hostNickname}</div>
                    </div>

                    <p className="font-serif italic text-xs text-ink/80 pt-1">
                      “{card.welcomingPhrase}”
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-ink/50 pt-2 border-t border-ink/10">
                      <span>No reply needed.</span>
                      <span className="text-terracotta font-medium group-hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Shelf / Linger Area (as required in PDF: "with a shelf to linger at") */}
          <div className="bg-ink-dark rounded-card p-5 border border-paper/15 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Shelf Item 1: Take a Note pad shelf */}
            <div className="bg-sage/20 border border-sage/40 rounded-chip p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-paper font-serif uppercase tracking-wider">
                  Take a Note Shelf
                </span>
                <span className="text-[10px] font-mono text-sage">Collateral 03</span>
              </div>
              <p className="text-xs text-paper/80 mb-3">
                Gum-bound pad of Neighbour Notes. Leave a kind word with no reply needed.
              </p>
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="w-full py-2 px-3 rounded-chip bg-sage text-ink font-bold text-xs hover:bg-sage-light transition-colors text-center"
              >
                Tear Off a Note ({notes.length} on shelf)
              </button>
            </div>

            {/* Shelf Item 2: QR Plaque to Mirror Page */}
            <div
              onClick={onNavigateToMirror}
              className="bg-paper text-ink rounded-chip p-3.5 border border-amber/50 flex items-center gap-3 cursor-pointer hover:bg-paper-warm transition-all group"
            >
              <div className="w-12 h-12 bg-ink text-paper rounded-chip flex items-center justify-center shrink-0 group-hover:bg-amber group-hover:text-ink transition-colors">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-terracotta uppercase font-bold">
                  Collateral 08
                </span>
                <h5 className="font-serif font-bold text-sm text-ink group-hover:text-terracotta">
                  Scan for Mirror Page
                </h5>
                <p className="text-[11px] text-ink/70">
                  Read-only digital copy for people who cannot visit.
                </p>
              </div>
            </div>

            {/* Shelf Item 3: Volunteer Link Host bounded role plaque */}
            <div className="bg-terracotta/20 border border-terracotta/40 rounded-chip p-3.5 text-paper">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-serif uppercase text-amber">
                  Link Host Kit
                </span>
                <span className="text-[10px] font-mono text-paper/60">Collateral 09</span>
              </div>
              <p className="font-serif italic text-sm text-paper font-semibold">
                “I keep the board. I don’t mediate.”
              </p>
              <p className="text-[11px] text-paper/70 mt-1">
                A bounded resident role. The host keeps cards stocked and reads aloud on request.
              </p>
            </div>
          </div>
        </div>

        {/* Board Wooden Support Posts (grounded at gate) */}
        <div className="flex justify-between px-16 -mt-2">
          <div className="w-8 h-20 bg-ink-dark rounded-b-md shadow-md border-x-2 border-ink" />
          <div className="w-8 h-20 bg-ink-dark rounded-b-md shadow-md border-x-2 border-ink" />
        </div>
      </div>

      {/* Shelf Notes Preview Section */}
      {notes.length > 0 && (
        <div className="mt-12 bg-paper-card border border-ink/10 rounded-card p-6 shadow-paper">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-ink/10">
            <div>
              <h4 className="font-serif text-xl font-bold text-ink">Notes Left on the Board Shelf</h4>
              <p className="text-xs text-ink/60">Small warm gestures left by neighbours. No names needed.</p>
            </div>
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Leave a warm note</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-[#EBF3ED] border border-sage/60 rounded-chip p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-ink/50 uppercase mb-1 flex items-center justify-between">
                    <span>Neighbour Note</span>
                    <span className="w-2 h-2 rounded-full bg-amber" />
                  </div>
                  <p className="font-handwriting text-xl text-ink font-semibold leading-snug">
                    “{note.message}”
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-sage/30 flex items-center justify-between text-[11px] text-ink/60">
                  <span className="italic font-serif">{note.senderNickname || 'A neighbour'}</span>
                  <span className="text-[10px] font-mono">{note.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CardModal
        card={selectedCard}
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSaveNewCard={(newCard) => onAddCard(newCard)}
      />

      <NeighbourNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onAddNote={(newNote) => onAddNote(newNote)}
      />
    </div>
  );
};
