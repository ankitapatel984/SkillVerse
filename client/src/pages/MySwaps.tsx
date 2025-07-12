import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SwapRequestCard } from "@/components/SwapRequestCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Clock, CheckCircle, Users } from "lucide-react";

// Mock data for demonstration
const mockSwaps = {
  sent: [
    {
      id: "1",
      requesterName: "You",
      skillOffered: "Web Development",
      skillWanted: "Piano Lessons",
      message: "Hi! I'd love to learn piano and can teach you modern web development in return.",
      status: "pending" as const,
      createdAt: "2024-01-15",
      type: "sent" as const
    },
    {
      id: "2",
      requesterName: "You",
      skillOffered: "React Development",
      skillWanted: "Spanish Conversation",
      status: "accepted" as const,
      createdAt: "2024-01-10",
      type: "sent" as const
    }
  ],
  received: [
    {
      id: "3",
      requesterName: "Alex Thompson",
      requesterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skillOffered: "Photography",
      skillWanted: "Web Development",
      message: "I've been wanting to learn web development for my portfolio website. Happy to teach photography basics!",
      status: "pending" as const,
      createdAt: "2024-01-16",
      type: "received" as const
    },
    {
      id: "4",
      requesterName: "Maria Santos",
      requesterAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      skillOffered: "Graphic Design",
      skillWanted: "TypeScript",
      status: "completed" as const,
      createdAt: "2024-01-05",
      type: "received" as const
    }
  ]
};

const MySwaps = () => {
  const [activeTab, setActiveTab] = useState("received");

  const stats = {
    total: mockSwaps.sent.length + mockSwaps.received.length,
    pending: [...mockSwaps.sent, ...mockSwaps.received].filter(s => s.status === 'pending').length,
    completed: [...mockSwaps.sent, ...mockSwaps.received].filter(s => s.status === 'completed').length,
  };

  const handleAccept = (id: string) => {
    console.log(`Accepting swap ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejecting swap ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancelling swap ${id}`);
  };

  const handleMessage = (id: string) => {
    console.log(`Opening message for swap ${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Skill Swaps
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your skill exchange requests, track progress, and connect with your learning partners.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Active exchanges
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting response
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground">
                  Successful swaps
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Swap Requests */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Swap Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="received" className="flex items-center space-x-2">
                    <span>Received</span>
                    {mockSwaps.received.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {mockSwaps.received.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center space-x-2">
                    <span>Sent</span>
                    {mockSwaps.sent.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {mockSwaps.sent.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="received" className="mt-6 space-y-4">
                  {mockSwaps.received.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No received requests yet.</p>
                    </div>
                  ) : (
                    mockSwaps.received.map((swap) => (
                      <SwapRequestCard
                        key={swap.id}
                        {...swap}
                        onAccept={() => handleAccept(swap.id)}
                        onReject={() => handleReject(swap.id)}
                        onMessage={() => handleMessage(swap.id)}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="sent" className="mt-6 space-y-4">
                  {mockSwaps.sent.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No sent requests yet.</p>
                    </div>
                  ) : (
                    mockSwaps.sent.map((swap) => (
                      <SwapRequestCard
                        key={swap.id}
                        {...swap}
                        onCancel={() => handleCancel(swap.id)}
                        onMessage={() => handleMessage(swap.id)}
                      />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MySwaps;