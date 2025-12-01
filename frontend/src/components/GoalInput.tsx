import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  isLoading: boolean;
}

/**
 * Goal Input Component
 * Text input form for users to enter their goal
 * Submits to backend API when user clicks Generate
 */
const GoalInput = ({ onSubmit, isLoading }: GoalInputProps) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-neural">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What's Your Goal?
            </h2>
            <p className="text-muted-foreground">
              Describe your project or idea, and let AI create a detailed action plan
            </p>
          </div>

          {/* Input Field */}
          <div className="space-y-3">
            <Label htmlFor="goal-input" className="text-lg font-semibold">
              Your Goal
            </Label>
            <Textarea
              id="goal-input"
              placeholder="e.g., Build a mobile app for fitness tracking, Launch an e-commerce store, Learn web development..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-smooth text-base"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Be specific for better results. Include timelines, technologies, or constraints if relevant.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!goal.trim() || isLoading}
            className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-neural hover:shadow-glow transition-smooth"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                Generate Plan
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        {/* Example Prompts */}
        <div className="mt-6 pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Build a SaaS product in 3 months",
              "Learn React and TypeScript",
              "Plan a marketing campaign",
              "Organize a tech conference"
            ].map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGoal(example)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground border border-border/30 transition-smooth disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalInput;
