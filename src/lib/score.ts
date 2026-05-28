export interface ScoreEntry {
  name: string;
  score: number;
  total: number;
  date: string;
}

const STORAGE_KEY = "frank-quiz-scores";

export function getScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScoreEntry[];
  } catch {
    return [];
  }
}

export function saveScore(entry: ScoreEntry) {
  const scores = getScores();
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 50)));
}

export function clearScores() {
  localStorage.removeItem(STORAGE_KEY);
}
