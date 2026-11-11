import React, { useState } from 'react';
import type { NeighbourNote } from '../../types';
import { X, Volume2, Scissors } from 'lucide-react';
import { doorChime } from '../../utils/audio';

interface NeighbourNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: NeighbourNote) => void;
}

export const NeighbourNoteModal: React.FC<NeighbourNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
}) => {
  const [customLine, setCustomLine] = useState('');
  const [senderNickname, setSenderNickname] = useState('');
  const [isTearing, setIsTearing] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  if (!isOpen) return null;

  const handleTearAndLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLine.trim()) return;

    doorChime.playChime();
    setIsTearing(true);

    setTimeout(() => {
      const newNote: NeighbourNote = {
        id: `note-${Date.now()}`,
        message: customLine.trim(),
        senderNickname: senderNickname.trim() || undefined,
        timestamp: 'Just now',
      };
      onAddNote(newNote);
      setIsTearing(false);
      onClose();
    }, 600);
  };

  const handleReadAloud = () => {
    setIsReadingAloud(true);
    const textToRead = `Thinking of you this festival. ${customLine || 'Warm wishes from the lane.'} No reply needed.`;
    doorChime.speakText(textToRead, 'en', () => {
      setIsReadingAloud(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper rounded-card max-w-lg w-full border border-ink/20 shadow-board overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-sage text-ink px-6 py-4 flex items-center justify-between border-b border-ink/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber" />
            <h3 className="font-serif text-lg font-bold">
              Neighbour Note Pad · Collateral 03
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink/70 hover:text-ink rounded-chip hover:bg-ink/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Tear-off Slip Pad */}
        <div className="p-6 space-y-6">
          <div className="text-xs text-ink/70">
            A gum-bound pad on the board shelf. Tear off a warm word and leave it on the board shelf or slip it at a door.
            <strong className="text-ink"> Unsigned is fine.</strong> No reply asked.
          </div>

          {/* Interactive Gum-Bound Slip */}
          <div
            className={`w-full bg-[#E5EEE8] border border-sage rounded-chip shadow-paper overflow-hidden transition-all duration-500 relative ${
              isTearing ? 'translate-y-8 opacity-0 scale-95 rotate-2' : ''
            }`}
          >
            {/* Gummed Terracotta Strip on top */}
            <div className="bg-terracotta h-3 w-full border-b border-terracotta-dark/30 flex items-center justify-center">
              <span className="text-[8px] text-paper/70 tracking-widest uppercase font-mono">Gum Bound · Tear Here</span>
            </div>

            {/* Note Paper Body */}
            <div className="p-5 space-y-4">
              <div className="font-serif italic text-lg sm:text-xl text-ink font-semibold">
                Thinking of you this festival.
              </div>

              {/* Lined write area */}
              <div className="border-b border-sage-dark/30 pt-1 pb-2">
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Write one warm line here... (e.g. Hope the autumn brings quiet joy)"
                  value={customLine}
                  onChange={(e) => setCustomLine(e.target.value)}
                  className="w-full bg-transparent font-handwriting text-2xl text-ink placeholder:text-ink/40 focus:outline-none"
                />
              </div>

              {/* Optional Signature or House Nickname */}
              <div className="flex items-center justify-between text-xs text-ink/60 pt-2">
                <input
                  type="text"
                  placeholder="Leave unsigned, or nickname"
                  value={senderNickname}
                  onChange={(e) => setSenderNickname(e.target.value)}
                  className="bg-transparent font-handwriting text-lg text-ink/80 placeholder:text-ink/40 focus:outline-none w-48"
                />

                {/* Printed bottom line: No reply needed + amber dot */}
                <div className="flex items-center gap-1.5 font-serif italic text-xs text-ink/80">
                  <span>No reply needed.</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber inline-block" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <form onSubmit={handleTearAndLeave} className="space-y-4 pt-2">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReadAloud}
                className={`px-3 py-2 rounded-chip text-xs font-semibold flex items-center gap-1.5 border border-ink/20 ${
                  isReadingAloud ? 'bg-amber text-ink' : 'bg-paper-warm text-ink hover:border-amber'
                }`}
                title="The Link Host will read notes aloud on request"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-dark" />
                <span>Link Host Read Aloud</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-ink/70 hover:text-ink"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!customLine.trim()}
                  className="px-4 py-2 rounded-chip bg-ink text-paper text-xs font-bold flex items-center gap-2 hover:bg-ink-light disabled:opacity-40 transition-all shadow-sm"
                >
                  <Scissors className="w-3.5 h-3.5 text-amber" />
                  <span>Tear & Leave Note</span>
                </button>
              </div>
            </div>
          </form>

          {/* Collateral Rule */}
          <div className="p-3 bg-paper-deep rounded-chip text-[11px] text-ink/70">
            <strong className="text-ink">Collateral 03 Rule:</strong> One warm line, nothing more. AVOID asking for an explanation, why they did not attend, or requiring a reply.
          </div>
        </div>
      </div>
    </div>
  );
};
