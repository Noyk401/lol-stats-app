import { useState } from 'react';
import TeamDisplay from './TeamDisplay';
import './MatchDetails.css';

function MatchDetails({ match, puuid }) {
  const [selectedTeam, setSelectedTeam] = useState('all');

  const team1 = match.info.participants.filter((p) => p.teamId === 100);
  const team2 = match.info.participants.filter((p) => p.teamId === 200);

  const playerTeamId = match.info.participants.find((p) => p.puuid === puuid)?.teamId;

  return (
    <div className="match-details">
      <div className="team-tabs">
        <button
          className={`tab ${selectedTeam === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTeam('all')}
        >
          Both Teams
        </button>
        <button
          className={`tab ${selectedTeam === 'team1' ? 'active' : ''}`}
          onClick={() => setSelectedTeam('team1')}
        >
          Team 1
        </button>
        <button
          className={`tab ${selectedTeam === 'team2' ? 'active' : ''}`}
          onClick={() => setSelectedTeam('team2')}
        >
          Team 2
        </button>
      </div>

      <div className="team-containers">
        {(selectedTeam === 'all' || selectedTeam === 'team1') && (
          <TeamDisplay team={team1} teamColor="blue" />
        )}
        {(selectedTeam === 'all' || selectedTeam === 'team2') && (
          <TeamDisplay team={team2} teamColor="red" />
        )}
      </div>
    </div>
  );
}

export default MatchDetails;
