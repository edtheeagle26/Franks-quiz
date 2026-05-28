import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Confetti } from "@/components/Confetti";
import { aircraftData, Aircraft, TOTAL_QUESTIONS } from "@/data/aircraft";
import { CheckCircle2, XCircle, ArrowRight, Award, Trophy, Save } from "lucide-react";
import { saveScore } from "@/lib/score";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [shuffledQuestions, setShuffledQuestions] = useState<Aircraft[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(aircraftData));
  }, []);

  useEffect(() => {
    if (shuffledQuestions.length > 0 && currentQuestionIndex < shuffledQuestions.length) {
      const currentAircraft = shuffledQuestions[currentQuestionIndex];
      const others = shuffleArray(aircraftData.filter(a => a.id !== currentAircraft.id));
      setOptions(shuffleArray([currentAircraft.name, others[0].name, others[1].name, others[2].name]));
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [currentQuestionIndex, shuffledQuestions]);

  const currentAircraft = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentAircraft.name) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;
    saveScore({
      name: playerName.trim(),
      score,
      total: TOTAL_QUESTIONS,
      date: new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }),
    });
    setScoreSaved(true);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-primary font-mono">Laden...</div>;
  }

  if (quizComplete) {
    const isTop = score >= Math.round(TOTAL_QUESTIONS * 0.75);
    const isGood = score >= Math.round(TOTAL_QUESTIONS * 0.5);
    const message = isTop ? "Topvlieger!" : isGood ? "Goed gedaan!" : "Blijf oefenen!";

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Confetti />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-card p-8 border border-border space-y-6 relative z-10"
        >
          <Award className="w-20 h-20 text-primary mx-auto" />
          <h2 className="text-3xl font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "var(--font-mono)" }}>
            {message}
          </h2>
          <div className="text-6xl font-mono font-bold text-foreground py-2" data-testid="text-final-score">
            {score} <span className="text-2xl text-muted-foreground">/ {TOTAL_QUESTIONS}</span>
          </div>
          <p className="text-muted-foreground">
            Missie voltooid, Frank. Je hebt 60 jaar aan luchtvaarthistorie getrotseerd.
          </p>

          {/* Save score */}
          {!scoreSaved ? (
            <div className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-mono">Sla je score op</p>
              <div className="flex gap-2">
                <Input
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  placeholder="Jouw naam"
                  className="rounded-none border-border bg-background text-foreground font-mono"
                  onKeyDown={e => e.key === "Enter" && handleSaveScore()}
                  data-testid="input-player-name"
                />
                <Button
                  onClick={handleSaveScore}
                  disabled={!playerName.trim()}
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-save-score"
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-green-500 font-mono uppercase tracking-widest"
              data-testid="text-score-saved"
            >
              <CheckCircle2 className="w-5 h-5" />
              Score opgeslagen!
            </motion.div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            {scoreSaved && (
              <Button
                onClick={() => setLocation("/scoreboard")}
                variant="outline"
                className="w-full h-12 rounded-none border-2 border-primary text-primary hover:bg-primary/10 font-mono uppercase tracking-widest"
                data-testid="button-view-scoreboard"
              >
                <Trophy className="mr-2 w-4 h-4" />
                Scorebord
              </Button>
            )}
            <Button
              asChild
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-mono uppercase tracking-widest"
            >
              <Link href="/" data-testid="button-back-home">Terug naar basis</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentAircraft.name;
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-8 max-w-4xl mx-auto">
      {/* HUD Header */}
      <div className="flex justify-between items-center mb-4 text-primary font-mono uppercase text-sm md:text-base">
        <div data-testid="text-question-counter">Target: {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}</div>
        <div data-testid="text-score">Score: {score}</div>
      </div>

      <Progress
        value={((currentQuestionIndex) / TOTAL_QUESTIONS) * 100}
        className="h-2 mb-6 bg-muted [&>div]:bg-primary"
        data-testid="progress-bar"
      />

      <div className="flex-grow flex flex-col justify-center gap-6">
        {/* Aircraft image */}
        <div className="relative w-full aspect-video bg-card border-2 border-border overflow-hidden">
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60 z-20" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60 z-20" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60 z-20" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60 z-20" />

          <img
            src={currentAircraft.imageUrl}
            alt="Target Aircraft"
            className="w-full h-full object-cover contrast-125"
            referrerPolicy="no-referrer"
            onError={e => {
              e.currentTarget.src = `https://placehold.co/800x450/0d1117/f59e0b?text=${encodeURIComponent(currentAircraft.name)}`;
            }}
            data-testid={`img-aircraft-${currentAircraft.id}`}
          />

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/65 z-30"
              >
                {isCorrect ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center text-green-500"
                    data-testid="feedback-correct"
                  >
                    <CheckCircle2 className="w-20 h-20 mb-2" />
                    <span className="text-2xl font-bold font-mono uppercase tracking-widest">Confirmed</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center text-destructive"
                    data-testid="feedback-incorrect"
                  >
                    <XCircle className="w-20 h-20 mb-2" />
                    <span className="text-2xl font-bold font-mono uppercase tracking-widest">Miss</span>
                    <span className="text-sm font-mono text-muted-foreground mt-1">
                      Correct: {currentAircraft.name}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option, index) => {
            let cls = "border-border bg-card hover:bg-muted text-foreground";
            if (showFeedback) {
              if (option === currentAircraft.name) cls = "border-green-500 bg-green-500/20 text-green-500";
              else if (option === selectedAnswer) cls = "border-destructive bg-destructive/20 text-destructive";
              else cls = "border-border bg-card opacity-40";
            }
            return (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`h-16 flex justify-start px-4 text-base font-mono border-2 rounded-none transition-all ${cls}`}
                data-testid={`button-option-${index}`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 mr-3 bg-background border border-current font-bold text-sm shrink-0">
                  {letters[index]}
                </span>
                <span className="truncate">{option}</span>
              </Button>
            );
          })}
        </div>

        {/* Next button */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <Button
              onClick={nextQuestion}
              size="lg"
              className="px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-widest rounded-none"
              data-testid="button-next-question"
            >
              {currentQuestionIndex + 1 < TOTAL_QUESTIONS ? "Volgende Target" : "Resultaat"}{" "}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
