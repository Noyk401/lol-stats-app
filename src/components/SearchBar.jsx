import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [username, setUsername] = useState('');
  const [tagline, setTagline] = useState('');
  const [region, setRegion] = useState('NA1');

  const regions = ['NA1', 'EUW1', 'KR', 'BR1', 'LA1', 'LA2', 'OC1', 'RU', 'TR1', 'JP1'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !tagline.trim()) {
      alert('Please enter both username and tagline');
      return;
    }

    onSearch(username.trim(), tagline.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <select
        className="region-select"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        disabled={loading}
      >
        {regions.map((reg) => (
          <option key={reg} value={reg}>{reg}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />

      <input
        type="text"
        placeholder="Tagline (e.g., NA1)"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;
