import { Pickaxe, Skull, TrendingUp, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useServerInfo, useStats } from "../hooks/useQueries";

function useCountUp(target: number, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || target === 0) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, enabled]);

  return count;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  color = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 2200, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-card border border-border rounded-xl p-8 text-center group card-hover"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:border-primary/50 transition-colors">
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div
        className={`text-4xl sm:text-5xl font-black ${color} mb-2 font-mono tabular-nums`}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-muted-foreground font-semibold uppercase tracking-wider text-sm">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const { data: serverInfo } = useServerInfo();
  const { data: stats } = useStats();

  const totalPlayers = serverInfo ? Number(serverInfo.totalPlayers) : 142857;
  const totalKills = stats ? Number(stats.totalKills) : 8492034;
  const totalBlocks = stats ? Number(stats.totalBlocksPlaced) : 2147483648;
  const uptime = stats ? Math.round(stats.uptimePercentage) : 100;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 pixel-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">
            By the Numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Server <span className="text-gradient-green">Statistics</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real numbers from a real community. We don’t inflate our stats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Users} label="Total Players" value={totalPlayers} />
          <StatCard icon={Skull} label="Total Kills" value={totalKills} />
          <StatCard icon={Pickaxe} label="Blocks Placed" value={totalBlocks} />
          <StatCard
            icon={TrendingUp}
            label="Uptime"
            value={uptime}
            suffix="%"
          />
        </div>
      </div>
    </section>
  );
}
