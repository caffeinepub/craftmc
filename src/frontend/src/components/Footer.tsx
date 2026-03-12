import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { SiDiscord } from "react-icons/si";

const footerLinks = [
  { label: "Store", href: "#" },
  { label: "Vote", href: "#" },
  { label: "Discord", href: "https://discord.gg/craftmc" },
  { label: "Rules", href: "#" },
  { label: "Support", href: "#" },
  { label: "Staff", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/assets/generated/craftmc-logo-transparent.dim_200x60.png"
              alt="CraftMC"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The ultimate Minecraft network. Premium gameplay, dedicated staff,
              and a passionate community since 2018.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-semibold">
                play.craftmc.net
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-black text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black text-sm uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              <div className="bg-background/60 border border-border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Java Edition
                </p>
                <p className="font-mono text-primary font-semibold text-sm">
                  play.craftmc.net
                </p>
              </div>
              <div className="bg-background/60 border border-border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Bedrock Edition
                </p>
                <p className="font-mono text-primary font-semibold text-sm">
                  bedrock.craftmc.net
                </p>
                <p className="font-mono text-muted-foreground text-xs">
                  Port: 19132
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.open("https://discord.gg/craftmc", "_blank")
                }
                className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition-all duration-200"
                style={{
                  background: "oklch(0.4 0.15 280 / 0.3)",
                  border: "1px solid oklch(0.5 0.18 280 / 0.3)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <SiDiscord className="w-4 h-4" />
                Join our Discord
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
        >
          <p>
            © {year} CraftMC. All rights reserved. Not affiliated with Mojang or
            Microsoft.
          </p>
          <p>
            Built with ❤ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
