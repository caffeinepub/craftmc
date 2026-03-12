import { Users } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useGameModes } from "../hooks/useQueries";

const FALLBACK_MODES = [
  {
    icon: "\uD83C\uDF3F",
    name: "Survival",
    description:
      "Classic Minecraft survival with a twist. Build, explore, and survive in a vast world with custom biomes and unique challenges.",
    playerCount: BigInt(892),
  },
  {
    icon: "\u2694\uFE0F",
    name: "Factions",
    description:
      "Form alliances, claim territory, raid enemies, and dominate the server. Strategic PvP at its finest.",
    playerCount: BigInt(634),
  },
  {
    icon: "\uD83C\uDF0D",
    name: "Skyblock",
    description:
      "Start on a tiny island floating in the void. Expand your island, gather resources, and build an empire in the sky.",
    playerCount: BigInt(741),
  },
  {
    icon: "\uD83D\uDDE1\uFE0F",
    name: "PvP Arena",
    description:
      "Jump into intense 1v1 duels, team battles, and ranked tournaments. Prove your combat skills against the best.",
    playerCount: BigInt(523),
  },
  {
    icon: "\uD83C\uDFC7",
    name: "Creative",
    description:
      "Unlimited blocks, unlimited imagination. Build stunning structures and showcase your creativity with no limits.",
    playerCount: BigInt(312),
  },
  {
    icon: "\uD83C\uDFAE",
    name: "Mini Games",
    description:
      "Bed Wars, Sky Wars, Hunger Games, and more. Dozens of fun mini-games for quick sessions or full evenings.",
    playerCount: BigInt(445),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GameModesSection() {
  const { data: gameModes } = useGameModes();
  const modes = gameModes && gameModes.length > 0 ? gameModes : FALLBACK_MODES;

  return (
    <section
      id="gamemodes"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 pixel-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Choose Your Adventure
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Game <span className="text-gradient-green">Modes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six unique experiences. Hundreds of hours of gameplay. One legendary
            server.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modes.slice(0, 6).map((mode, index) => (
            <motion.div
              key={mode.name}
              variants={itemVariants}
              data-ocid={`gamemodes.item.${index + 1}`}
              className="group relative bg-card border border-border rounded-xl p-6 card-hover cursor-pointer"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0 w-14 h-14 flex items-center justify-center bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors">
                  {mode.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-foreground mb-1 group-hover:text-primary transition-colors">
                    {mode.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary text-xs font-bold">
                      {Number(mode.playerCount).toLocaleString()} online
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                {mode.description}
              </p>

              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider">
                  Click to Join
                </span>
                <span className="text-primary text-xs font-bold">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
