import fetch from 'node-fetch';

// function to fetch coordinates by name
// only search within Disney California Adventure to increase performance
// returns the coordinates of the ride
const fetchCoordinates = async (ride) => {
	const apiResponse = await fetch(
		'https://api.geoapify.com/v1/geocode/search?text=' +
			ride.name +
			// only search the area within Disney California Adventure
			'&filter=rect:-117.92829371590346,33.803356078604324,-117.91529309315092,33.81798219246207' +
			'&apiKey=' +
			process.env.GEOAPIFY_API_KEY
	);

	const apiResponseJson = await apiResponse.json();

	// coordinates = [lng, lat]
	let coordinates = [];
	if (apiResponseJson.features.length > 0) {
		coordinates = apiResponseJson.features[0].geometry.coordinates;
	} else {
		coordinates = [0, 0];
		console.log(ride.name + ' not found');

		// cannot find "Games of Pixar Pier" with API
		// hard code coordinates
		if (ride.name === 'Games of Pixar Pier') {
			coordinates = [-117.92254744047085, 33.8048946];
		}
	}

	return coordinates;
};

export default fetchCoordinates;
