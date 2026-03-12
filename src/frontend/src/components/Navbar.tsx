import { Button } from "@/components/ui/button";
import { Menu, Sword, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home.link" },
  { label: "Game Modes", href: "#gamemodes", ocid: "nav.gamemodes.link" },
  { label: "Leaderboard", href: "#leaderboard", ocid: "nav.leaderboard.link" },
  { label: "News", href: "#news", ocid: "nav.news.link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0"
              onClick={() => handleNavClick("#home")}
            >
              <img
                src="/assets/generated/craftmc-logo-transparent.dim_200x60.png"
                alt="CraftMC Logo"
                className="h-10 w-auto object-contain"
              />
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  data-ocid={link.ocid}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary/10"
                >
                  {link.label}
                </button>
              ))}
              <Button
                type="button"
                data-ocid="nav.discord.link"
                onClick={() =>
                  window.open("https://discord.gg/craftmc", "_blank")
                }
                className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-green"
                size="sm"
              >
                <Sword className="w-4 h-4" />
                Discord
              </Button>
            </nav>

            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  data-ocid={link.ocid}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary/10"
                >
                  {link.label}
                </button>
              ))}
              <Button
                type="button"
                data-ocid="nav.discord.link"
                onClick={() => {
                  window.open("https://discord.gg/craftmc", "_blank");
                  setMobileOpen(false);
                }}
                className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                Join Discord
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
