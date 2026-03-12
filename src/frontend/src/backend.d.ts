import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Stats {
    totalBlocksPlaced: bigint;
    uptimePercentage: number;
    totalKills: bigint;
}
export interface LeaderboardEntry {
    score: bigint;
    playerName: string;
}
export type Time = bigint;
export interface GameMode {
    icon: string;
    name: string;
    playerCount: bigint;
    description: string;
}
export interface ServerInfo {
    ip: string;
    totalPlayers: bigint;
    onlinePlayers: bigint;
    name: string;
    description: string;
    maxPlayers: bigint;
}
export interface NewsPost {
    title: string;
    content: string;
    date: Time;
    category: string;
}
export interface backendInterface {
    addTotalPlayers(count: bigint): Promise<void>;
    getAllGameModes(): Promise<Array<GameMode>>;
    getAllNews(): Promise<Array<NewsPost>>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getServerInfo(): Promise<ServerInfo>;
    getStats(): Promise<Stats>;
    updateOnlinePlayerCount(count: bigint): Promise<void>;
}
