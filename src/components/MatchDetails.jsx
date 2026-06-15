import { useState } from 'react';
import TeamDisplay from './TeamDisplay';
import './MatchDetails.css';
import API_BASE_URL from '../config';

function MatchDetails({ match, puuid, onPlayerSearch }) {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchingPlayer, setSearchingPlayer] = useState(null);

  const team1 = match.info.participants.filter((p) => p.teamId === 100);
  const team2 = match.info.participants.filter((p) => p.teamId === 200);

  const playerTeamId = match.info.participants.find((p) => p.puuid === puuid)?.teamId;

  const handlePlayerClick = async (summonerName) => {
    setSearchingPlayer(summonerName);
  };

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
          <TeamDisplay team={team1} teamColor="blue" onPlayerClick={handlePlayerClick} />
        )}
        {(selectedTeam === 'all' || selectedTeam === 'team2') && (
          <TeamDisplay team={team2} teamColor="red" onPlayerClick={handlePlayerClick} />
        )}
      </div>

      {searchingPlayer && (
        <PlayerSearchModal
          summonerName={searchingPlayer}
          onClose={() => setSearchingPlayer(null)}
          onSearch={onPlayerSearch}
        />
      )}
    </div>
  );
}

function PlayerSearchModal({ summonerName, onClose, onSearch }) {
  const [tagLine, setTagLine] = useState('');

  const handleSearch = () => {
    if (tagLine.trim()) {
      onSearch(summonerName, tagLine);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Search for {summonerName}</h3>
        <p>Enter their tagline (the # part of their name)</p>
        <input
          type="text"
          placeholder="e.g., NA1, 210, etc."
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={handleSearch} disabled={!tagLine.trim()}>
            Search
          </button>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;
