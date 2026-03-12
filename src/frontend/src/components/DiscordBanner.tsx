import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";
import { motion } from "motion/react";
import { SiDiscord } from "react-icons/si";

const BLOCKS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function DiscordBanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.18 280), oklch(0.22 0.14 275), oklch(0.12 0.08 265))",
        }}
      />
      <div className="absolute inset-0 pixel-grid opacity-20" />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.5 0.2 280 / 0.2)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.4 0.15 290 / 0.2)" }}
      />

      {BLOCKS.map((i) => (
        <motion.div
          key={`block-${i}`}
          className="absolute w-4 h-4 rounded-sm"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 20}%`,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          animate={{ rotate: [0, 90, 180, 270, 360], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 8 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <SiDiscord className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Join Our
            <br />
            <span style={{ color: "oklch(0.85 0.15 280)" }}>Community</span>
          </h2>

          <p className="text-white/70 text-lg sm:text-xl mb-4 max-w-2xl mx-auto">
            Connect with thousands of players. Get the latest updates,
            participate in giveaways, find teammates, and get support from our
            friendly staff team.
          </p>

          <div className="flex items-center justify-center gap-2 mb-10">
            <Users
              className="w-5 h-5"
              style={{ color: "oklch(0.85 0.15 280)" }}
            />
            <span className="text-white font-bold text-lg">12,847</span>
            <span className="text-white/60">members online</span>
            <span
              className="w-2 h-2 rounded-full animate-pulse ml-2"
              style={{ background: "oklch(0.72 0.22 145)" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              type="button"
              data-ocid="discord.join.primary_button"
              size="lg"
              onClick={() =>
                window.open("https://discord.gg/craftmc", "_blank")
              }
              className="text-white font-black text-lg px-10 py-6 rounded-xl gap-3"
              style={{
                background: "oklch(0.55 0.22 280)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 30px oklch(0.55 0.22 280 / 0.4)",
              }}
            >
              <SiDiscord className="w-5 h-5" />
              Join Discord
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={() => window.open("https://craftmc.net/rules", "_blank")}
              className="font-semibold px-8 py-6 rounded-xl text-lg"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Read Rules
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
