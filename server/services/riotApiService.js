import axios from 'axios';

const RIOT_BASE_URL = 'https://americas.api.riotgames.com';

const getApiKey = () => {
  const key = (process.env.RIOT_API_KEY || '').trim();
  if (!key) {
    throw new Error('RIOT_API_KEY is not set in environment variables');
  }
  return key;
};

export const getAccountByRiotId = async (gameName, tagLine) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const url = `${RIOT_BASE_URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    console.log(`[RiotAPI] GET ${url}`);
    console.log(`[RiotAPI] Using token: ${RIOT_API_KEY.substring(0, 10)}...${RIOT_API_KEY.substring(RIOT_API_KEY.length - 5)}`);

    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
    });
    console.log(`[RiotAPI] Success:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[RiotAPI] Full error response:`, error.response?.data);
    console.error(`[RiotAPI] Status:`, error.response?.status);
    const errorMsg = error.response?.data?.status?.message || error.message;
    const statusCode = error.response?.status;
    console.error(`[RiotAPI] Error (${statusCode}): ${errorMsg}`);
    throw new Error(`Failed to get account: ${errorMsg}`);
  }
};

export const getSummonerByPuuid = async (puuid) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting summoner:', error.response?.data || error.message);
    throw new Error(`Failed to get summoner: ${error.message}`);
  }
};

export const getRankByPuuid = async (puuid) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting rank:', error.response?.data || error.message);
    throw new Error(`Failed to get rank: ${error.message}`);
  }
};

export const getMatchIds = async (puuid, start = 0, count = 20) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
        params: {
          start,
          count,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting match IDs:', error.response?.data || error.message);
    throw new Error(`Failed to get match IDs: ${error.message}`);
  }
};

export const getMatchDetails = async (matchId) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting match details:', error.response?.data || error.message);
    throw new Error(`Failed to get match details: ${error.message}`);
  }
};

export const getChampionMasteries = async (puuid) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting champion masteries:', error.response?.data || error.message);
    throw new Error(`Failed to get champion masteries: ${error.message}`);
  }
};

export const getTopChampionMasteries = async (puuid, count = 10) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
        params: {
          count,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting top champion masteries:', error.response?.data || error.message);
    throw new Error(`Failed to get top champion masteries: ${error.message}`);
  }
};

export const getChampionMasteryScores = async (puuid) => {
  try {
    const RIOT_API_KEY = getApiKey();
    const response = await axios.get(
      `${RIOT_BASE_URL}/lol/champion-mastery/v4/scores/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting champion mastery scores:', error.response?.data || error.message);
    throw new Error(`Failed to get champion mastery scores: ${error.message}`);
  }
};
