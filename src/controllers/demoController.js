import { getAllRides, getDistanceToAll } from '../helpers/fetchMap.js';

// for demo purposes
const displayRides = async (req, res) => {
	// get all rides from external api
	const rides = await getAllRides();

	// get walking time from starting point to all destinations
	// demo starting point: first ride
	const firstToAll = await getDistanceToAll(rides[0], rides);

	res.send(firstToAll);
};

export default displayRides;
