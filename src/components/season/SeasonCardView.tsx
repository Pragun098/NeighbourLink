import React, { useState } from 'react';
import type { MonthFestivalEntry } from '../../types';
import { doorChime } from '../../utils/audio';
import { Printer, Info, Edit3 } from 'lucide-react';

interface SeasonCardViewProps {
  initialEntries: MonthFestivalEntry[];
}

export const SeasonCardView: React.FC<SeasonCardViewProps> = ({ initialEntries }) => {
  const [entries, setEntries] = useState<MonthFestivalEntry[]>(initialEntries);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const monthsList = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleMonthClick = (index: number) => {
    doorChime.playChime();
    setSelectedMonth(selectedMonth === index ? null : index);
  };

  const handleUpdateMonthStatus = (index: number, status: 'open' | 'quiet' | 'none') => {
    doorChime.playChime();
    setEntries((prev) =>
      prev.map((item) => {
        if (item.monthIndex !== index) return item;
        return {
          ...item,
          hasOpenDoor: status === 'open',
          hasQuietCelebration: status === 'quiet',
          festivalName: status === 'none' ? undefined : (item.festivalName || (status === 'open' ? 'Open Door Celebration' : 'Quiet Celebration')),
        };
      })
    );
  };

  const activeEntry = entries.find((e) => e.monthIndex === selectedMonth);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* View Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/20 text-ink text-xs font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          Collateral 06 · Yearly Shared Calendar
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-2">Festival Season Card</h2>
        <p className="text-ink/75 text-sm sm:text-base">
          Shares the dates that matter to each home across the twelve months, so an absence is never misread as a message.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-chip bg-ink text-paper text-xs font-bold hover:bg-ink-light transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber" />
            <span>Print Season Card (A5)</span>
          </button>
        </div>
      </div>

      {/* A5 Card Simulation on Paper Ground */}
      <div className="bg-paper-card border-2 border-ink/20 rounded-card shadow-board p-6 sm:p-10 max-w-4xl mx-auto">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-ink/15 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center text-ink font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-paper" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                Our year on the lane
              </h3>
              <p className="text-xs text-ink/60 font-serif italic">
                A5 card · Pinned to the gate board and the fridge
              </p>
            </div>
          </div>

          {/* Interactive Legend */}
          <div className="flex flex-wrap items-center gap-5 text-xs bg-paper-warm px-4 py-2 rounded-chip border border-ink/10">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber inline-block shadow-sm" />
              <span className="font-semibold text-ink">Our door is open</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-ink inline-block bg-transparent" />
              <span className="text-ink/80">Quiet celebration: no meaning attached</span>
            </div>
          </div>
        </div>

        {/* 12-Month Grid (3 columns x 4 rows or 4 columns x 3 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
          {monthsList.map((monthName, idx) => {
            const entry = entries.find((e) => e.monthIndex === idx) || {
              month: monthName,
              monthIndex: idx,
              hasOpenDoor: false,
              hasQuietCelebration: false,
            };
            const isSelected = selectedMonth === idx;

            return (
              <div
                key={monthName}
                onClick={() => handleMonthClick(idx)}
                className={`p-4 rounded-chip border cursor-pointer transition-all flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'ring-2 ring-amber border-ink bg-paper-warm shadow-md'
                    : 'bg-paper border-ink/15 hover:border-amber hover:bg-paper-warm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-lg text-ink">{monthName}</span>
                  {/* Status Indicator */}
                  {entry.hasOpenDoor && (
                    <span
                      title="Our door is open"
                      className="w-4 h-4 rounded-full bg-amber shadow-sm shrink-0"
                    />
                  )}
                  {entry.hasQuietCelebration && (
                    <span
                      title="Quiet celebration: no meaning attached"
                      className="w-4 h-4 rounded-full border-2 border-ink shrink-0 bg-paper"
                    />
                  )}
                  {!entry.hasOpenDoor && !entry.hasQuietCelebration && (
                    <span className="w-2 h-2 rounded-full bg-ink/10" />
                  )}
                </div>

                <div className="mt-2 text-xs">
                  {entry.festivalName ? (
                    <div className="font-handwriting text-lg text-ink font-semibold leading-tight line-clamp-2">
                      {entry.festivalName}
                    </div>
                  ) : (
                    <span className="text-ink/30 italic text-[11px]">—</span>
                  )}
                  {entry.house && (
                    <div className="text-[10px] text-ink/60 mt-0.5">{entry.house}</div>
                  )}
                </div>

                <div className="mt-2 pt-1 border-t border-ink/10 flex items-center justify-between text-[10px] text-ink/50">
                  <span>Month {idx + 1}</span>
                  <span className="text-terracotta font-medium hover:underline">Edit</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Month Interactive Editor Drawer */}
        {selectedMonth !== null && activeEntry && (
          <div className="bg-paper-warm border border-ink/15 rounded-card p-5 mt-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-terracotta" />
                <h4 className="font-serif text-lg font-bold text-ink">
                  Set Dates for {monthsList[selectedMonth]}
                </h4>
              </div>
              <span className="text-xs text-ink/60">Each home fills in only what it chooses.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <button
                type="button"
                onClick={() => handleUpdateMonthStatus(selectedMonth, 'open')}
                className={`p-3 rounded-chip border text-left flex items-center gap-3 transition-all ${
                  activeEntry.hasOpenDoor
                    ? 'bg-amber/20 border-amber ring-2 ring-amber text-ink font-bold'
                    : 'bg-paper border-ink/15 text-ink/80 hover:bg-paper-deep'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-amber shrink-0" />
                <div>
                  <div className="text-xs font-bold">Our door is open</div>
                  <div className="text-[11px] text-ink/60">Public open gathering</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateMonthStatus(selectedMonth, 'quiet')}
                className={`p-3 rounded-chip border text-left flex items-center gap-3 transition-all ${
                  activeEntry.hasQuietCelebration
                    ? 'bg-ink/10 border-ink ring-2 ring-ink text-ink font-bold'
                    : 'bg-paper border-ink/15 text-ink/80 hover:bg-paper-deep'
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 border-ink shrink-0" />
                <div>
                  <div className="text-xs font-bold">Quiet celebration</div>
                  <div className="text-[11px] text-ink/60">No meaning attached</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateMonthStatus(selectedMonth, 'none')}
                className={`p-3 rounded-chip border text-left flex items-center gap-3 transition-all ${
                  !activeEntry.hasOpenDoor && !activeEntry.hasQuietCelebration
                    ? 'bg-ink/5 border-ink/40 text-ink font-bold'
                    : 'bg-paper border-ink/15 text-ink/80 hover:bg-paper-deep'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-ink/10 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Clear month</div>
                  <div className="text-[11px] text-ink/60">No special notice</div>
                </div>
              </button>
            </div>

            {/* Event Name Input */}
            {(activeEntry.hasOpenDoor || activeEntry.hasQuietCelebration) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                    Occasion / Reason
                  </label>
                  <input
                    type="text"
                    value={activeEntry.festivalName || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEntries((prev) =>
                        prev.map((item) =>
                          item.monthIndex === selectedMonth ? { ...item, festivalName: val } : item
                        )
                      );
                    }}
                    placeholder="e.g. Saffron Sweet Rice, Family Remembrance"
                    className="w-full px-3 py-2 text-sm bg-paper border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-ink/70 mb-1">
                    House / Nickname
                  </label>
                  <input
                    type="text"
                    value={activeEntry.house || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEntries((prev) =>
                        prev.map((item) =>
                          item.monthIndex === selectedMonth ? { ...item, house: val } : item
                        )
                      );
                    }}
                    placeholder="e.g. No. 14 or Blue Gate"
                    className="w-full px-3 py-2 text-sm bg-paper border border-ink/20 rounded-chip focus:outline-none focus:border-amber"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Footer Rules */}
        <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-ink/70 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <span>Mark only the dates a home wants to share.</span>
          </div>
          <div className="text-ink/60 font-medium">
            <strong className="text-terracotta">AVOID:</strong> Marking who is absent. Absence is never a verdict.
          </div>
        </div>
      </div>

      {/* Rationale Callout */}
      <div className="mt-8 bg-paper-deep rounded-card p-6 border border-ink/10 max-w-4xl mx-auto flex items-start gap-4">
        <Info className="w-6 h-6 text-terracotta shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm text-ink/80">
          <h4 className="font-serif font-bold text-ink text-base">
            Why this is more suitable than a traditional calendar alone:
          </h4>
          <p>
            A calendar helps people know <em>when</em> a festival occurs, but it does not necessarily make an invitation available or provide a low-pressure way to participate.
          </p>
          <p>
            The Festival Season Card combines visibility with voluntary invitations. A home can mark a quiet celebration with a hollow ring ("no meaning attached") so their neighbors know they are having private time, preventing silence from being misread as rejection.
          </p>
        </div>
      </div>
    </div>
  );
};
