import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft, Sparkles } from "lucide-react";

import LandingPage from "@/components/LandingPage";
import GoalInput from "@/components/GoalInput";
import PlanDisplay from "@/components/PlanDisplay";
import MindMap from "@/components/MindMap";
import GanttChart from "@/components/GanttChart";

interface Task {
  id: string;
  name: string;
  start: number;
  duration: number;
  dependencies?: string[];
}

interface PlanResponse {
  goal: string;
  tasks: Task[];
}

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = async (userGoal: string) => {
    setIsLoading(true);
    setGoal(userGoal);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/plan/generate-plan",
        { goal: userGoal }
      );

      setPlan(response.data);

      toast({
        title: "Plan Generated ✨",
        description: "Scroll to explore your results.",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Error",
        description: "Backend not reachable or failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowLanding(false);
    setGoal("");
    setPlan(null);
  };

  const handleRegenerate = () => {
    if (goal) generatePlan(goal);
  };

  return (
    <div className="min-h-screen bg-background">
      {showLanding && <LandingPage onGetStarted={() => setShowLanding(false)} />}

      {!showLanding && (
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setShowLanding(true)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>

                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SynapSense 💡
                </h1>
              </div>

              {plan && (
                <Button onClick={handleRegenerate} disabled={isLoading} variant="outline" size="sm">
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Regenerate
                </Button>
              )}
            </div>
          </header>

          <main className="container mx-auto py-12 space-y-12">
            {!plan && <GoalInput onSubmit={generatePlan} isLoading={isLoading} />}

            {plan && (
              <>
                <PlanDisplay
                  goal={plan.goal}
                  plan={plan.tasks.map((t) => t.name).join("\n")}
                />

                {/* FIX: items must be string[] */}
                <MindMap items={plan.tasks} />

                <GanttChart plan={{ tasks: plan.tasks }} />

                <div className="flex justify-center gap-4 mt-6">
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Start New Plan
                  </Button>
                  <Button onClick={handleRegenerate} disabled={isLoading} size="lg">
                    <Sparkles className="w-5 h-5 mr-2" /> Generate Another
                  </Button>
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;




