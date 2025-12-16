import { AnalysisResult, UserSettings } from '../types';

const HISTORY_KEY = 'safebite_history';
const SETTINGS_KEY = 'safebite_settings';

export const getHistory = (): AnalysisResult[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const getResult = (id: string): AnalysisResult | undefined => {
  const history = getHistory();
  return history.find(item => item.id === id);
};

export const deleteResult = (id: string): AnalysisResult[] => {
  try {
    const history = getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to delete result", e);
    return [];
  }
};

export const saveResult = (result: AnalysisResult) => {
  try {
    const history = getHistory();
    // Prevent duplicates
    if (history.some(h => h.id === result.id)) return;
    
    const updated = [result, ...history];
    
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      // Handle quota exceeded by removing the image data from the oldest entry or the new one if needed
      // For this demo, we'll try to keep the latest 20 items
      if (updated.length > 20) {
        const trimmed = updated.slice(0, 20);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
      } else {
        // If still failing, it's likely the image size. Save without image for the new item as fallback.
        const safeResult = { ...result, imageUrl: '' }; 
        const rescue = [safeResult, ...history];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(rescue));
      }
    }
  } catch (e) {
    console.error("Failed to save result", e);
  }
};

export const getSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {
      sensitivity: 85,
      detectArtificialColors: true,
      analyzeTexture: true,
      freshnessIndex: false
    };
  } catch (e) {
    return {
      sensitivity: 85,
      detectArtificialColors: true,
      analyzeTexture: true,
      freshnessIndex: false
    };
  }
};

export const saveSettings = (settings: UserSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
};