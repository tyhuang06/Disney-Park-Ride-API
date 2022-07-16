import fetchQueue from '../helpers/fetchQueue.js';
import fetchCoordinates from '../helpers/fetchMap.js';

// for demo purposes
const displayRides = async (req, res) => {
	// get all rides from external api
	const rides = await fetchQueue();

	// loop through rides and get coordinates
	// add coordinates property to rides
	const ridesWithCo = await Promise.all(
		rides.map(async (ride) => ({
			...ride,
			coordinates: await fetchCoordinates(ride),
		}))
	);

	res.send(ridesWithCo);
};

export default displayRides;
