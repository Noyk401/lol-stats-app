const DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn';

// Get version from match data, default to a working version
let gameVersion = '15.1.1';

export function setGameVersion(version) {
  // Use a stable working version instead of game version
  // Data Dragon has limited version availability
  gameVersion = '15.1.1';
}

// Normalize champion names for Data Dragon
function normalizeChampionName(name) {
  if (!name) return 'Garen';

  // First, try case-insensitive exact match with common alternate names
  const lowerName = name.toLowerCase().trim();

  // Comprehensive champion name mappings for alternate/old names
  const nameMap = {
    'monkey king': 'Wukong',
    'nunu & willump': 'Nunu',
    'nunu and willump': 'Nunu',
    'nunuandwillump': 'Nunu',
    'nunu': 'Nunu',
    'dr mundo': 'DrMundo',
    'doctor mundo': 'DrMundo',
    'drmundo': 'DrMundo',
    'mundo': 'DrMundo',
    'tahm kench': 'TahmKench',
    'tahmkench': 'TahmKench',
    'tahm': 'TahmKench',
    'twisted fate': 'TwistedFate',
    'twistedfate': 'TwistedFate',
    'rek\'sai': 'RekSai',
    'reksai': 'RekSai',
    'kha\'zix': 'KhaZix',
    'khazix': 'KhaZix',
    'le blanc': 'LeBlanc',
    'leblanc': 'LeBlanc',
    'xin zhao': 'XinZhao',
    'xinzhao': 'XinZhao',
    'jarvan iv': 'JarvanIV',
    'jarvaniv': 'JarvanIV',
    'miss fortune': 'MissFortune',
    'missfortune': 'MissFortune',
    'master yi': 'MasterYi',
    'masteryi': 'MasterYi',
    'cho\'gath': 'Chogath',
    'chogath': 'Chogath',
    'cho': 'Chogath',
    'lee sin': 'LeeSin',
    'leesin': 'LeeSin',
    'vel\'koz': 'Velkoz',
    'velkoz': 'Velkoz',
    'kai\'sa': 'Kaisa',
    'kaisa': 'Kaisa',
    'rek sai': 'RekSai',
  };

  // Check if we have a mapping for this name
  if (nameMap[lowerName]) {
    return nameMap[lowerName];
  }

  // Remove spaces and special characters for fallback
  let normalized = name.replace(/\s+/g, '').replace(/[&']/g, '');

  // If not in map, return with first letter capitalized
  const result = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  console.log(`Champion name mapping: "${name}" -> "${result}"`);
  return result;
}

export function getChampionImageUrl(championName) {
  if (!championName || championName === 'Unknown') {
    return `${DATA_DRAGON_URL}/${gameVersion}/img/champion/Garen.png`;
  }

  const normalized = normalizeChampionName(championName);
  const url = `${DATA_DRAGON_URL}/${gameVersion}/img/champion/${normalized}.png`;
  console.log(`Champion ${championName} -> normalized: ${normalized} -> URL: ${url}`);
  return url;
}

export function getItemImageUrl(itemId) {
  if (!itemId || itemId === 0) {
    return null;
  }
  return `${DATA_DRAGON_URL}/${gameVersion}/img/item/${itemId}.png`;
}

export function getSummonerSpellImageUrl(spellName) {
  if (!spellName) {
    return null;
  }
  return `${DATA_DRAGON_URL}/${gameVersion}/img/spell/${spellName}.png`;
}
