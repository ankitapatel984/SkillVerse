import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";

const popularSkills = [
  "Web Development", "Guitar", "Photography", "Spanish", "Excel", "Cooking",
  "Yoga", "Piano", "Graphic Design", "Writing", "Marketing", "Dancing"
];

const categories = [
  "Technology", "Music", "Languages", "Arts & Crafts", "Sports & Fitness",
  "Business", "Cooking", "Photography", "Writing", "Health & Wellness"
];

interface SkillSearchProps {
  onSkillSelect: (skill: string) => void;
  selectedSkills: string[];
}

export const SkillSearch = ({ onSkillSelect, selectedSkills }: SkillSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSkillClick = (skill: string) => {
    onSkillSelect(skill);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Search Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for a skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Categories</h4>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 transition-smooth"
                    onClick={() => setSelectedCategory(
                      selectedCategory === category ? null : category
                    )}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Selected Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="default"
                    className="cursor-pointer hover:bg-destructive/90 transition-smooth"
                    onClick={() => onSkillSelect(skill)}
                  >
                    {skill}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Skills */}
      <Card className="shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Popular Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};