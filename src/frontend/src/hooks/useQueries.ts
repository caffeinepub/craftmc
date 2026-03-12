import { useQuery } from "@tanstack/react-query";
import type {
  GameMode,
  LeaderboardEntry,
  NewsPost,
  ServerInfo,
  Stats,
} from "../backend.d";
import { useActor } from "./useActor";

export function useServerInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ServerInfo>({
    queryKey: ["serverInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getServerInfo();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGameModes() {
  const { actor, isFetching } = useActor();
  return useQuery<GameMode[]>({
    queryKey: ["gameModes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGameModes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery<NewsPost[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNews();
    },
    enabled: !!actor && !isFetching,
  });
}
