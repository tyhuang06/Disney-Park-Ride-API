import fetchQueue from '../helpers/fetchQueue.js';

// for demo purposes
const displayQueue = async (req, res) => {
	const rides = await fetchQueue();

	res.send(rides);
};

export default displayQueue;
