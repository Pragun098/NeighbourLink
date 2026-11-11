import React, { useState } from 'react';
import type { OpenDoorCard } from '../../types';
import { X, Printer, Plus } from 'lucide-react';
import { doorChime } from '../../utils/audio';

interface CardModalProps {
  card?: OpenDoorCard | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNewCard?: (card: OpenDoorCard) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card,
  isOpen,
  onClose,
  onSaveNewCard,
}) => {
  const isCreating = !card;

  const [formData, setFormData] = useState({
    festival: 'Festival of Lights (Diwali)',
    dayAndTime: 'Saturday, 7:00 PM',
    hostNickname: 'No. 14, the blue gate',
    description: 'Come for ten minutes or the whole evening. Warm tea on the step.',
    welcomingPhrase: 'Come for ten minutes or the whole evening. No reply needed.',
  });

  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSaveNewCard) return;

    doorChime.playChime();
    const newCard: OpenDoorCard = {
      id: `card-${Date.now()}`,
      festival: formData.festival,
      dayAndTime: formData.dayAndTime,
      hostNickname: formData.hostNickname,
      description: formData.description,
      welcomingPhrase: formData.welcomingPhrase,
      pinnedAt: 'Just now',
      colorVariant: 'terracotta',
    };

    onSaveNewCard(newCard);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const displayData = isCreating ? formData : {
    festival: card.festival,
    dayAndTime: card.dayAndTime,
    hostNickname: card.hostNickname,
    description: card.description || '',
    welcomingPhrase: card.welcomingPhrase,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper rounded-card max-w-2xl w-full border border-ink/20 shadow-board overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-ink text-paper px-6 py-4 flex items-center justify-between border-b border-paper/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber" />
            <h3 className="font-serif text-lg font-bold">
              {isCreating ? 'Pin an Open Door Card' : 'Open Door Card · Collateral 02'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-paper/70 hover:text-paper rounded-chip hover:bg-paper/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Card Preview Toggle (Front / Back) */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-ink/60 font-mono">
              A6 350 GSM Recycled Card Preview
            </span>
            <div className="inline-flex rounded-chip p-1 bg-paper-deep text-xs font-medium">
              <button
                onClick={() => setCardSide('front')}
                className={`px-3 py-1 rounded-chip ${cardSide === 'front' ? 'bg-ink text-paper' : 'text-ink/70'}`}
              >
                Front Side
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`px-3 py-1 rounded-chip ${cardSide === 'back' ? 'bg-ink text-paper' : 'text-ink/70'}`}
              >
                Back (Roofline Pattern)
              </button>
            </div>
          </div>

          {/* Realistic A6 Card Component */}
          <div className="flex justify-center">
            {cardSide === 'front' ? (
              /* FRONT SIDE of A6 Card */
              <div className="w-full max-w-md bg-paper-card border-2 border-ink/20 rounded-card shadow-paper overflow-hidden transition-all duration-300">
                {/* Terracotta Header with Logo Lamp */}
                <div className="bg-terracotta text-paper px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Mini House Mark */}
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 bg-paper rounded-xs inline-block" />
                      <span className="w-2 h-2 rounded-full bg-amber" />
                      <span className="w-3.5 h-3.5 bg-ink rounded-xs inline-block" />
                    </div>
                    <span className="font-serif font-bold text-sm tracking-wider uppercase">
                      OUR DOOR IS OPEN
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-paper/80">NeighbourLink</span>
                </div>

                {/* Fill-in lines container */}
                <div className="p-6 space-y-4">
                  {/* Festival Field */}
                  <div className="border-b-2 border-ink/30 pb-1">
                    <span className="text-[11px] font-mono uppercase text-ink/50 block">Festival / Occasion</span>
                    <span className="font-handwriting text-2xl text-ink font-bold leading-tight block">
                      {displayData.festival || 'Community celebration'}
                    </span>
                  </div>

                  {/* Day and Time */}
                  <div className="border-b-2 border-ink/30 pb-1">
                    <span className="text-[11px] font-mono uppercase text-ink/50 block">Day and time</span>
                    <span className="font-handwriting text-xl text-ink font-bold block">
                      {displayData.dayAndTime || 'Saturday, 7:00 PM'}
                    </span>
                  </div>

                  {/* From House number or nickname */}
                  <div className="border-b-2 border-ink/30 pb-1">
                    <span className="text-[11px] font-mono uppercase text-ink/50 block">From (house number or nickname)</span>
                    <span className="font-handwriting text-xl text-ink font-bold block">
                      {displayData.hostNickname || 'No. 14, the blue gate'}
                    </span>
                  </div>

                  {displayData.description && (
                    <div className="bg-paper-warm/80 p-3 rounded-chip border border-ink/10 text-xs text-ink/80 italic font-serif">
                      {displayData.description}
                    </div>
                  )}

                  {/* Standard Printed Footer on card */}
                  <div className="pt-2 text-center border-t border-ink/15">
                    <p className="font-serif text-sm font-semibold text-terracotta">
                      Come for ten minutes or the whole evening.
                    </p>
                    <p className="font-serif italic text-xs text-ink/70">
                      No reply needed.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* BACK SIDE of A6 Card: Ink Ground with Roofline Pattern */
              <div className="w-full max-w-md h-72 bg-ink text-paper rounded-card shadow-paper p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Roofline Repeat Pattern */}
                <div className="absolute inset-0 opacity-15 flex flex-wrap gap-4 p-4 pointer-events-none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="flex gap-1 items-end">
                      <div className="w-4 h-4 bg-paper/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                      <div className="w-4 h-4 bg-paper/40" />
                    </div>
                  ))}
                </div>

                <div className="relative z-10 flex justify-between items-center text-xs text-paper/60 font-mono">
                  <span>CARD 02</span>
                  <span>A6 · 350 GSM</span>
                </div>

                <div className="relative z-10 text-center space-y-2">
                  <div className="w-6 h-6 rounded-full bg-amber mx-auto shadow-lamp" />
                  <div className="font-serif text-2xl font-bold tracking-tight">
                    Neighbour<span className="text-amber">Link</span>
                  </div>
                  <p className="text-xs text-paper/80 font-serif italic max-w-xs mx-auto">
                    “An open door cannot exclude. Come as you are, whenever you can.”
                  </p>
                </div>

                <div className="relative z-10 text-center text-[11px] text-paper/50">
                  Voluntary · Paper-first · No RSVP required
                </div>
              </div>
            )}
          </div>

          {/* Form for Creating a New Card */}
          {isCreating && (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-ink/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                    Festival or Occasion Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.festival}
                    onChange={(e) => setFormData({ ...formData, festival: e.target.value })}
                    placeholder="e.g. Festival of Lights, Harvest Tea"
                    className="w-full px-3 py-2 text-sm bg-paper-card border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                    Day & Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dayAndTime}
                    onChange={(e) => setFormData({ ...formData, dayAndTime: e.target.value })}
                    placeholder="e.g. Saturday, 7:00 PM"
                    className="w-full px-3 py-2 text-sm bg-paper-card border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                  From (House number or nickname — no personal names needed)
                </label>
                <input
                  type="text"
                  required
                  value={formData.hostNickname}
                  onChange={(e) => setFormData({ ...formData, hostNickname: e.target.value })}
                  placeholder="e.g. No. 14, the blue gate / House 8"
                  className="w-full px-3 py-2 text-sm bg-paper-card border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                  Welcoming phrase (Warm, unhurried, low-pressure)
                </label>
                <select
                  value={formData.welcomingPhrase}
                  onChange={(e) => setFormData({ ...formData, welcomingPhrase: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-paper-card border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                >
                  <option value="Come for ten minutes or the whole evening. No reply needed.">
                    “Come for ten minutes or the whole evening. No reply needed.”
                  </option>
                  <option value="Come as you are, whenever you can.">
                    “Come as you are, whenever you can.”
                  </option>
                  <option value="Our door is open. Come if you can.">
                    “Our door is open. Come if you can.”
                  </option>
                  <option value="Thinking of you this festival. No reply needed.">
                    “Thinking of you this festival. No reply needed.”
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                  Optional Short Note (What will be shared?)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. We will have warm tea and sweet treats on the patio step."
                  className="w-full px-3 py-2 text-sm bg-paper-card border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                />
              </div>

              <div className="bg-sage-faint p-3 rounded-chip border border-sage/30 text-xs text-ink/80">
                <span className="font-bold text-ink">Design Rule Check:</span> No RSVP lines or guest lists. We ask nothing of anyone.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-ink/70 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-chip bg-terracotta text-paper text-sm font-bold flex items-center gap-2 hover:bg-terracotta-dark shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Pin Card to Board</span>
                </button>
              </div>
            </form>
          )}

          {/* Action buttons if inspecting existing card */}
          {!isCreating && (
            <div className="flex items-center justify-between pt-4 border-t border-ink/10">
              <span className="text-xs text-ink/60 font-mono">
                Pinned at the gate board · Pinned {card.pinnedAt}
              </span>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-chip bg-ink text-paper text-xs font-bold flex items-center gap-2 hover:bg-ink-light transition-all"
              >
                <Printer className="w-4 h-4 text-amber" />
                <span>Print Card (A6 350gsm)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
