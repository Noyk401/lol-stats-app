import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PlayerProfile from './components/PlayerProfile';
import MatchHistory from './components/MatchHistory';
import API_BASE_URL from './config';

function App() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (gameName, tagLine) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/player/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName, tagLine }),
      });

      if (!response.ok) {
        throw new Error('Player not found');
      }

      const data = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError(err.message);
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshRank = async () => {
    if (!playerData?.account?.puuid) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/player/${playerData.account.puuid}`);

      if (response.status === 429) {
        setError('Rate limit exceeded. Please wait before trying again.');
        return;
      }

      if (response.status === 403) {
        setError('Rank data not available. This endpoint requires a higher tier API key.');
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch rank');
      }

      const data = await response.json();
      setPlayerData(prev => ({
        ...prev,
        ranks: data.ranks,
        masteries: data.masteries,
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>League of Legends Stats</h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </header>

      {error && <div className="error">{error}</div>}

      {playerData && (
        <div className="api-notice">
          ℹ️ Free tier API has limitations: Rank, masteries, and match history may not be available. For full features, use a higher tier API key.
        </div>
      )}

      {playerData && (
        <main className="main">
          <PlayerProfile playerData={playerData} onRefresh={handleRefreshRank} loading={loading} />
          <MatchHistory puuid={playerData.account.puuid} onPlayerSearch={handleSearch} />
        </main>
      )}

      {!playerData && !error && (
        <div className="welcome">
          <p>Search for a player to get started</p>
        </div>
      )}
    </div>
  );
}

export default App;
