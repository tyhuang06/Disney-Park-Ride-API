import fetch from 'node-fetch';

// function to fetch external queue time api
// returns an array of ride objects
const fetchQueue = async (req, res) => {
	// park 17 : Disney California Adventure
	const apiResponse = await fetch(
		'https://queue-times.com/parks/17/queue_times.json'
	);
	const apiResponseJson = await apiResponse.json();

	// parse out all rides and store in array
	const allRides = [];

	apiResponseJson.lands.forEach((land) => {
		land.rides.forEach((ride) => {
			allRides.push(ride);
		});
	});

	return allRides;
};

export default fetchQueue;
