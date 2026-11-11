export interface OpenDoorCard {
  id: string;
  festival: string;
  dayAndTime: string;
  hostNickname: string;
  description?: string;
  welcomingPhrase: string;
  dateIso?: string;
  pinnedAt: string;
  colorVariant?: 'terracotta' | 'sage' | 'ink';
}

export interface NeighbourNote {
  id: string;
  message: string;
  senderNickname?: string;
  target?: string;
  timestamp: string;
}

export interface MonthFestivalEntry {
  month: string;
  monthIndex: number; // 0-11
  hasOpenDoor: boolean;
  hasQuietCelebration: boolean;
  festivalName?: string;
  note?: string;
  house?: string;
}

export interface CollateralItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  dimensions: ('Visual' | 'Aural' | 'Spatial' | 'Experiential')[];
  whatItDoes: string;
  identityApplied: {
    visual?: string;
    spatial?: string;
    experiential?: string;
    aural?: string;
  };
  specification: string;
  doText: string;
  avoidText: string;
}
