import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SkillVerse</span>
            </div>
            <p className="text-background/70 max-w-xs">
              Building connections through skill sharing. Learn, teach, and grow together.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform</h3>
            <div className="space-y-2">
              <Link to="/browse" className="block text-background/70 hover:text-background transition-smooth">
                Browse Skills
              </Link>
              <Link to="/how-it-works" className="block text-background/70 hover:text-background transition-smooth">
                How It Works
              </Link>
              <Link to="/safety" className="block text-background/70 hover:text-background transition-smooth">
                Safety Guidelines
              </Link>
              <Link to="/pricing" className="block text-background/70 hover:text-background transition-smooth">
                Pricing
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Community</h3>
            <div className="space-y-2">
              <Link to="/stories" className="block text-background/70 hover:text-background transition-smooth">
                Success Stories
              </Link>
              <Link to="/blog" className="block text-background/70 hover:text-background transition-smooth">
                Blog
              </Link>
              <Link to="/events" className="block text-background/70 hover:text-background transition-smooth">
                Events
              </Link>
              <Link to="/forum" className="block text-background/70 hover:text-background transition-smooth">
                Community Forum
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-background/70 hover:text-background transition-smooth">
                Help Center
              </Link>
              <Link to="/contact" className="block text-background/70 hover:text-background transition-smooth">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-background/70 hover:text-background transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-background/70 hover:text-background transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/70 text-sm">
            © 2024 SkillVerse. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-background/70 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>for skill sharing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};