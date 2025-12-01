import { CheckCircle2, FileText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PlanDisplayProps {
  goal: string;
  plan: string;
}

/**
 * Plan Display Component
 * Shows the AI-generated plan with formatted text
 * Includes copy-to-clipboard functionality
 */
const PlanDisplay = ({ goal, plan }: PlanDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plan);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Plan has been copied successfully",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Parse plan into sections (if it has numbered steps or bullets)
  const formatPlan = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Check if line is a numbered step
      if (/^\d+\./.test(trimmed)) {
        return (
          <div key={idx} className="flex gap-3 mb-4 animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-foreground/90">{trimmed}</p>
          </div>
        );
      }
      
      // Check if line is a bullet point
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        return (
          <div key={idx} className="flex gap-3 mb-3 ml-6 animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
            <span className="text-primary">•</span>
            <p className="text-foreground/80">{trimmed.substring(1).trim()}</p>
          </div>
        );
      }
      
      // Regular paragraph
      if (trimmed.length > 0) {
        return (
          <p key={idx} className="mb-3 text-foreground/90 animate-in fade-in duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
            {trimmed}
          </p>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-neural">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-border/30">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Action Plan</h3>
              <p className="text-sm text-muted-foreground">
                Goal: <span className="text-foreground font-medium">{goal}</span>
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2 border-border/50 hover:border-primary/50 transition-smooth"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Plan Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-2">
            {formatPlan(plan)}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            ✨ AI-generated plan • Review and adjust based on your specific needs
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;
