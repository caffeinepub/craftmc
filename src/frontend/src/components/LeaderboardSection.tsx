import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useLeaderboard } from "../hooks/useQueries";

const FALLBACK_LEADERS = [
  { playerName: "DragonSlayer99", score: BigInt(98472) },
  { playerName: "ShadowBlade_X", score: BigInt(87651) },
  { playerName: "EmeraldKnight", score: BigInt(76234) },
  { playerName: "NightWatcher", score: BigInt(65890) },
  { playerName: "CrystalMage", score: BigInt(54321) },
  { playerName: "IronForge99", score: BigInt(43109) },
  { playerName: "VoidWalker", score: BigInt(38765) },
  { playerName: "StormBreaker", score: BigInt(29847) },
  { playerName: "FrostByte", score: BigInt(21543) },
  { playerName: "PixelProwler", score: BigInt(14289) },
];

function getMedalInfo(rank: number) {
  if (rank === 1) return { label: "\uD83E\uDD47", badge: "Gold" };
  if (rank === 2) return { label: "\uD83E\uDD48", badge: "Silver" };
  if (rank === 3) return { label: "\uD83E\uDD49", badge: "Bronze" };
  return null;
}

export default function LeaderboardSection() {
  const { data: leaderboard } = useLeaderboard();
  const entries =
    leaderboard && leaderboard.length > 0
      ? leaderboard.slice(0, 10)
      : FALLBACK_LEADERS;

  return (
    <section
      id="leaderboard"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 pixel-grid opacity-15" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Hall of Fame
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Top <span className="text-gradient-green">Players</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The warriors who dominate the leaderboards. Do you have what it
            takes?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 40px oklch(0.72 0.22 145 / 0.08)" }}
        >
          <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-primary/10 via-transparent to-transparent flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="font-black text-foreground text-lg">
              Global Leaderboard
            </h3>
            <Badge
              variant="outline"
              className="ml-auto border-primary/30 text-primary text-xs"
            >
              <Crown className="w-3 h-3 mr-1" /> Season 3
            </Badge>
          </div>

          <Table data-ocid="leaderboard.table">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-bold text-xs uppercase tracking-wider w-16">
                  Rank
                </TableHead>
                <TableHead className="text-muted-foreground font-bold text-xs uppercase tracking-wider">
                  Player
                </TableHead>
                <TableHead className="text-muted-foreground font-bold text-xs uppercase tracking-wider text-right">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => {
                const rank = index + 1;
                const medal = getMedalInfo(rank);
                return (
                  <TableRow
                    key={entry.playerName}
                    data-ocid={`leaderboard.row.item.${rank}`}
                    className={`border-border transition-colors duration-150 ${
                      rank <= 3
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <TableCell className="font-black">
                      <div className="flex items-center gap-2">
                        {medal ? (
                          <span className="text-xl">{medal.label}</span>
                        ) : (
                          <span className="text-muted-foreground font-mono text-sm w-6 text-center">
                            #{rank}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary">
                          {entry.playerName.charAt(0).toUpperCase()}
                        </div>
                        <span
                          className={`font-bold ${
                            rank <= 3 ? "text-foreground" : "text-foreground/80"
                          }`}
                        >
                          {entry.playerName}
                        </span>
                        {rank === 1 && (
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                            MVP
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-black font-mono text-sm ${
                          rank <= 3 ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {Number(entry.score).toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
}
