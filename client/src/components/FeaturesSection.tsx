import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, MessageSquare, Star, Shield, Calendar } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Create Your Profile",
    description: "Showcase your skills and what you'd like to learn. Control your privacy settings and availability.",
    color: "text-primary"
  },
  {
    icon: Search,
    title: "Discover Skills",
    description: "Browse and search for specific skills. Find the perfect match for your learning goals.",
    color: "text-secondary"
  },
  {
    icon: MessageSquare,
    title: "Request Swaps",
    description: "Send skill swap requests and manage your exchanges. Track pending and active swaps.",
    color: "text-accent"
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Give feedback after each swap. Build your reputation and help others make informed decisions.",
    color: "text-warning"
  },
  {
    icon: Calendar,
    title: "Schedule Flexibility",
    description: "Set your availability and find others who match your schedule. Learn at your own pace.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Safe Community",
    description: "Verified profiles, secure messaging, and community guidelines keep everyone safe.",
    color: "text-success"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How SkillVerse Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, safe, and effective skill sharing in just a few steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-smooth border-0 shadow-soft">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};