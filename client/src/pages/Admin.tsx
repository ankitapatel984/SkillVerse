import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  MessageSquare, 
  Ban, 
  Trash2,
  Eye,
  Send,
  BarChart3
} from "lucide-react";

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  activeSwaps: 89,
  pendingReports: 3,
  monthlyGrowth: 12.5
};

const mockReports = [
  {
    id: "1",
    type: "Inappropriate Content",
    reportedUser: "John Doe",
    reportedBy: "Jane Smith",
    description: "User posted inappropriate content in their skill description.",
    date: "2024-01-16",
    status: "pending"
  },
  {
    id: "2",
    type: "Spam",
    reportedUser: "Mike Wilson",
    reportedBy: "Sarah Chen",
    description: "User is sending spam messages to multiple users.",
    date: "2024-01-15",
    status: "investigating"
  }
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2024-01-10",
    swapsCount: 5,
    rating: 4.2
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "banned",
    joinDate: "2024-01-08",
    swapsCount: 2,
    rating: 3.8
  }
];

const Admin = () => {
  const [announcement, setAnnouncement] = useState("");

  const handleBanUser = (userId: string) => {
    console.log(`Banning user ${userId}`);
  };

  const handleDeleteContent = (reportId: string) => {
    console.log(`Deleting content for report ${reportId}`);
  };

  const handleSendAnnouncement = () => {
    if (announcement.trim()) {
      console.log("Sending announcement:", announcement);
      setAnnouncement("");
    }
  };

  const downloadReport = (type: string) => {
    console.log(`Downloading ${type} report`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center">
                <Shield className="h-8 w-8 mr-3 text-primary" />
                Admin{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2">
                  Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage users, monitor platform activity, and maintain community standards
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{mockStats.monthlyGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.activeSwaps}</div>
                <p className="text-xs text-muted-foreground">
                  Currently in progress
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.pendingReports}</div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{mockStats.monthlyGrowth}%</div>
                <p className="text-xs text-muted-foreground">
                  Monthly user growth
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                    User Reports & Content Moderation
                  </CardTitle>
                  <CardDescription>
                    Review and take action on reported content and users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {report.type}
                              </Badge>
                              <Badge 
                                variant={report.status === 'pending' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {report.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="font-medium">
                                Reported User: <span className="text-primary">{report.reportedUser}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Reported by: {report.reportedBy} • {report.date}
                              </p>
                            </div>
                            <p className="text-sm">{report.description}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteContent(report.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleBanUser(report.reportedUser)}>
                              <Ban className="h-4 w-4 mr-2" />
                              Ban User
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    View and manage all platform users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{user.name}</p>
                              <Badge 
                                variant={user.status === 'active' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined: {user.joinDate} • {user.swapsCount} swaps • {user.rating}★
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant={user.status === 'banned' ? 'default' : 'destructive'} 
                            size="sm"
                            onClick={() => handleBanUser(user.id)}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            {user.status === 'banned' ? 'Unban' : 'Ban'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Send Platform Announcements
                  </CardTitle>
                  <CardDescription>
                    Communicate important updates to all users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Announcement Message</label>
                    <Textarea
                      placeholder="Enter your announcement message..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button onClick={handleSendAnnouncement} disabled={!announcement.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Analytics & Reports
                  </CardTitle>
                  <CardDescription>
                    Download detailed reports and analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => downloadReport('users')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download User Report
                    </Button>
                    <Button variant="outline" onClick={() => downloadReport('swaps')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Swap Statistics
                    </Button>
                    <Button variant="outline" onClick={() => downloadReport('activity')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Activity Logs
                    </Button>
                    <Button variant="outline" onClick={() => downloadReport('revenue')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Revenue Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;