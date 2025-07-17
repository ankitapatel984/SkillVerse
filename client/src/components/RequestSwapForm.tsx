import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface RequestSwapFormProps {
  isOpen: boolean;
  onClose: () => void;
  toUserId: string;
  toUserName: string;
  toUserSkillsWanted: Array<{ name: string; level: string }>;
  toUserSkillsOffered: Array<{ name: string; level: string }>;
}

export const RequestSwapForm = ({
  isOpen,
  onClose,
  toUserId,
  toUserName,
  toUserSkillsWanted,
  toUserSkillsOffered
}: RequestSwapFormProps) => {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!offeredSkill || !wantedSkill) {
      toast({
        title: "Missing Information",
        description: "Please select both skills for the swap.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const result = await apiService.requestSwap({
      toUser: toUserId,
      offeredSkill,
      wantedSkill,
      message: message || `Hi ${toUserName}, I'd like to propose a skill swap!`
    });

    if (result.success) {
      toast({
        title: "Swap Request Sent",
        description: `Your swap request has been sent to ${toUserName}.`,
      });
      onClose();
      setOfferedSkill("");
      setWantedSkill("");
      setMessage("");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setOfferedSkill("");
    setWantedSkill("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Skill Swap</DialogTitle>
          <DialogDescription>
            Send a skill swap request to {toUserName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="offered-skill">What you want to offer</Label>
            <Select value={offeredSkill} onValueChange={setOfferedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill you can teach" />
              </SelectTrigger>
              <SelectContent>
                {toUserSkillsWanted.map((skill, index) => (
                  <SelectItem key={index} value={skill.name}>
                    {skill.name} ({skill.level})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wanted-skill">What do you want</Label>
            <Select value={wantedSkill} onValueChange={setWantedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill you want to learn" />
              </SelectTrigger>
              <SelectContent>
                {toUserSkillsOffered.map((skill, index) => (
                  <SelectItem key={index} value={skill.name}>
                    {skill.name} ({skill.level})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder={`Hi ${toUserName}, I'd like to propose a skill swap!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
