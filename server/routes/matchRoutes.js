import express from 'express';
import { getMatchIds, getMatchDetails } from '../services/riotApiService.js';

const router = express.Router();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Queue IDs for TFT (Teamfight Tactics)
const TFT_QUEUE_IDS = [1090, 1100, 1110, 1130, 1160, 1170, 1180, 1190, 1200, 1300, 1600, 1700, 1710, 1720, 1730, 1750, 1800];

// In-memory cache for match details (simple cache, resets on server restart)
const matchCache = new Map();

router.get('/:puuid/history', async (req, res) => {
  try {
    const { puuid } = req.params;
    const start = parseInt(req.query.start) || 0;
    const count = Math.min(parseInt(req.query.count) || 10, 10); // Cap at 10 to avoid rate limits

    console.log(`Fetching match history: start=${start}, count=${count}`);

    // Get match IDs with a larger buffer to account for TFT games we'll skip
    const matchIds = await getMatchIds(puuid, start, count * 3);

    // Fetch matches with optimized parallel requests (2-3 at a time)
    const matches = [];
    let i = 0;
    const maxConcurrent = 2;

    while (i < matchIds.length && matches.length < count) {
      const batch = [];

      // Create batch of concurrent requests
      for (let j = 0; j < maxConcurrent && i < matchIds.length; j++) {
        const matchId = matchIds[i++];

        // Check cache first
        if (matchCache.has(matchId)) {
          const cachedMatch = matchCache.get(matchId);
          if (!TFT_QUEUE_IDS.includes(cachedMatch.info.queueId)) {
            matches.push(cachedMatch);
            if (matches.length >= count) break;
          }
          continue;
        }

        // Add promise to batch
        batch.push(
          getMatchDetails(matchId)
            .then((match) => {
              // Cache the match
              matchCache.set(matchId, match);

              // Skip TFT matches
              if (!TFT_QUEUE_IDS.includes(match.info.queueId)) {
                matches.push(match);
              }
            })
            .catch((error) => {
              console.warn(`Failed to get match ${matchId}:`, error.message);
            })
        );
      }

      // Wait for batch to complete
      if (batch.length > 0) {
        await Promise.all(batch);
        await delay(100); // Small delay between batches
      }

      // Stop if we have enough matches
      if (matches.length >= count) break;
    }

    // Log queue ID distribution for debugging
    const queueDistribution = {};
    matches.forEach((match) => {
      const queueId = match.info.queueId;
      queueDistribution[queueId] = (queueDistribution[queueId] || 0) + 1;
    });
    console.log('Queue ID distribution:', queueDistribution);

    // Sort by game end time (newest first)
    matches.sort((a, b) => b.info.gameEndTimestamp - a.info.gameEndTimestamp);

    res.json({
      matches: matches.slice(0, count),
      cacheSize: matchCache.size,
    });
  } catch (error) {
    console.error('Match history error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await getMatchDetails(matchId);
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
