import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useAllNews } from "../hooks/useQueries";

const FALLBACK_NEWS = [
  {
    title: "Season 3 Launch: New Factions Map & Custom Enchants",
    content:
      "The long-awaited Season 3 is finally here! Explore a brand-new 10,000x10,000 factions map with custom terrain generation, 50+ custom enchantments, and exclusive seasonal rewards. The top faction at season end will receive exclusive in-game items and real prizes.",
    date: BigInt(Date.now() * 1_000_000 - 86400_000_000_000 * 2),
    category: "Update",
  },
  {
    title: "Weekend PvP Tournament \u2014 $500 Prize Pool",
    content:
      "Join us this Saturday for the biggest PvP tournament of the year! Register your team of 4 before Friday midnight. Bracket system, live spectating, and a $500 prize pool split between the top 3 teams. All skill levels welcome.",
    date: BigInt(Date.now() * 1_000_000 - 86400_000_000_000 * 5),
    category: "Event",
  },
  {
    title: "Skyblock 2.0 Beta: Island Levels & Coop Farming",
    content:
      "Skyblock is getting a massive overhaul! Island levels, cooperative farming plots, new island challenges, and a brand-new progression system. Beta testers get exclusive cosmetics and early access to the new quest system launching next month.",
    date: BigInt(Date.now() * 1_000_000 - 86400_000_000_000 * 8),
    category: "Announcement",
  },
  {
    title: "Server Hardware Upgrade \u2014 50% Better Performance",
    content:
      "We've upgraded our servers to new high-performance hardware. Expect significantly reduced lag, faster chunk loading, and improved TPS across all game modes. This is our biggest infrastructure investment to date.",
    date: BigInt(Date.now() * 1_000_000 - 86400_000_000_000 * 12),
    category: "Maintenance",
  },
];

const categoryColors: Record<string, string> = {
  Update: "bg-primary/20 text-primary border-primary/30",
  Event: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  Announcement: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  Maintenance: "bg-muted text-muted-foreground border-border",
};

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsSection() {
  const { data: news } = useAllNews();
  const posts = news && news.length > 0 ? news : FALLBACK_NEWS;

  return (
    <section id="news" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 pixel-grid opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Stay Updated
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            News & <span className="text-gradient-green">Updates</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The latest announcements, events, and server updates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 4).map((post, index) => (
            <motion.article
              key={post.title}
              data-ocid={`news.item.${index + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-card border border-border rounded-xl p-6 card-hover cursor-pointer ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge
                  variant="outline"
                  className={`text-xs font-bold ${
                    categoryColors[post.category] ?? categoryColors.Maintenance
                  }`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>

              <h3
                className={`font-black text-foreground group-hover:text-primary transition-colors mb-3 ${
                  index === 0 ? "text-2xl" : "text-lg"
                }`}
              >
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {post.content}
              </p>

              <div className="mt-4 flex items-center text-primary text-sm font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <span>→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
