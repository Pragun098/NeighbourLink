import React, { useState } from 'react';
import { doorChime } from '../../utils/audio';
import { Sun, Moon, Volume2, PhoneCall, Coffee } from 'lucide-react';

export const ThresholdExperience: React.FC = () => {
  const [lampLit, setLampLit] = useState<boolean>(true);
  const [doorHangerSide, setDoorHangerSide] = useState<'front' | 'back'>('front');
  const [activeStep, setActiveStep] = useState<number>(3); // Default at Step (Lamp)
  const [dialingPhone, setDialingPhone] = useState<boolean>(false);
  const [phoneMessage, setPhoneMessage] = useState<string | null>(null);

  const toggleLamp = () => {
    doorChime.playChime();
    setLampLit(!lampLit);
  };

  const handleDialBoard = () => {
    setDialingPhone(true);
    doorChime.playChime();
    setPhoneMessage('Connecting to Lane Bulletin Line... Opening chime ringing...');

    setTimeout(() => {
      setPhoneMessage('“Welcome to the Lane Board. Open this week: Saturday at 7pm, Diwali tea at the Blue Gate. Sunday at 5pm, Harvest bread at No. 14. Come for ten minutes or the whole evening. No names recorded.”');
      doorChime.speakText(
        'Welcome to the Lane Board. Open this week: Saturday at 7pm, Diwali tea at the Blue Gate. Sunday at 5pm, Harvest bread at No. 14. Come for ten minutes or the whole evening. No names recorded.',
        'en',
        () => {
          setDialingPhone(false);
        }
      );
    }, 1500);
  };

  const pathSteps = [
    { num: 1, name: 'Lane', collateral: '04 Banner & Poster', desc: 'Makes the open door visible from the road.' },
    { num: 2, name: 'Gate', collateral: '01 Open Door Board', desc: 'Communal weatherproof board at eye level (150cm).' },
    { num: 3, name: 'Tea table', collateral: '10 Launch Tea', desc: 'One long table, no head seat, clay cups, no sign-up.' },
    { num: 4, name: 'Step', collateral: '07 Open Door Lamp', desc: 'Lit means come by; unlit is a quiet evening.' },
    { num: 5, name: 'Door', collateral: '05 Door-hanger', desc: 'Lands at the threshold; asks for no reply.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/20 text-ink text-xs font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          Dimension · Space, Sound & Experience
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-2">
          Space & Experience: The Threshold
        </h2>
        <p className="text-ink/75 text-sm sm:text-base">
          “Everything happens where one home meets the lane.”
          Experience order: <em>see, pause, join, linger, return.</em>
        </p>
      </div>

      {/* Path from Lane to Door (Page 5/32 of PDF) */}
      <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper mb-12">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-ink/10">
          <h3 className="font-serif text-lg font-bold text-ink">The Path from Lane to Door</h3>
          <span className="text-xs font-mono text-ink/60">5 THRESHOLD TOUCHPOINTS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {pathSteps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.name}
                onClick={() => {
                  doorChime.playChime();
                  setActiveStep(idx);
                }}
                className={`p-3.5 rounded-chip border text-left transition-all ${
                  isCurrent
                    ? 'bg-ink text-paper border-ink shadow-md scale-102'
                    : 'bg-paper text-ink border-ink/10 hover:border-amber hover:bg-paper-warm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      isCurrent ? 'bg-amber text-ink' : 'bg-ink/10 text-ink/80'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono ${isCurrent ? 'text-amber' : 'text-terracotta'}`}>
                    {step.collateral.split(' ')[0]}
                  </span>
                </div>
                <div className={`font-serif font-bold text-base ${isCurrent ? 'text-paper' : 'text-ink'}`}>
                  {step.name}
                </div>
                <div className={`text-xs mt-1 ${isCurrent ? 'text-paper/80' : 'text-ink/70'}`}>
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        {/* Widget 1: Open Door Lamp (Collateral 07) */}
        <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-terracotta font-bold">
                Collateral 07
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">The Open Door Lamp</h3>
            </div>
            <button
              onClick={toggleLamp}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-chip text-xs font-bold transition-all ${
                lampLit
                  ? 'bg-amber text-ink border border-amber shadow-lamp'
                  : 'bg-paper-warm text-ink/70 border border-ink/20'
              }`}
            >
              {lampLit ? <Sun className="w-3.5 h-3.5 text-ink" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{lampLit ? 'Lit: Come by' : 'Unlit: Quiet evening'}</span>
            </button>
          </div>

          <p className="text-xs text-ink/70 mb-6">
            A glowing signal on the doorstep. <strong className="text-ink">Lit means come by; unlit means nothing at all.</strong> Never a closed door.
          </p>

          {/* Visual Doorstep Scene (Page 12/29 of PDF) */}
          <div
            className={`w-full rounded-card p-8 flex items-center justify-center transition-all duration-700 relative overflow-hidden min-h-[260px] ${
              lampLit ? 'bg-[#152B2D]' : 'bg-[#122325]'
            }`}
          >
            {/* Door Frame */}
            <div className="relative flex items-end justify-center w-full">
              {/* Arch Door */}
              <div className="w-36 h-56 bg-terracotta rounded-t-full border-4 border-ink-dark/60 relative flex flex-col justify-end p-3 shadow-inner">
                {/* Doorknob */}
                <div className="absolute right-4 top-1/2 w-4 h-4 rounded-full bg-amber shadow-sm" />

                {/* Door Mat / Threshold Step */}
                <div className="w-full h-3 bg-paper-deep/20 rounded-sm" />
              </div>

              {/* Lantern on the step */}
              <div
                onClick={toggleLamp}
                className="cursor-pointer ml-6 mb-2 relative group flex flex-col items-center"
              >
                {/* 2700K Warm Ambient Glow Circle */}
                {lampLit && (
                  <div className="absolute -top-10 w-28 h-28 rounded-full bg-amber/40 blur-xl pointer-events-none animate-pulse" />
                )}

                {/* Lantern Body (Terracotta with arched windows & Amber light) */}
                <div
                  className={`w-14 h-24 bg-terracotta border-2 border-ink-dark rounded-t-lg rounded-b-sm flex flex-col items-center justify-center p-2 relative shadow-lg transition-all ${
                    lampLit ? 'ring-4 ring-amber/50 shadow-lamp' : 'opacity-85'
                  }`}
                >
                  {/* Top ring / handle */}
                  <div className="w-4 h-4 border-2 border-amber-dark rounded-full -mt-5 mb-1" />

                  {/* Arched Window with Lamp Glow */}
                  <div
                    className={`w-8 h-14 rounded-t-full rounded-b-xs border border-ink-dark flex items-center justify-center transition-all duration-500 ${
                      lampLit ? 'bg-amber shadow-inner' : 'bg-ink/50'
                    }`}
                  >
                    {lampLit && (
                      <div className="w-3.5 h-3.5 rounded-full bg-paper/80 blur-[0.5px]" />
                    )}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-paper/70 mt-2">
                  {lampLit ? 'Lit (2700 K LED)' : 'Unlit (Quiet)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-paper-deep rounded-chip text-xs text-ink/80 flex items-center justify-between">
            <span>
              <strong className="text-ink">DO:</strong> Treat unlit as neutral, always.
            </span>
            <span className="text-terracotta font-medium">
              <strong>AVOID:</strong> Reading unlit as refusal.
            </span>
          </div>
        </div>

        {/* Widget 2: Door-Hanger (Collateral 05) */}
        <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-terracotta font-bold">
                Collateral 05
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">Door-Hanger</h3>
            </div>
            <button
              onClick={() => {
                doorChime.playChime();
                setDoorHangerSide(doorHangerSide === 'front' ? 'back' : 'front');
              }}
              className="px-3 py-1.5 rounded-chip text-xs font-bold bg-ink text-paper hover:bg-ink-light transition-all flex items-center gap-1.5"
            >
              <span>Flip Hanger ({doorHangerSide})</span>
            </button>
          </div>

          <p className="text-xs text-ink/70 mb-6">
            Reaches households who never pass the board, and invites quietly. Hangs on the knob; asks for no reply.
          </p>

          {/* Interactive Door-Hanger on Door Knob */}
          <div className="w-full bg-[#182E31] rounded-card p-8 flex items-center justify-center min-h-[260px]">
            <div
              onClick={() => {
                doorChime.playChime();
                setDoorHangerSide(doorHangerSide === 'front' ? 'back' : 'front');
              }}
              className="w-48 bg-paper rounded-2xl shadow-board border-2 border-ink/20 p-5 cursor-pointer hover:scale-105 transition-all duration-300 relative text-center"
            >
              {/* Die-Cut Hole for Doorknob */}
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-ink/30 mx-auto mb-4 bg-paper-deep/60 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-ink/10" />
              </div>

              {doorHangerSide === 'front' ? (
                /* Front side */
                <div className="space-y-4 py-2">
                  {/* Mark */}
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-4 h-5 bg-terracotta rounded-xs inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-sm" />
                    <span className="w-4 h-5 bg-ink rounded-xs inline-block" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-ink leading-tight">
                    Our door is open.
                  </h4>
                  <p className="text-[11px] text-ink/60 font-serif italic">
                    Tap to see reverse
                  </p>
                </div>
              ) : (
                /* Back side */
                <div className="space-y-3 py-1">
                  <h5 className="font-serif text-lg font-bold text-ink">
                    Come and see the board.
                  </h5>
                  <div className="p-2.5 bg-paper-warm rounded-chip border border-ink/10">
                    <div className="text-terracotta font-serif font-bold text-sm">
                      Tea at 5.
                    </div>
                    <div className="text-xs text-ink font-semibold mt-0.5">
                      No sign-up.
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber mx-auto" />
                  <p className="text-[10px] text-ink/60">
                    Same words for every door in the lane.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-paper-deep rounded-chip text-xs text-ink/80 flex items-center justify-between">
            <span>
              <strong className="text-ink">100 × 240 mm:</strong> 300 gsm card with die-cut hole.
            </span>
            <span className="text-terracotta font-medium">
              <strong>AVOID:</strong> Deadlines or pressure words.
            </span>
          </div>
        </div>
      </div>

      {/* Second Row: Launch Tea (Collateral 10) & Dial the Board Phone Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Widget 3: Launch Tea (Collateral 10) */}
        <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-terracotta font-bold">
                Collateral 10
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">Launch Tea at the Gate</h3>
            </div>
            <button
              onClick={() => doorChime.playChime()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-chip text-xs font-bold bg-amber/20 text-ink border border-amber hover:bg-amber hover:text-ink transition-all"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-dark" />
              <span>Chime at 5:00</span>
            </button>
          </div>

          <p className="text-xs text-ink/70 mb-4">
            A first, low-stakes shared moment where anyone can step in for ten minutes. One long table, no head seat.
          </p>

          {/* Visual Table Scene */}
          <div className="bg-paper-warm border border-ink/10 rounded-card p-5 space-y-4">
            {/* Festive Bunting */}
            <div className="flex justify-between items-center px-4 overflow-hidden">
              {['#B94A31', '#1F3A3D', '#EBA43B', '#8DAE98', '#B94A31', '#1F3A3D', '#EBA43B'].map((col, i) => (
                <div
                  key={i}
                  style={{ borderTopColor: col }}
                  className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px]"
                />
              ))}
            </div>

            {/* The Table Sign */}
            <div className="bg-ink text-paper p-4 rounded-chip text-center shadow-md max-w-sm mx-auto">
              <h4 className="font-serif text-xl font-bold">Tea at 5. No sign-up.</h4>
              <div className="w-2.5 h-2.5 rounded-full bg-amber mx-auto my-1.5" />
              <p className="text-xs text-paper/80 italic font-serif">
                One long table, no head seat. Come for ten minutes or stay for the evening.
              </p>
            </div>

            {/* Place settings: No name needed */}
            <div className="flex justify-around items-center pt-2">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-terracotta/40 mx-auto flex items-center justify-center text-[10px] font-bold text-ink">
                  Clay
                </div>
                <span className="text-[10px] font-mono text-ink/70 mt-1 block">No name needed</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-amber/30 mx-auto flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-amber" />
                </div>
                <span className="text-[10px] font-mono text-ink/70 mt-1 block">Shared Lamp</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-terracotta/40 mx-auto flex items-center justify-center text-[10px] font-bold text-ink">
                  Clay
                </div>
                <span className="text-[10px] font-mono text-ink/70 mt-1 block">No name needed</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-ink/70">
            <strong>Rule:</strong> Paper and clay first, no plastic. AVOID speeches, name tags, or sign-up sheets.
          </div>
        </div>

        {/* Widget 4: Dial the Board (Phone Line for Non-Smartphone Users) */}
        <div className="bg-paper-card border border-ink/15 rounded-card p-6 shadow-paper">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-terracotta font-bold">
                Aural Companion
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">Dial the Board</h3>
            </div>
            <span className="text-xs font-mono text-ink/50">PHONE BULLETIN</span>
          </div>

          <p className="text-xs text-ink/70 mb-4">
            A free phone line reads this week’s open doors aloud, for anyone without a smartphone or internet access. It opens with the chime.
          </p>

          <div className="bg-[#1B3235] text-paper rounded-card p-5 border border-paper/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber/20 text-amber flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6 text-amber" />
            </div>

            <div>
              <div className="font-mono text-lg font-bold tracking-wider text-amber">
                0800 · OPEN · DOOR
              </div>
              <p className="text-xs text-paper/70 mt-1">
                Warm, unhurried voice (~140 wpm) · Resident languages
              </p>
            </div>

            <button
              onClick={handleDialBoard}
              disabled={dialingPhone}
              className="w-full py-2.5 px-4 rounded-chip bg-amber text-ink font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-light disabled:opacity-50 transition-all shadow-md"
            >
              <Volume2 className="w-4 h-4 text-ink" />
              <span>{dialingPhone ? 'Playing Phone Line...' : 'Dial Board Line (Listen)'}</span>
            </button>

            {phoneMessage && (
              <div className="bg-ink-dark/80 p-3 rounded-chip border border-paper/15 text-left text-xs text-paper/90 italic font-serif animate-fadeIn">
                {phoneMessage}
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-ink/70">
            <strong>Sound Rule:</strong> Two soft notes (G4 to D5 rising fifth, 3s decay). Never loops, never alerts, never interrupts conversation.
          </div>
        </div>
      </div>
    </div>
  );
};
