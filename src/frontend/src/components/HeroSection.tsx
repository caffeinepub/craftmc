import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Copy, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useServerInfo } from "../hooks/useQueries";

const PARTICLES = [0, 1, 2, 3, 4, 5];

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const { data: serverInfo } = useServerInfo();

  const ip = serverInfo?.ip ?? "play.craftmc.net";
  const name = serverInfo?.name ?? "CraftMC";
  const onlinePlayers = serverInfo ? Number(serverInfo.onlinePlayers) : 2847;
  const maxPlayers = serverInfo ? Number(serverInfo.maxPlayers) : 5000;

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      toast.success("Server IP copied to clipboard!", { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy IP");
    }
  };

  const scrollToGameModes = () => {
    document
      .getElementById("gamemodes")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/craftmc-hero-bg.dim_1920x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      <div className="absolute inset-0 pixel-grid opacity-30" />

      {PARTICLES.map((i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-sm bg-primary/40"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <Users className="w-4 h-4" />
            {onlinePlayers.toLocaleString()} Players Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 leading-none"
          >
            <span className="text-gradient-green">{name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4 max-w-2xl mx-auto"
          >
            {serverInfo?.description ??
              "The Ultimate Minecraft Experience. Join thousands of players in epic battles, survival challenges, and endless adventures."}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-sm text-muted-foreground/70 mb-10 uppercase tracking-widest font-medium"
          >
            Survival • Factions • Skyblock • PvP Arena • Mini Games
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-center gap-0 mb-8 max-w-md mx-auto"
          >
            <div className="flex-1 flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-l-lg px-5 py-3.5">
              <Zap className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-mono text-foreground text-sm sm:text-base font-semibold tracking-wider">
                {ip}
              </span>
            </div>
            <Button
              type="button"
              data-ocid="hero.copy_ip.button"
              onClick={handleCopyIP}
              className="rounded-l-none rounded-r-lg h-full px-5 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 border border-primary/50 glow-green"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy IP"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              type="button"
              data-ocid="hero.play.primary_button"
              size="lg"
              onClick={() => window.open("https://minecraft.net", "_blank")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-black px-10 py-6 glow-green-strong rounded-lg tracking-wide uppercase"
            >
              ⚔ Play Now
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={scrollToGameModes}
              className="border-border text-foreground hover:border-primary/60 hover:text-primary text-lg font-semibold px-8 py-6 rounded-lg"
            >
              Explore Modes
            </Button>
          </motion.div>

          {maxPlayers > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 text-xs text-muted-foreground/50 font-medium"
            >
              {onlinePlayers.toLocaleString()} / {maxPlayers.toLocaleString()}{" "}
              players online now
            </motion.p>
          )}
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer bg-transparent border-0 p-0"
        onClick={scrollToGameModes}
        aria-label="Scroll to game modes"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-primary/60" />
        </motion.div>
      </motion.button>
    </section>
  );
}
