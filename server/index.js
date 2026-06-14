import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

if (!process.env.RIOT_API_KEY) {
  console.error('ERROR: RIOT_API_KEY is not set in .env file');
  process.exit(1);
}

console.log('✓ RIOT_API_KEY loaded successfully');

import express from 'express';
import cors from 'cors';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/player', playerRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
