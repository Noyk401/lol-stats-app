import './PlayerProfile.css';

function PlayerProfile({ playerData, onRefresh, loading }) {
  const { account, summoner, ranks, topMasteries, masteryScore } = playerData;

  const getRankDisplay = () => {
    if (!ranks || ranks.length === 0) {
      return <div className="rank-info">Unranked</div>;
    }

    const soloRank = ranks.find((r) => r.queueType === 'RANKED_SOLO_5x5');
    if (!soloRank) return <div className="rank-info">Unranked</div>;

    return (
      <div className="rank-info">
        <div className="rank-tier">{soloRank.tier} {soloRank.rank}</div>
        <div className="rank-lp">{soloRank.leaguePoints} LP</div>
        <div className="rank-wr">
          {soloRank.wins}W {soloRank.losses}L
        </div>
      </div>
    );
  };

  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{account.gameName}#{account.tagLine}</h2>
          <p className="summoner-name">{summoner.name}</p>
        </div>
        {getRankDisplay()}
        {onRefresh && (
          <button className="refresh-btn" onClick={onRefresh} disabled={loading}>
            {loading ? 'Updating...' : '🔄 Update'}
          </button>
        )}
      </div>

      <div className="masteries">
        <h3>Top Champions</h3>
        <div className="mastery-list">
          {topMasteries && topMasteries.length > 0 ? (
            topMasteries.map((mastery) => (
              <div key={mastery.championId} className="mastery-item">
                <div className="champion-name">{mastery.championLevel}</div>
                <div className="mastery-points">{mastery.championPoints.toLocaleString()}</div>
              </div>
            ))
          ) : (
            <p>No champion mastery data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;
