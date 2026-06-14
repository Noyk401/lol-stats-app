# Setup Guide - League of Legends Stats Website

## API Credentials Required

### Riot API Key

**What you need:**
- **RIOT_API_KEY** - Your personal Riot API key for accessing League of Legends data

**How to get it:**
1. Visit https://developer.riotgames.com/
2. Create a Riot Developer account (or sign in if you have one)
3. Go to the "Projects" section
4. Create a new project or use an existing one
5. Generate an API key in your project
6. Copy the full API key

**Important Notes:**
- Free tier keys have rate limits (~100 requests per 2 minutes)
- Keys expire after a certain period and must be regenerated
- Keep your API key SECRET - never commit it to version control
- The `.env` file is already in `.gitignore` to prevent accidental commits

## Step-by-Step Installation

### Step 1: Install Node.js
- Download from https://nodejs.org/ (LTS version recommended)
- Verify installation: `node --version` and `npm --version`

### Step 2: Copy Project Files
The entire project is ready in: `C:\Users\User\Desktop\lol-stats-app\`

### Step 3: Install Dependencies
```bash
cd C:\Users\User\Desktop\lol-stats-app
npm install
```

### Step 4: Configure Environment Variables
1. Create a new file named `.env` in the project root
2. Add the following content:

```
RIOT_API_KEY=your_actual_api_key_here
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lol-stats
JWT_SECRET=your_jwt_secret_here_make_it_random
```

Replace `your_actual_api_key_here` with your Riot API key from Step 1

### Step 5: Run the Application
```bash
npm run dev
```

This will start:
- **Backend Server**: http://localhost:5000
- **Frontend App**: http://localhost:3000

### Step 6: Open in Browser
Navigate to http://localhost:3000

## Testing the App

### Test Search
1. Enter a player name in the format: `GameName#TagLine`
2. Examples that should work (if they exist):
   - `Faker#NA1`
   - `Doublelift#NA1`
   - `Bjergsen#NA1`

### Features to Test
- ✓ Player search returns profile info
- ✓ Rank and LP display correctly
- ✓ Match history loads
- ✓ Click a match to expand it
- ✓ See team composition with items
- ✓ Win/loss highlighted in green/red

## File Structure Explanation

### Backend
- **server/index.js** - Express server setup
- **server/routes/** - API endpoint handlers
- **server/services/riotApiService.js** - All Riot API calls

### Frontend
- **src/App.jsx** - Main application component
- **src/components/** - React components for UI
- **src/utils/matchUtils.js** - Data formatting utilities
- **vite.config.js** - Vite build configuration

## Common Issues & Solutions

### "API Key Invalid"
- Make sure you copied the full API key correctly
- Check that it's in the `.env` file with no extra spaces
- Restart the server after updating `.env`

### "CORS Error"
- Make sure the backend is running on port 5000
- The vite.config.js should proxy requests to the backend

### "Player Not Found"
- Verify the player name and tag line are correct
- Tag line should be region code (NA1, EUW1, KR, etc.)

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

## Deployment Notes

For production deployment:
1. Build frontend: `npm run build`
2. Set `NODE_ENV=production` in `.env`
3. Deploy backend server separately
4. Configure production database if needed
5. Use environment-specific API keys

## Rate Limiting

Riot API free tier: ~100 requests per 2 minutes
- Implement caching for frequently searched players
- Add request debouncing on frontend
- Show "Loading..." states to manage user expectations

## Next Steps

1. Test basic functionality with a few player searches
2. Implement user authentication (authRoutes.js has placeholders)
3. Add database for storing favorites/history
4. Implement caching layer
5. Add advanced stats (champion win rates, build recommendations)
