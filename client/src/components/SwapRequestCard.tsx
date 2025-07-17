import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle, XCircle, MessageSquare, Calendar, ArrowRightLeft } from "lucide-react";

type SwapStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

interface SwapRequestCardProps {
  _id: string;
  requesterName: string;
  requesterAvatar?: string;
  offeredSkill: string;
  wantedSkill: string;
  message?: string;
  status: SwapStatus;
  createdAt: string;
  type: 'sent' | 'received';
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onMessage?: () => void;
}

const statusConfig = {
  pending: { 
    color: 'bg-warning/10 text-warning border-warning/20', 
    icon: Clock, 
    label: 'Pending' 
  },
  accepted: { 
    color: 'bg-success/10 text-success border-success/20', 
    icon: CheckCircle, 
    label: 'Accepted' 
  },
  rejected: { 
    color: 'bg-destructive/10 text-destructive border-destructive/20', 
    icon: XCircle, 
    label: 'Rejected' 
  },
  completed: { 
    color: 'bg-primary/10 text-primary border-primary/20', 
    icon: CheckCircle, 
    label: 'Completed' 
  },
  cancelled: { 
    color: 'bg-muted text-muted-foreground border-muted', 
    icon: XCircle, 
    label: 'Cancelled' 
  }
};

export const SwapRequestCard = ({
  _id,
  requesterName,
  requesterAvatar,
  offeredSkill,
  wantedSkill,
  message,
  status,
  createdAt,
  type,
  onAccept,
  onReject,
  onCancel,
  onMessage
}: SwapRequestCardProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  return (
    <Card className="shadow-soft hover:shadow-medium transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={requesterAvatar} alt={requesterName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {requesterName?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{requesterName}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {new Date(createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          
          <Badge className={`${config.color} flex items-center space-x-1 px-3 py-1`}>
            <StatusIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{config.label}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skill Exchange */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-primary">{type === 'sent' ? 'You offer' : 'They offer'}</div>
                <Badge variant="outline" className="skill-tag-offered mt-1">
                  {offeredSkill}
                </Badge>
              </div>
              
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
              
              <div className="text-center">
                <div className="font-medium text-secondary">{type === 'sent' ? 'You want' : 'They want'}</div>
                <Badge variant="outline" className="skill-tag-wanted mt-1">
                  {wantedSkill}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-background border rounded-lg p-3">
            <p className="text-sm text-muted-foreground italic">"{message}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          <Button variant="ghost" size="sm" onClick={onMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>

          <div className="flex space-x-2">
            {type === 'received' && status === 'pending' && (
              <>
                <Button variant="outline" size="sm" onClick={onReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button size="sm" onClick={onAccept}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
              </>
            )}
            
            {type === 'sent' && status === 'pending' && (
              <Button variant="outline" size="sm" onClick={onCancel}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            
            {status === 'accepted' && (
              <Button size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};