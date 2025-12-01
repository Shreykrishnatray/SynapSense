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

/**
 * Main App Component
 * Manages state for goal, plan, and loading states
 * Integrates all components and handles API communication
 */
const Index = () => {
  // State management
  const [showLanding, setShowLanding] = useState(true);
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);

  /**
   * API call to generate plan from backend
   * Endpoint: POST http://127.0.0.1:8000/generate-plan
   * Payload: { goal: string }
   * Response: { goal: string, plan: string }
   */
  const generatePlan = async (userGoal: string) => {
    setIsLoading(true);
    setGoal(userGoal);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-plan", {
        goal: userGoal,
      });

      // Extract plan from response
      const { plan: generatedPlan } = response.data;
      setPlan(generatedPlan);
      setHasPlan(true);
      
      toast({
        title: "Plan Generated! ✨",
        description: "Your action plan is ready. Scroll down to explore.",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      
      // Error handling with user-friendly messages
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Generation Failed",
            description: `Server error: ${error.response.status}. Please try again.`,
            variant: "destructive",
          });
        } else if (error.request) {
          toast({
            title: "Connection Error",
            description: "Cannot reach the server. Make sure the backend is running on http://127.0.0.1:8000",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset to initial state
   */
  const handleReset = () => {
    setShowLanding(false);
    setHasPlan(false);
    setPlan("");
    setGoal("");
  };

  /**
   * Regenerate plan with same goal
   */
  const handleRegenerate = () => {
    if (goal) {
      generatePlan(goal);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Landing Page */}
      {showLanding && (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      )}

      {/* Main App Interface */}
      {!showLanding && (
        <div className="min-h-screen">
          {/* Header Navigation */}
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLanding(true)}
                    className="hover:bg-secondary"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <div className="h-6 w-px bg-border/50" />
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    SynapSense 💡
                  </h1>
                </div>

                {hasPlan && (
                  <Button
                    onClick={handleRegenerate}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                    className="border-border/50 hover:border-primary/50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto py-12 space-y-12">
            {/* Goal Input Section */}
            {!hasPlan && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <GoalInput onSubmit={generatePlan} isLoading={isLoading} />
              </div>
            )}

            {/* Results Section */}
            {hasPlan && plan && (
              <>
                {/* Plan Display */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <PlanDisplay goal={goal} plan={plan} />
                </div>

                {/* Mind Map */}
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                  <MindMap plan={plan} goal={goal} />
                </div>

                {/* Gantt Chart */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
                  <GanttChart plan={plan} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 animate-in fade-in duration-700 delay-700">
                  <Button
                    onClick={handleReset}
                    size="lg"
                    variant="outline"
                    className="border-border/50 hover:border-primary/50"
                  >
                    Start New Plan
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    disabled={isLoading}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-neural"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Another
                  </Button>
                </div>
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-border/30 mt-20">
            <div className="container mx-auto px-6 py-8">
              <p className="text-center text-sm text-muted-foreground">
                SynapSense – Thought to Action AI Assistant • Built with React, TypeScript, and AI
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
