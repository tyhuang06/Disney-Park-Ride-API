import fetchQueue from '../helpers/fetchQueue.js';
import { fetchCoordinates, fetchWalkingTime } from '../helpers/fetchMap.js';

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

	// get walking time from starting point to all destinations
	// demo starting point: first ride
	const start = ridesWithCo[0];

	// walking time = starting point to each ride
	const ridesWithWalkingTime = await Promise.all(
		ridesWithCo.map(async (ride) => ({
			...ride,
			walkingTime: await fetchWalkingTime(start, ride),
		}))
	);

	res.send(ridesWithWalkingTime);
};

export default displayRides;
