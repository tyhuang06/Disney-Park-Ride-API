import express from 'express';
import fetchQueue from '../controllers/queueController.js';

// all routes for now
// can break into separate routes later
const router = express.Router();

router.route('/').get((req, res) => {
	res.send('hello world');
});

router.route('/queue').get(fetchQueue);

export default router;
