import { Clock, Users, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useServerInfo, useStats } from "../hooks/useQueries";

export default function ServerStatusBar() {
  const { data: serverInfo } = useServerInfo();
  const { data: stats } = useStats();

  const onlinePlayers = serverInfo ? Number(serverInfo.onlinePlayers) : 2847;
  const maxPlayers = serverInfo ? Number(serverInfo.maxPlayers) : 5000;
  const uptime = stats?.uptimePercentage ?? 99.9;
  const percentage = Math.round((onlinePlayers / maxPlayers) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative bg-card border-b border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              Server Online
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground font-semibold">
              {onlinePlayers.toLocaleString()}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">
              {maxPlayers.toLocaleString()} Players
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {percentage}%
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Uptime:</span>
            <span className="text-primary font-bold font-mono">
              {uptime.toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Wifi className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Ping:</span>
            <span className="text-primary font-bold font-mono">12ms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
