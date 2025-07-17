import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SwapRequestCard } from "@/components/SwapRequestCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Clock, CheckCircle, Users } from "lucide-react";
import { apiService } from "@/services/api";



const MySwaps = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [swaps, setSwaps] = useState({ sentSwaps: [], receivedSwaps: [] });

useEffect(() => {
  const fetchSwaps = async () => {
    const data = await apiService.getMySwaps(); // { sentSwaps, receivedSwaps }
    setSwaps(data);
  };
  fetchSwaps();
}, []);


  const stats = {
    total: swaps.sentSwaps.length + swaps.receivedSwaps.length,
    pending: [...swaps.sentSwaps, ...swaps.receivedSwaps].filter(s => s.status === 'pending').length,
    completed: [...swaps.sentSwaps, ...swaps.receivedSwaps].filter(s => s.status === 'completed').length,
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
                    {swaps.receivedSwaps.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {swaps.receivedSwaps.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center space-x-2">
                    <span>Sent</span>
                    {swaps.sentSwaps.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {swaps.sentSwaps.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="received" className="mt-6 space-y-4">
                  {swaps.receivedSwaps.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No received requests yet.</p>
                    </div>
                  ) : (
                    swaps.receivedSwaps.map((swap) => (
                      <SwapRequestCard
                      type="received"
                        key={swap._id}
                        {...swap}
                        onAccept={() => handleAccept(swap._id)}
                        onReject={() => handleReject(swap._id)}
                        onMessage={() => handleMessage(swap._id)}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="sent" className="mt-6 space-y-4">
                  {swaps.sentSwaps.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No sent requests yet.</p>
                    </div>
                  ) : (
                    swaps.sentSwaps.map((swap) => (
                      <SwapRequestCard
                        key={swap._id}
                        type="sent"
                        {...swap}
                        onCancel={() => handleCancel(swap._id)}
                        onMessage={() => handleMessage(swap._id)}
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