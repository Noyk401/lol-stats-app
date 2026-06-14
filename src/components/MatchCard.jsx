import { formatTime, getPlayerStats, formatGameDate, getGameType } from '../utils/matchUtils';
import { getChampionImageUrl, setGameVersion } from '../utils/lolImages';
import './MatchCard.css';

function MatchCard({ match, puuid, isExpanded, onToggle }) {
  // Set game version from match data
  if (match.info.gameVersion) {
    const version = match.info.gameVersion.split('.').slice(0, 2).join('.');
    setGameVersion(version);
  }

  const playerStats = getPlayerStats(match, puuid);
  const won = playerStats.win;

  const gameDuration = match.info.gameDuration;
  const formattedTime = formatTime(gameDuration);

  // Handle timestamp - it might be in seconds or milliseconds
  let timestamp = match.info.gameEndTimestamp;
  if (timestamp < 10000000000) {
    // Likely in seconds, convert to milliseconds
    timestamp = timestamp * 1000;
  }
  const gameDate = formatGameDate(timestamp);
  const gameType = getGameType(match.info.queueId);
  console.log(`Queue ID: ${match.info.queueId}, Game Type: ${gameType}`);


  const isRankedGame = () => {
    const rankedQueueIds = [4, 5, 6, 1400, 410, 420, 440];
    return rankedQueueIds.includes(match.info.queueId);
  };

  const getLPDisplay = () => {
    if (!isRankedGame()) {
      return 'N/A';
    }

    if (playerStats.lpGained !== undefined && playerStats.lpGained !== null) {
      return playerStats.lpGained > 0 ? `+${playerStats.lpGained}` : playerStats.lpGained;
    }

    return 'N/A';
  };

  return (
    <div
      className={`match-card ${won ? 'win' : 'loss'}`}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className="match-result">{won ? 'WIN' : 'LOSS'}</div>

      <div className="champion-info">
        <img
          src={getChampionImageUrl(playerStats.championName)}
          alt={playerStats.championName}
          className="champion-image"
          onError={(e) => {
            console.error(`Failed to load champion image: ${e.target.src}`);
            e.target.style.display = 'none';
          }}
        />
        <div className="info-text">
          <div className="champion-name">{playerStats.championName}</div>
          <div className="game-type">{gameType}</div>
          <div className="game-date">{gameDate}</div>
        </div>
      </div>

      <div className="match-stats">
        <div className="stat-item">
          <span className="label">K/D</span>
          <span className="value">
            {playerStats.kills}/{playerStats.deaths}
          </span>
        </div>

        <div className="stat-item">
          <span className="label">Damage</span>
          <span className="value">{(playerStats.totalDamage / 1000).toFixed(1)}k</span>
        </div>

        <div className="stat-item">
          <span className="label">CS</span>
          <span className="value">{playerStats.cs}</span>
        </div>

        <div className="stat-item">
          <span className="label">Control Wards</span>
          <span className="value">{playerStats.controlWards}</span>
        </div>

        <div className="stat-item">
          <span className="label">Duration</span>
          <span className="value">{formattedTime}</span>
        </div>

        <div className="stat-item">
          <span className="label">LP</span>
          <span className="value">{getLPDisplay()}</span>
        </div>
      </div>

      <div className="expand-indicator">{isExpanded ? '▼' : '▶'}</div>
    </div>
  );
}

export default MatchCard;
