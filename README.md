# League of Legends Stats Website

A full-stack web application for searching League of Legends player stats, match history, and detailed match information.

## Features

- **Player Search**: Search for any League of Legends player by their game name and tag line
- **Player Profile**: View rank, LP, and top 5 champion masteries
- **Match History**: Browse recent matches with key stats (K/D, damage, CS, control wards, duration)
- **Match Details**: Click to expand a match and see full team composition, items, damage, and CS
- **Color-coded Results**: Win/loss games highlighted in green/red for easy identification

## Tech Stack

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Node.js, Express
- **API**: Riot Games API

## Setup Instructions

### 1. Get Riot API Key

1. Go to https://developer.riotgames.com/
2. Sign in or create an account
3. Create a new project
4. Generate an API key
5. Copy the API key for the next step

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```
RIOT_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lol-stats
JWT_SECRET=your_jwt_secret_here
```

Replace `your_api_key_here` with your actual Riot API key from step 1.

### 4. Run the Application

Start both frontend and backend:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### 5. How to Use

1. Open your browser and navigate to http://localhost:3000
2. In the search bar, enter a player's name and tag (format: `GameName#TagLine`)
   - Example: `Faker#NA1` or `Doublelift#NA1`
3. View their profile, rank, and match history
4. Click on any match to expand and see full team details
5. Click on the team tabs to view specific team information

## API Endpoints

### Player Routes
- `POST /api/player/search` - Search for a player by game name and tag line
- `GET /api/player/:puuid` - Get player profile and rank information

### Match Routes
- `GET /api/match/:puuid/history` - Get match history for a player
- `GET /api/match/:matchId` - Get detailed match information

## Project Structure

```
lol-stats-app/
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── playerRoutes.js
│   │   ├── matchRoutes.js
│   │   └── authRoutes.js
│   └── services/
│       └── riotApiService.js
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── PlayerProfile.jsx
│   │   ├── MatchHistory.jsx
│   │   ├── MatchCard.jsx
│   │   ├── MatchDetails.jsx
│   │   ├── TeamDisplay.jsx
│   │   └── PlayerTeamView.jsx
│   ├── utils/
│   │   └── matchUtils.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Notes

- The API key must be kept secret and should never be committed to version control
- Free tier Riot API keys have rate limits; consider implementing caching for production
- For production deployment, set `NODE_ENV=production`

## Future Enhancements

- User authentication and favorites system
- Champion win rates and statistics
- Detailed champion build recommendations
- Real-time match tracking
- Player ranking leaderboards
