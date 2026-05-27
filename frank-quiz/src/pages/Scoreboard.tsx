import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Trash2 } from "lucide-react";

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

const MEDAL_COLORS = ["text-yellow-400", "text-gray-300", "text-amber-600"];

export default function Scoreboard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(getScores());
  }, []);

  const handleClear = () => {
    clearScores();
    setScores([]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground font-mono uppercase tracking-widest"
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Basis
          </Button>
        </Link>
        {scores.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-destructive hover:text-destructive/80 font-mono uppercase tracking-widest"
            data-testid="button-clear-scores"
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Wissen
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Trophy className="w-10 h-10 text-primary" />
        <h1
          className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
          data-testid="heading-scoreboard"
        >
          Hall of Fame
        </h1>
      </div>

      {scores.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center flex-grow text-center py-20 text-muted-foreground"
          data-testid="text-no-scores"
        >
          <Trophy className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg uppercase tracking-widest">Nog geen scores geregistreerd.</p>
          <p className="text-sm mt-2">Voltooi een missie om hier te verschijnen.</p>
          <Link href="/quiz">
            <Button
              size="lg"
              className="mt-8 rounded-none border-2 border-primary bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground uppercase tracking-widest font-bold"
              data-testid="button-start-first-quiz"
            >
              Start Missie
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3" data-testid="list-scores">
          {scores.map((entry, index) => {
            const pct = Math.round((entry.score / entry.total) * 100);
            const isMedal = index < 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-4 bg-card border border-border p-4 rounded-none"
                data-testid={`row-score-${index}`}
              >
                <div
                  className={`text-2xl font-bold font-mono w-10 text-center ${
                    isMedal ? MEDAL_COLORS[index] : "text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-foreground uppercase tracking-wide" data-testid={`text-score-name-${index}`}>
                    {entry.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{entry.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono text-primary" data-testid={`text-score-value-${index}`}>
                    {entry.score}
                    <span className="text-sm text-muted-foreground"> / {entry.total}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{pct}%</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Decorative corners */}
      <div className="fixed top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/50 opacity-30" />
      <div className="fixed top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/50 opacity-30" />
      <div className="fixed bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/50 opacity-30" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/50 opacity-30" />
    </div>
  );
}
