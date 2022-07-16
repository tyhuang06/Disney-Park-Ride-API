import fetchQueue from '../helpers/fetchQueue.js';

// for demo purposes
const displayRides = async (req, res) => {
	const rides = await fetchQueue();

	res.send(rides);
};

export default displayRides;
