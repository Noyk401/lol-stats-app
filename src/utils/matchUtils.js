export function getPlayerStats(match, puuid) {
  const player = match.info.participants.find((p) => p.puuid === puuid);

  if (!player) {
    return {
      kills: 0,
      deaths: 0,
      assists: 0,
      totalDamage: 0,
      cs: 0,
      controlWards: 0,
      win: false,
      lpGained: undefined,
      championName: 'Unknown',
    };
  }

  const cs = player.totalMinionsKilled + player.neutralMinionsKilled;

  return {
    kills: player.kills,
    deaths: player.deaths,
    assists: player.assists,
    totalDamage: player.totalDamageDealtToChampions,
    cs,
    controlWards: player.visionWardsBoughtInGame,
    win: player.win,
    lpGained: player.lpGained,
    championName: player.championName,
  };
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

export function getWinrate(champStats) {
  if (!champStats || champStats.length === 0) return 0;

  const totalGames = champStats.reduce((sum, s) => sum + (s.wins + s.losses), 0);
  const totalWins = champStats.reduce((sum, s) => sum + s.wins, 0);

  return totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : 0;
}

export function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
}

export function formatGameDate(timestamp) {
  // Ensure timestamp is valid
  if (!timestamp || isNaN(timestamp)) {
    return 'Unknown Date';
  }

  const date = new Date(timestamp);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Unknown Date';
  }

  // Format as Month Day, Year at Time (e.g., "Dec 15, 2024 at 2:30 PM")
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getGameType(queueId) {
  const queueMap = {
    // Ranked Modes
    4: 'Ranked Solo/Duo',
    5: 'Ranked Flex',
    6: 'Ranked Team',
    1400: 'Ranked Solo/Duo',
    440: 'Ranked Flex',
    410: 'Ranked Flex',
    420: 'Ranked Solo/Duo',

    // Normal Modes
    2: 'Draft Pick',
    14: 'Draft Pick',
    400: 'Draft Pick',
    430: 'Blind Pick',
    1300: 'Blind Pick',

    // ARAM
    33: 'ARAM',
    65: 'ARAM',
    1100: 'ARAM',

    // Arena
    1800: 'Arena',

    // Swift Play
    2500: 'Swift Play',

    // Co-op vs AI (Bots)
    16: 'Co-op vs AI',
    25: 'Co-op vs AI',
    31: 'Co-op vs AI',
    32: 'Co-op vs AI',
    52: 'Co-op vs AI',

    // Other Modes
    0: 'Custom',
    1: 'Normal',
    8: 'Co-op vs AI',
    17: 'Normal',
    70: 'One For All',
    72: 'One For All',
    76: 'URF',
    78: 'One For All',
    83: 'Ultimate Spellbook',
    900: 'ARURF',
    920: 'Normal',
    921: 'Draft Pick',
    922: 'Ranked Solo/Duo',
    940: 'Nexus Blitz',
    950: 'King Poro',
    1000: 'Project Overcharge',
    1010: 'ARURF',
    1020: 'One For All',
    1030: 'Poro King',
    1040: 'Ascension',
    1050: 'Butchers Bridge',
    1200: 'Nexus Blitz',
    1900: 'URF',
    2000: 'Tutorial',
    2010: 'Tutorial',
    2020: 'Tutorial',
  };

  return queueMap[queueId] || 'Unknown';
}
