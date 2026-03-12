import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type ServerInfo = {
    name : Text;
    ip : Text;
    description : Text;
    maxPlayers : Nat;
    onlinePlayers : Nat;
    totalPlayers : Nat;
  };

  type NewsPost = {
    title : Text;
    content : Text;
    date : Time.Time;
    category : Text;
  };

  type GameMode = {
    name : Text;
    description : Text;
    icon : Text;
    playerCount : Nat;
  };

  type Stats = {
    uptimePercentage : Float;
    totalKills : Nat;
    totalBlocksPlaced : Nat;
  };

  type LeaderboardEntry = {
    playerName : Text;
    score : Nat;
  };

  let initialServerInfo : ServerInfo = {
    name = "Blockverse";
    ip = "play.blockverse.com";
    description = "The ultimate Minecraft experience!";
    maxPlayers = 200;
    onlinePlayers = 15;
    totalPlayers = 3472;
  };

  let initialNews : [NewsPost] = [
    {
      title = "New Game Mode Released!";
      content = "Try our new Skyblock mode with unique challenges.";
      date = 1700000000000000000;
      category = "Updates";
    },
    {
      title = "Upcoming Events";
      content = "Join our monthly build competition with prizes!";
      date = 1705000000000000000;
      category = "Events";
    },
  ];

  let initialGameModes : [GameMode] = [
    {
      name = "Survival";
      description = "Classic survival gameplay";
      icon = "survival_icon";
      playerCount = 48;
    },
    {
      name = "Creative";
      description = "Unlimited resources for building";
      icon = "creative_icon";
      playerCount = 21;
    },
    {
      name = "Skyblock";
      description = "Isolated island challenge";
      icon = "skyblock_icon";
      playerCount = 13;
    },
  ];

  let initialStats : Stats = {
    uptimePercentage = 94.3;
    totalKills = 892003;
    totalBlocksPlaced = 17490031;
  };

  let initialLeaderboard : [LeaderboardEntry] = [
    { playerName = "Herobrine"; score = 5823 },
    { playerName = "SteveMC"; score = 5603 },
    { playerName = "BlockMaster"; score = 4630 },
    { playerName = "PixelPro"; score = 3981 },
  ];

  let gameModes = List.fromArray<GameMode>(initialGameModes);
  let news = List.fromArray<NewsPost>(initialNews);
  let leaderboard = List.fromArray<LeaderboardEntry>(initialLeaderboard);

  var serverInfo = initialServerInfo;
  var stats = initialStats;

  public query ({ caller }) func getServerInfo() : async ServerInfo {
    serverInfo;
  };

  public query ({ caller }) func getAllGameModes() : async [GameMode] {
    gameModes.toArray();
  };

  public query ({ caller }) func getStats() : async Stats {
    stats;
  };

  public query ({ caller }) func getLeaderboard() : async [LeaderboardEntry] {
    leaderboard.toArray();
  };

  public query ({ caller }) func getAllNews() : async [NewsPost] {
    news.toArray();
  };

  public shared ({ caller }) func updateOnlinePlayerCount(count : Nat) : async () {
    serverInfo := {
      serverInfo with
      onlinePlayers = count;
    };
  };

  public shared ({ caller }) func addTotalPlayers(count : Nat) : async () {
    serverInfo := {
      serverInfo with
      totalPlayers = count;
    };
  };
};
