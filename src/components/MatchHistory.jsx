import { useState, useEffect, useRef } from 'react';
import MatchCard from './MatchCard';
import MatchDetails from './MatchDetails';
import './MatchHistory.css';

function MatchHistory({ puuid }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [expandedMatchId, setExpandedMatchId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const matchesEndRef = useRef(null);

  const TFT_QUEUE_IDS = [1090, 1110, 1706, 1710, 1730, 1750, 1900];

  const gameTypeFilters = [
    { id: 'all', label: 'All' },
    { id: 'RANKED', label: 'Ranked' },
    { id: 'ARAM', label: 'ARAM' },
    { id: 'DRAFT', label: 'Draft Pick' },
    { id: 'NORMAL', label: 'Normal' },
  ];

  useEffect(() => {
    fetchMatches(0, true);
  }, [puuid]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore && matches.length > 0) {
          loadMoreMatches();
        }
      },
      { threshold: 0.1 }
    );

    if (matchesEndRef.current) {
      observer.observe(matchesEndRef.current);
    }

    return () => observer.disconnect();
  }, [matches, hasMore, loading, loadingMore]);

  const fetchMatches = async (start = 0, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      setError(null);
      const response = await fetch(
        `/api/match/${puuid}/history?start=${start}&count=10`
      );

      if (response.status === 429) {
        setError('Rate limit exceeded. Please wait before loading more.');
        setHasMore(false);
        return;
      }

      if (response.status === 403) {
        setError('Match history not available. This endpoint requires a higher tier API key.');
        setHasMore(false);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch matches');
      }

      const data = await response.json();
      const newMatches = data.matches || [];

      if (isInitial) {
        setMatches(newMatches);
        setStartIndex(10);
        setHasMore(newMatches.length >= 10);
      } else {
        // Deduplicate matches by matchId
        setMatches((prev) => {
          const existingIds = new Set(prev.map((m) => m.metadata.matchId));
          const filtered = newMatches.filter((m) => !existingIds.has(m.metadata.matchId));
          return [...prev, ...filtered];
        });
        setStartIndex((prev) => prev + 10);
        setHasMore(newMatches.length >= 10);
      }
    } catch (err) {
      setError(err.message);
      setHasMore(false);
    } finally {
      if (isInitial) setLoading(false);
      else setLoadingMore(false);
    }
  };

  const loadMoreMatches = async () => {
    await fetchMatches(startIndex, false);
  };

  const handleRefresh = () => {
    setMatches([]);
    setStartIndex(0);
    setHasMore(true);
    setSelectedFilter('all');
    fetchMatches(0, true);
  };

  const getFilteredMatches = () => {
    const nonTftMatches = matches.filter((match) => !TFT_QUEUE_IDS.includes(match.info.queueId));

    if (selectedFilter === 'all') return nonTftMatches;

    return nonTftMatches.filter((match) => {
      const queueId = match.info.queueId;
      switch (selectedFilter) {
        case 'RANKED':
          return [4, 5, 6, 7, 1400, 410, 420, 440].includes(queueId);
        case 'ARAM':
          return [33, 65, 1100].includes(queueId);
        case 'DRAFT':
          return [2, 14, 400].includes(queueId);
        case 'NORMAL':
          return [1, 430, 1300].includes(queueId);
        default:
          return true;
      }
    });
  };

  const filteredMatches = getFilteredMatches();

  if (loading) return <div className="match-history"><div className="loading">Loading match history...</div></div>;
  if (error) return (
    <div className="match-history">
      <div className="match-history-header">
        <h3>Recent Matches</h3>
        <button
          className="refresh-matches-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? 'Loading...' : '🔄 Retry'}
        </button>
      </div>
      <div className="error-message">{error}</div>
    </div>
  );

  return (
    <div className="match-history">
      <div className="match-history-header">
        <h3>Recent Matches</h3>
        <button
          className="refresh-matches-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      <div className="match-filters">
        {gameTypeFilters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="matches-list">
        {filteredMatches.length === 0 ? (
          <div className="no-matches">No matches found with selected filter</div>
        ) : (
          filteredMatches.map((match) => (
          <div key={match.metadata.matchId}>
            <MatchCard
              match={match}
              puuid={puuid}
              isExpanded={expandedMatchId === match.metadata.matchId}
              onToggle={() =>
                setExpandedMatchId(
                  expandedMatchId === match.metadata.matchId
                    ? null
                    : match.metadata.matchId
                )
              }
            />
            {expandedMatchId === match.metadata.matchId && (
              <MatchDetails match={match} puuid={puuid} />
            )}
          </div>
        ))
        )}
        <div ref={matchesEndRef} className="matches-end">
          {loadingMore && <div className="loading-more">Loading more matches...</div>}
          {!hasMore && matches.length > 0 && <div className="no-more">No more matches to load</div>}
        </div>
      </div>
    </div>
  );
}

export default MatchHistory;
