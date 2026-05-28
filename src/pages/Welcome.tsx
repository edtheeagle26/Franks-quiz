import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Titel */}
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Operation <span className="text-primary">Frank 60</span>
        </h1>

        {/* Foto */}
        <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
          <div className="absolute inset-0 rounded-full border-4 border-primary/60 animate-pulse" />
          <img
            src="/aircraft/IMG-20161015-WA0001~2_1779522309717.jpg"
            alt="Frank"
            className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/30"
            data-testid="img-frank"
          />

          {/* Crosshair corners */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary" />
        </div>

        {/* Tekst */}
        <div className="space-y-3 text-muted-foreground text-lg md:text-xl">
          <p className="text-foreground font-semibold text-xl">
            Gefeliciteerd Frank! 60 jaar en nog altijd de scherpste ogen in de lucht.
          </p>
          <p>
            Tijd voor een debriefing. Herken jij alle 20 jachtvliegtuigen uit het archief?
          </p>
        </div>

        {/* Knoppen */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/quiz">
            <Button
              size="lg"
              className="w-full sm:w-auto text-xl px-12 py-8 rounded-none border-2 border-primary bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground uppercase tracking-widest font-bold"
              data-testid="button-start-quiz"
            >
              Start Missie
            </Button>
          </Link>

          <Link href="/scoreboard">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-xl px-12 py-8 rounded-none border-2 border-border bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground uppercase tracking-widest font-bold"
              data-testid="button-scoreboard"
            >
              <Trophy className="mr-2 w-5 h-5" />
              Scorebord
            </Button>
          </Link>
        </div>
      </div>
      {/* Decorative corners */}
      <div className="fixed top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/50 opacity-50" />
      <div className="fixed top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/50 opacity-50" />
      <div className="fixed bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/50 opacity-50" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/50 opacity-50" />
    </div>  
  );
}

