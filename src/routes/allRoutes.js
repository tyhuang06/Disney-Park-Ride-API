import express from 'express';
import displayQueue from '../controllers/queueController.js';

// all routes for now
// can break into separate routes later
const router = express.Router();

router.route('/').get((req, res) => {
	res.send('hello world');
});

// GET /queue
router.route('/queue').get(displayQueue);

export default router;
