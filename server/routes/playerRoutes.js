import express from 'express';
import {
  getAccountByRiotId,
  getSummonerByPuuid,
  getRankByPuuid,
  getChampionMasteries,
  getTopChampionMasteries,
  getChampionMasteryScores,
} from '../services/riotApiService.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    console.log(`Searching for player: ${gameName}#${tagLine}`);

    if (!gameName || !tagLine) {
      return res.status(400).json({ error: 'gameName and tagLine required' });
    }

    const account = await getAccountByRiotId(gameName, tagLine);
    console.log('Account found:', account);

    let summoner = { name: gameName };
    try {
      summoner = await getSummonerByPuuid(account.puuid);
      console.log('Summoner found:', summoner);
    } catch (error) {
      console.warn('Summoner endpoint not available, using account data instead');
    }

    let rankEntries = [];
    try {
      rankEntries = await getRankByPuuid(account.puuid);
      console.log('Rank entries:', rankEntries);
    } catch (error) {
      console.warn('Rank endpoint error:', error.message);
    }

    let masteries = [];
    let masteryScore = 0;
    try {
      masteries = await getTopChampionMasteries(account.puuid, 5);
      masteryScore = await getChampionMasteryScores(account.puuid);
    } catch (error) {
      console.warn('Mastery endpoint error:', error.message);
    }

    res.json({
      account,
      summoner,
      ranks: rankEntries,
      topMasteries: masteries,
      masteryScore,
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:puuid', async (req, res) => {
  try {
    const { puuid } = req.params;

    const summoner = await getSummonerByPuuid(puuid);
    const rankEntries = await getRankByPuuid(puuid);
    const masteries = await getChampionMasteries(puuid);

    res.json({
      summoner,
      ranks: rankEntries,
      masteries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
