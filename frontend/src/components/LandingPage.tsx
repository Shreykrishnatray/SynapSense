import { Brain, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

/**
 * Landing Page Component
 * Displays hero section with title, subtitle, and CTA button
 */
const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-neural">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
            <Brain className="w-20 h-20 text-primary relative z-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
          SynapSense 💡
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
          Thought to Action
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          Transform your ideas into actionable plans with AI-powered project planning. 
          Generate mind maps, timelines, and structured workflows instantly.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-500">
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth">
            <Sparkles className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-sm text-muted-foreground">
              Let AI break down your goals into actionable steps
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth">
            <Brain className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Visual Mind Maps</h3>
            <p className="text-sm text-muted-foreground">
              Interactive node-based visualization of your plan
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth">
            <Zap className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Timeline View</h3>
            <p className="text-sm text-muted-foreground">
              Gantt charts to track tasks and durations
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-neural hover:shadow-glow transition-smooth"
          >
            Generate Your Plan
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-muted-foreground/60 mt-8 animate-in fade-in duration-700 delay-1000">
          Powered by advanced AI • No sign-up required
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
