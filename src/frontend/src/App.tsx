import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DiscordBanner from "./components/DiscordBanner";
import Footer from "./components/Footer";
import GameModesSection from "./components/GameModesSection";
import HeroSection from "./components/HeroSection";
import LeaderboardSection from "./components/LeaderboardSection";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import ServerStatusBar from "./components/ServerStatusBar";
import StatsSection from "./components/StatsSection";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <ServerStatusBar />
          <GameModesSection />
          <StatsSection />
          <LeaderboardSection />
          <NewsSection />
          <DiscordBanner />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </QueryClientProvider>
  );
}
