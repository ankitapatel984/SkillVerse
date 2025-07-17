import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkillSearch } from "@/components/SkillSearch";
import { ProfileCard } from "@/components/ProfileCard";
import { User, apiService } from '@/services/api'; // Ensure this exists and has getPublicProfiles()
import { useAuth } from "@/contexts/AuthContext";

const Browse = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSkillSelect = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
    setPage(1); // Reset to page 1 when filters change
  };
  const { user ,isLoading} = useAuth(); // Get current user

 const fetchProfiles = async (skills: string[], page: number) => {
  setLoading(true);
  try {
    const response = await apiService.getPublicProfiles({ skills, page });

    let visibleProfiles = response.users || [];

    // Only filter if user is logged in
    if (user) {
      visibleProfiles = visibleProfiles.filter(
        (profile: any) => profile._id !== user._id
      );
    }

    setProfiles(visibleProfiles);
    setTotalPages(response.pages || 1);
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  // Wait until user is loaded before making the first API call
    if (isLoading) return;
  fetchProfiles(selectedSkills, page);
  
}, [selectedSkills, page, user]);


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Skills & People
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect match for your skill swap. Search by skill, browse categories, or explore popular talents in your area.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <SkillSearch
              onSkillSelect={handleSkillSelect}
              selectedSkills={selectedSkills}
            />
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {selectedSkills.length > 0
                  ? `Results for: ${selectedSkills.join(', ')}`
                  : 'Featured Members'}
              </h2>
              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </div>
            </div>

            {/* Profile Grid */}
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading profiles...</div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {profiles.map((profile, index) => (
                  <ProfileCard
                    key={index}
                    id={profile._id}
                    name={profile.name}
                    location={profile.location}
                    avatar={profile.avatar}
                    rating={profile.rating}
                    skillsOffered={profile.skillsOffered}
                    skillsWanted={profile.skillsWanted}
                    availability={profile.availability}
                    bio={profile.bio}
                    completedSwaps={profile.completedSwaps}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
                <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
