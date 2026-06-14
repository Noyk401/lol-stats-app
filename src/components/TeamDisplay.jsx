import PlayerTeamView from './PlayerTeamView';
import './TeamDisplay.css';

function TeamDisplay({ team, teamColor }) {
  const totalDamage = team.reduce((sum, p) => sum + p.totalDamageDealtToChampions, 0);

  return (
    <div className={`team-display team-${teamColor}`}>
      <h4>Team {teamColor === 'blue' ? '1' : '2'}</h4>
      <div className="team-stats-summary">
        <div className="stat">
          <span>Total Damage:</span>
          <strong>{(totalDamage / 1000).toFixed(1)}k</strong>
        </div>
      </div>

      <div className="team-players">
        {team.map((player) => (
          <PlayerTeamView key={player.puuid} player={player} />
        ))}
      </div>
    </div>
  );
}

export default TeamDisplay;
