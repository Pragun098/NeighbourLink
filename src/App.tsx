import { useState } from 'react';
import { Footer } from './components/common/Footer';
import { Navbar, type NavTab } from './components/common/Navbar';
import { OpenDoorBoard } from './components/board/OpenDoorBoard';
import { MirrorPage } from './components/mirror/MirrorPage';
import { SeasonCardView } from './components/season/SeasonCardView';
import { BrandStoryView } from './components/story/BrandStoryView';
import { ThresholdExperience } from './components/threshold/ThresholdExperience';
import {
  INITIAL_NEIGHBOUR_NOTES,
  INITIAL_OPEN_DOOR_CARDS,
  INITIAL_SEASON_GRID,
} from './data/mockData';
import type { NeighbourNote, OpenDoorCard } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('board');
  const [isLargeText, setIsLargeText] = useState(false);
  const [cards, setCards] = useState<OpenDoorCard[]>(INITIAL_OPEN_DOOR_CARDS);
  const [notes, setNotes] = useState<NeighbourNote[]>(INITIAL_NEIGHBOUR_NOTES);

  const addCard = (card: OpenDoorCard) => {
    setCards((currentCards) => [card, ...currentCards]);
  };

  const addNote = (note: NeighbourNote) => {
    setNotes((currentNotes) => [note, ...currentNotes]);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'mirror':
        return (
          <MirrorPage
            cards={cards}
            isLargeText={isLargeText}
            onToggleTextSize={() => setIsLargeText((current) => !current)}
          />
        );
      case 'board':
        return (
          <OpenDoorBoard
            cards={cards}
            notes={notes}
            onAddCard={addCard}
            onAddNote={addNote}
            onNavigateToMirror={() => setActiveTab('mirror')}
          />
        );
      case 'season':
        return <SeasonCardView initialEntries={INITIAL_SEASON_GRID} />;
      case 'threshold':
        return <ThresholdExperience />;
      case 'story':
        return <BrandStoryView />;
    }
  };

  return (
    <div className={isLargeText ? 'text-lg' : ''}>
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isLargeText={isLargeText}
        onToggleTextSize={() => setIsLargeText((current) => !current)}
      />
      <main className="min-h-[60vh]">{renderActiveView()}</main>
      <Footer />
    </div>
  )
}

export default App
