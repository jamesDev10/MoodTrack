import { Preferences } from '@capacitor/preferences';
import { MoodEntry, MoodEntryWithEmoji, MoodEmoji, MOOD_EMOJIS } from '../types/mood';

const MOOD_ENTRIES_KEY = 'moodEntries';

export const moodService = {
  async getAllMoodEntries(): Promise<MoodEntryWithEmoji[]> {
    try {
      const { value } = await Preferences.get({ key: MOOD_ENTRIES_KEY });
      if (!value) {
        return [];
      }

      const entries: MoodEntry[] = JSON.parse(value);

      // Enriquecer con datos del emoji
      return entries.map(entry => ({
        ...entry,
        emoji: MOOD_EMOJIS.find(e => e.id === entry.emojiId) || MOOD_EMOJIS[0]
      })).sort((a, b) => b.timestamp - a.timestamp); // Más recientes primero
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  async getMoodEntryById(id: string): Promise<MoodEntryWithEmoji | null> {
    try {
      const entries = await this.getAllMoodEntries();
      return entries.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error('Error getting mood entry by id:', error);
      return null;
    }
  },

  async saveMoodEntry(emojiId: string, notes?: string): Promise<MoodEntry> {
    try {
      const entries = await this.getAllMoodEntries();

      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        emojiId,
        timestamp: Date.now(),
        notes
      };

      const updatedEntries = [newEntry, ...entries.map(({ emoji, ...entry }) => entry)];

      await Preferences.set({
        key: MOOD_ENTRIES_KEY,
        value: JSON.stringify(updatedEntries)
      });

      return newEntry;
    } catch (error) {
      console.error('Error saving mood entry:', error);
      throw error;
    }
  },

  async updateMoodEntry(id: string, notes: string): Promise<boolean> {
    try {
      const entries = await this.getAllMoodEntries();
      const updatedEntries = entries.map(entry => {
        if (entry.id === id) {
          return { ...entry, notes };
        }
        return entry;
      }).map(({ emoji, ...entry }) => entry);

      await Preferences.set({
        key: MOOD_ENTRIES_KEY,
        value: JSON.stringify(updatedEntries)
      });

      return true;
    } catch (error) {
      console.error('Error updating mood entry:', error);
      return false;
    }
  },

  async deleteMoodEntry(id: string): Promise<boolean> {
    try {
      const entries = await this.getAllMoodEntries();
      const updatedEntries = entries
        .filter(entry => entry.id !== id)
        .map(({ emoji, ...entry }) => entry);

      await Preferences.set({
        key: MOOD_ENTRIES_KEY,
        value: JSON.stringify(updatedEntries)
      });

      return true;
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      return false;
    }
  },

  getEmojiById(id: string): MoodEmoji | undefined {
    return MOOD_EMOJIS.find(emoji => emoji.id === id);
  },

  async getStatistics(period: 'week' | 'month' | 'all' = 'week') {
    try {
      const entries = await this.getAllMoodEntries();

      // Filtrar por periodo
      const now = Date.now();
      let filteredEntries = entries;

      if (period === 'week') {
        const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
        filteredEntries = entries.filter(e => e.timestamp >= weekAgo);
      } else if (period === 'month') {
        const monthAgo = now - (30 * 24 * 60 * 60 * 1000);
        filteredEntries = entries.filter(e => e.timestamp >= monthAgo);
      }

      // Calcular emoji más frecuente
      const emojiCounts: Record<string, number> = {};
      filteredEntries.forEach(entry => {
        emojiCounts[entry.emojiId] = (emojiCounts[entry.emojiId] || 0) + 1;
      });

      const mostFrequentEmojiId = Object.entries(emojiCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
      const mostFrequentEmoji = mostFrequentEmojiId ? this.getEmojiById(mostFrequentEmojiId) : null;

      // Calcular porcentajes
      const total = filteredEntries.length;
      const happyMoods = ['happy', 'excited', 'calm', 'motivated', 'relaxed'];
      const sadMoods = ['sad', 'angry', 'tired'];
      const neutralMoods = ['neutral'];

      const happyCount = filteredEntries.filter(e => happyMoods.includes(e.emojiId)).length;
      const sadCount = filteredEntries.filter(e => sadMoods.includes(e.emojiId)).length;
      const neutralCount = filteredEntries.filter(e => neutralMoods.includes(e.emojiId)).length;

      const happyPercent = total > 0 ? Math.round((happyCount / total) * 100) : 0;
      const sadPercent = total > 0 ? Math.round((sadCount / total) * 100) : 0;
      const neutralPercent = total > 0 ? Math.round((neutralCount / total) * 100) : 0;

      return {
        totalEntries: total,
        mostFrequentEmoji,
        mostFrequentCount: mostFrequentEmojiId ? emojiCounts[mostFrequentEmojiId] : 0,
        happyPercent,
        sadPercent,
        neutralPercent,
        entries: filteredEntries
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      return {
        totalEntries: 0,
        mostFrequentEmoji: null,
        mostFrequentCount: 0,
        happyPercent: 0,
        sadPercent: 0,
        neutralPercent: 0,
        entries: []
      };
    }
  },

  async getChartData(period: 'week' | 'month' = 'week') {
    try {
      const entries = await this.getAllMoodEntries();
      const now = Date.now();

      const days = period === 'week' ? 7 : 30;
      const startDate = now - (days * 24 * 60 * 60 * 1000);

      const filteredEntries = entries.filter(e => e.timestamp >= startDate);

      const emojiValues: Record<string, number> = {
        'sad': 1,
        'angry': 1.5,
        'tired': 1.8,
        'neutral': 2.5,
        'calm': 3.5,
        'relaxed': 3.8,
        'happy': 4.2,
        'motivated': 4.5,
        'excited': 5
      };

      const dayData: Record<string, number[]> = {};

      for (let i = 0; i < days; i++) {
        const date = new Date(now - (i * 24 * 60 * 60 * 1000));
        const dayKey = `${date.getMonth() + 1}/${date.getDate()}`;
        dayData[dayKey] = [];
      }

      filteredEntries.forEach(entry => {
        const date = new Date(entry.timestamp);
        const dayKey = `${date.getMonth() + 1}/${date.getDate()}`;
        const value = emojiValues[entry.emojiId] || 3;

        if (dayData[dayKey]) {
          dayData[dayKey].push(value);
        }
      });

      const chartData = Object.entries(dayData)
        .map(([day, values]) => ({
          day,
          value: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
        }))
        .reverse();

      return chartData;
    } catch (error) {
      console.error('Error getting chart data:', error);
      return [];
    }
  }
};
