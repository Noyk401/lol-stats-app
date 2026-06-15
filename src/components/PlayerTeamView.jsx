import { getItemImageUrl, getChampionImageUrl } from '../utils/lolImages';
import './PlayerTeamView.css';

function PlayerTeamView({ player, onPlayerClick }) {
  const getItemIds = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const itemKey = `item${i}`;
      if (player[itemKey]) {
        items.push({ id: player[itemKey], slot: i });
      }
    }
    return items;
  };

  const items = getItemIds();
  const cs = player.totalMinionsKilled + player.neutralMinionsKilled;

  return (
    <div className="player-team-view">
      <div className="player-info">
        <img
          src={getChampionImageUrl(player.championName)}
          alt={player.championName}
          className="champion-icon"
          title={player.championName}
          onError={(e) => {
            console.error(`Failed to load champion icon for ${player.championName}: ${e.target.src}`);
            e.target.style.display = 'none';
          }}
        />
        <div className="player-details">
          <div
            className="player-name clickable"
            onClick={() => onPlayerClick && onPlayerClick(player.summonerName)}
            title="Click to view profile"
          >
            {player.summonerName}
          </div>
          <div className="champion-name">{player.championName}</div>
          <div className="player-kda">
            {player.kills}/{player.deaths}/{player.assists}
          </div>
          <div className="player-level">Lvl {player.champLevel}</div>
        </div>
      </div>

      <div className="player-items">
        {items.map((item) => {
          const itemUrl = getItemImageUrl(item.id);
          return (
            <div key={`${player.puuid}-item-${item.slot}`} className="item-slot" title={`Item ${item.id}`}>
              {item.id > 0 ? (
                itemUrl ? (
                  <img
                    src={itemUrl}
                    alt={`Item ${item.id}`}
                    className="item-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement?.querySelector('.item-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null
              ) : (
                <div className="empty-slot" />
              )}
              <div className="item-fallback" style={{ display: 'none' }}>
                {item.id}
              </div>
            </div>
          );
        })}
      </div>

      <div className="player-stats">
        <div className="stat-small">
          <span>CS:</span> {cs}
        </div>
        <div className="stat-small">
          <span>DMG:</span> {(player.totalDamageDealtToChampions / 1000).toFixed(1)}k
        </div>
      </div>
    </div>
  );
}

export default PlayerTeamView;
