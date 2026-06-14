import express from 'express';

const router = express.Router();

// Placeholder for auth routes
// When implementing, add:
// - POST /register - create new user account
// - POST /login - authenticate user
// - POST /logout - logout user
// - GET /profile - get current user profile
// - POST /favorites - save favorite player searches
// - GET /favorites - retrieve saved favorites

router.get('/health', (req, res) => {
  res.json({ status: 'Auth service ready' });
});

export default router;
