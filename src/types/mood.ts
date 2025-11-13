export interface MoodEmoji {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

export interface MoodEntry {
  id: string;
  emojiId: string;
  timestamp: number;
  notes?: string;
}

export interface MoodEntryWithEmoji extends MoodEntry {
  emoji: MoodEmoji;
}

export const MOOD_EMOJIS: MoodEmoji[] = [
  {
    id: 'happy',
    emoji: '😊',
    name: 'Feliz',
    description: 'Me siento muy bien'
  },
  {
    id: 'neutral',
    emoji: '😐',
    name: 'Neutral',
    description: 'Me siento normal'
  },
  {
    id: 'excited',
    emoji: '😄',
    name: 'Emocionado',
    description: 'Me siento muy emocionado'
  },
  {
    id: 'sad',
    emoji: '😢',
    name: 'Triste',
    description: 'Me siento triste'
  },
  {
    id: 'calm',
    emoji: '😌',
    name: 'Tranquilo',
    description: 'Me siento tranquilo y relajado'
  }
];
