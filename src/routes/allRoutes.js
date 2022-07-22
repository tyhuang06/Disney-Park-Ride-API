import express from 'express';
import displayRides from '../controllers/demoController.js';
import getVisitOrder from '../controllers/visitOrderController.js';

// all routes for now
// can break into separate routes later
const router = express.Router();

router.route('/').get((req, res) => {
	res.send('hello world');
});

// GET /demo
router.route('/demo').get(displayRides);
router.route('/visitOrder').get(getVisitOrder);

export default router;
