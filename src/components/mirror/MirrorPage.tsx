import React, { useState } from 'react';
import type { OpenDoorCard } from '../../types';
import { doorChime } from '../../utils/audio';
import { Volume2, Calendar, Check, Smartphone, Monitor, ChevronRight, Info } from 'lucide-react';
import { TRANSLATIONS } from '../../data/mockData';

interface MirrorPageProps {
  cards: OpenDoorCard[];
  isLargeText: boolean;
  onToggleTextSize: () => void;
}

export const MirrorPage: React.FC<MirrorPageProps> = ({
  cards,
  isLargeText,
  onToggleTextSize,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const handleCardClick = (id: string) => {
    doorChime.playChime();
    setSelectedCardId(id);
  };

  const handleListen = () => {
    if (isSpeaking) {
      doorChime.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const speechScript = `Welcome to NeighbourLink. Open this week: ` +
      cards.map((c) => `${c.festival}, ${c.dayAndTime} at ${c.hostNickname}. ${c.welcomingPhrase}`).join('. ') +
      `. We do not record who comes. Come as you are.`;

    doorChime.speakText(speechScript, currentLang, () => {
      setIsSpeaking(false);
    });
  };

  // Generate and download a standard .ics calendar invite
  const handleSaveTheDate = (card: OpenDoorCard) => {
    doorChime.playChime();
    
    // Create ICS file content
    const now = new Date();
    const startTime = card.dateIso ? new Date(card.dateIso) : new Date(now.getTime() + 86400000 * 2);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    const formatDateForICS = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NeighbourLink//Open Door Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${card.id}@neighbourlink.local`,
      `DTSTAMP:${formatDateForICS(now)}`,
      `DTSTART:${formatDateForICS(startTime)}`,
      `DTEND:${formatDateForICS(endTime)}`,
      `SUMMARY:${card.festival} (Open Door)`,
      `DESCRIPTION:${card.welcomingPhrase}\\n${card.description || ''}\\n(NeighbourLink: We do not record who comes)`,
      `LOCATION:${card.hostNickname}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${card.festival.replace(/\s+/g, '_')}_NeighbourLink.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification('Calendar invitation downloaded (.ics)');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Intro Header & Educational Notice */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/20 text-ink text-xs font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          Collateral 08 · Digital Read-Only Companion
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-2">The Mirror Page</h2>
        <p className="text-ink/75 text-sm sm:text-base">
          A read-only copy of the physical gate board for people who cannot visit it in person.
          No log-in, no accounts, no attendance kept, and no RSVP.
        </p>

        {/* View mode toggle */}
        <div className="mt-4 inline-flex p-1 bg-paper-deep rounded-chip border border-ink/10 text-xs">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-chip font-medium transition-all ${
              viewMode === 'mobile' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Board View (Resident Phone)</span>
          </button>
          <button
            onClick={() => setViewMode('expanded')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-chip font-medium transition-all ${
              viewMode === 'expanded' ? 'bg-ink text-paper shadow-sm' : 'text-ink/70 hover:text-ink'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Side-by-Side View</span>
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="fixed top-24 right-6 z-50 bg-ink text-paper px-4 py-2.5 rounded-chip shadow-board flex items-center gap-2 text-sm border-l-4 border-amber animate-fadeIn">
          <Check className="w-4 h-4 text-amber" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Main Mirror Page Display */}
      {viewMode === 'mobile' ? (
        /* Mobile Device Frame Mockup */
        <div className="flex justify-center items-start py-4">
          <div className="w-full max-w-[390px] bg-paper border-[8px] border-ink/90 rounded-[40px] shadow-board overflow-hidden transition-all duration-300">
            {/* Phone Speaker Notch */}
            <div className="bg-ink/90 pt-3 pb-2 flex justify-center">
              <div className="w-20 h-3.5 bg-paper/20 rounded-full" />
            </div>

            {/* Inner Phone Content */}
            <div className={`p-5 min-h-[600px] flex flex-col justify-between ${isLargeText ? 'text-lg' : 'text-base'}`}>
              <div>
                {/* Top Controls Bar from Guidelines: Language, A+, Listen */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-ink/10">
                  {/* Language Selector */}
                  <select
                    value={currentLang}
                    onChange={(e) => setCurrentLang(e.target.value)}
                    className="bg-paper-warm text-ink text-xs font-semibold px-2.5 py-1.5 rounded-chip border border-ink/20 focus:outline-none focus:border-amber"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="hi">हिन्दी</option>
                    <option value="bn">বাংলা</option>
                  </select>

                  <div className="flex items-center gap-2">
                    {/* A+ Text Size */}
                    <button
                      onClick={onToggleTextSize}
                      className="px-2.5 py-1 bg-paper-warm text-ink text-xs font-bold rounded-chip border border-ink/20 hover:border-ink/40"
                      title="Adjust font size"
                    >
                      {isLargeText ? 'A' : 'A+'}
                    </button>

                    {/* Listen Button */}
                    <button
                      onClick={handleListen}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-chip text-xs font-bold transition-all ${
                        isSpeaking
                          ? 'bg-amber text-ink border border-amber animate-pulse'
                          : 'bg-paper-warm text-ink border border-ink/20 hover:border-amber'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-dark" />
                      <span>{isSpeaking ? 'Reading...' : t.listenText}</span>
                    </button>
                  </div>
                </div>

                {/* Brand Header */}
                <div className="py-4 text-center">
                  <h1 className="font-serif text-2xl font-bold text-ink tracking-tight">
                    Neighbour<span className="text-amber">Link</span>
                  </h1>
                  <p className="text-[11px] text-ink/60 font-serif italic">Every door, a little open.</p>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider">
                    {t.openThisWeek}
                  </h3>
                  <span className="text-xs text-ink/50 font-mono">{cards.length} doors open</span>
                </div>

                {/* Open Doors List */}
                <div className="space-y-2.5 mb-5">
                  {cards.map((card) => {
                    const isSelected = card.id === selectedCardId;
                    return (
                      <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`w-full text-left p-3.5 rounded-card border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-ink text-paper border-ink shadow-sm'
                            : 'bg-paper-card text-ink border-ink/10 hover:border-amber hover:bg-paper-warm'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {/* The Amber Dot per open door */}
                          <span
                            className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                              isSelected ? 'bg-amber animate-pulse' : 'bg-amber'
                            }`}
                          />
                          <div>
                            <div className={`font-semibold text-sm ${isSelected ? 'text-paper' : 'text-ink'}`}>
                              {card.dayAndTime}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-paper/80' : 'text-ink/70'}`}>
                              {card.hostNickname}
                            </div>
                            <div className={`text-xs mt-0.5 font-serif italic ${isSelected ? 'text-amber-light' : 'text-terracotta'}`}>
                              {card.festival}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber' : 'text-ink/30'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Active Card Expanded View (as shown on page 13/29) */}
                {activeCard && (
                  <div className="bg-paper-card border border-ink/15 rounded-card p-4 shadow-paper mb-4 relative overflow-hidden">
                    {/* Terracotta Top Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-terracotta" />

                    <div className="flex items-center justify-between mb-2 pt-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-terracotta font-serif">
                        Our door is open
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                    </div>

                    <h4 className="font-serif text-lg font-bold text-ink leading-tight">
                      {activeCard.festival}
                    </h4>

                    <div className="my-2.5 space-y-1 text-sm bg-paper-warm p-2.5 rounded-chip border border-ink/5">
                      <div className="font-semibold text-ink">{activeCard.dayAndTime}</div>
                      <div className="text-ink/80 text-xs">{activeCard.hostNickname}</div>
                      {activeCard.description && (
                        <p className="text-ink/70 text-xs pt-1 border-t border-ink/10">
                          {activeCard.description}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-ink/80 italic font-serif my-3">
                      “{activeCard.welcomingPhrase}”
                    </p>

                    {/* Save the date Button */}
                    <button
                      onClick={() => handleSaveTheDate(activeCard)}
                      className="w-full py-2.5 px-4 rounded-chip bg-ink text-paper text-xs font-bold flex items-center justify-center gap-2 hover:bg-ink-light transition-colors shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber" />
                      <span>{t.saveDate}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Strict Reassurance Footer Note */}
              <div className="pt-3 border-t border-ink/10 text-center">
                <p className="text-[11px] text-ink/70 font-sans font-medium flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  {t.noTracking}
                </p>
                <p className="text-[10px] text-ink/50 mt-1">
                  No account required · No replies requested
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Side-by-Side Responsive View (Table / Desktop) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: The Open List */}
          <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper">
            {/* Top Controls Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-ink/10 mb-4">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-paper-warm text-ink text-xs font-semibold px-3 py-1.5 rounded-chip border border-ink/20"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleTextSize}
                  className="px-3 py-1.5 bg-paper-warm text-ink text-xs font-bold rounded-chip border border-ink/20 hover:border-ink/40"
                >
                  {isLargeText ? 'Normal text' : 'A+ Enlarge'}
                </button>
                <button
                  onClick={handleListen}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-chip text-xs font-bold transition-all ${
                    isSpeaking
                      ? 'bg-amber text-ink border border-amber shadow-lamp'
                      : 'bg-paper-warm text-ink border border-ink/20 hover:border-amber'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-dark" />
                  <span>{isSpeaking ? 'Reading aloud...' : t.listenText}</span>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-xl font-bold text-ink">{t.openThisWeek}</h3>
              <p className="text-xs text-ink/60">Tap any open door to view details and save to your calendar.</p>
            </div>

            <div className="space-y-3">
              {cards.map((card) => {
                const isSelected = card.id === selectedCardId;
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`p-4 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-ink text-paper border-ink shadow-md'
                        : 'bg-paper text-ink border-ink/10 hover:border-amber hover:bg-paper-warm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-3 h-3 rounded-full bg-amber mt-1 shrink-0" />
                      <div>
                        <div className={`font-bold ${isLargeText ? 'text-base' : 'text-sm'} ${isSelected ? 'text-paper' : 'text-ink'}`}>
                          {card.dayAndTime}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-paper/80' : 'text-ink/70'}`}>
                          {card.hostNickname}
                        </div>
                        <div className={`text-xs font-serif italic mt-1 ${isSelected ? 'text-amber' : 'text-terracotta'}`}>
                          {card.festival}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-amber' : 'text-ink/30'}`} />
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-ink/10 text-center text-xs text-ink/70">
              <span className="w-2 h-2 rounded-full bg-sage inline-block mr-1.5" />
              {t.noTracking}
            </div>
          </div>

          {/* Right Column: The Selected Card Detail */}
          {activeCard && (
            <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-board relative">
              <div className="bg-terracotta text-paper px-4 py-2 rounded-t-chip -mt-6 -mx-6 mb-5 flex items-center justify-between">
                <span className="font-serif font-bold text-sm tracking-wide">OUR DOOR IS OPEN</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink/50">Occasion / Festival</span>
                  <h4 className="font-serif text-2xl font-bold text-ink">{activeCard.festival}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-paper-warm p-4 rounded-chip border border-ink/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink/50">Day and time</span>
                    <div className="font-semibold text-sm text-ink">{activeCard.dayAndTime}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink/50">From</span>
                    <div className="font-semibold text-sm text-ink">{activeCard.hostNickname}</div>
                  </div>
                </div>

                {activeCard.description && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink/50">Host note</span>
                    <p className="text-sm text-ink/80 mt-1 leading-relaxed bg-paper p-3 rounded-chip border border-ink/5">
                      {activeCard.description}
                    </p>
                  </div>
                )}

                <div className="p-3 bg-amber-faint border border-amber/30 rounded-chip">
                  <p className="font-serif italic text-sm text-ink leading-normal text-center">
                    “{activeCard.welcomingPhrase}”
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSaveTheDate(activeCard)}
                    className="w-full py-3 px-4 rounded-chip bg-ink text-paper text-sm font-bold flex items-center justify-center gap-2 hover:bg-ink-light transition-all shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-amber" />
                    <span>{t.saveDate}</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-ink/60 font-medium">
                    {t.noTracking} No RSVP required.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Design System Guidelines Citation Box */}
      <div className="mt-12 bg-paper-deep/60 rounded-card p-5 border border-ink/10 flex items-start gap-3">
        <Info className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
        <div className="text-xs text-ink/80 space-y-1">
          <p className="font-semibold text-ink">
            Design Rule for the Mirror Page (Collateral 08)
          </p>
          <p>
            <strong className="text-ink">DO:</strong> Show what the physical board shows, no more. Text 16px or larger, AA contrast, resident languages, amber dot per open door.
          </p>
          <p>
            <strong className="text-terracotta">AVOID:</strong> Log-ins, tracking, replies, analytics cookies, or public guest lists.
          </p>
        </div>
      </div>
    </div>
  );
};
