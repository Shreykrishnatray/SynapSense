import { CheckCircle2, FileText, Copy, Check, Edit3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PlanDisplayProps {
  goal: string;
  plan: string;
  onPlanUpdate: (updated: string) => void; // ✅ NEW
}

const PlanDisplay = ({ goal, plan, onPlanUpdate }: PlanDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(plan);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plan);
    setCopied(true);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onPlanUpdate(draft);
    setIsEditing(false);
    toast({ title: "Plan updated ✨" });
  };

  const formatPlan = (text: string) =>
    text.split("\n").filter(Boolean).map((line, idx) => (
      <div key={idx} className="flex gap-3 mb-3">
        <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
        <p>{line}</p>
      </div>
    ));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card/50 rounded-2xl p-8 border shadow-neural">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">Your Action Plan</h3>
            <p className="text-sm text-muted-foreground">
              Goal: <span className="font-medium">{goal}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full min-h-[200px] p-4 rounded-lg bg-background border"
          />
        ) : (
          <div>{formatPlan(plan)}</div>
        )}

        {isEditing && (
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDisplay;

