import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Trash2 } from "lucide-react";
import { getScores, clearScores } from "@/lib/score";

export interface ScoreEntry {
  name: string;
  score: number;
  total: number;
  date: string;
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
            const pct = Math
