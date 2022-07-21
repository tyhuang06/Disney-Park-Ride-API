import fetch from 'node-fetch';
import fetchQueue from '../helpers/fetchQueue.js';

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
		// cannot find "Games of Pixar Pier" with API
		// hard code coordinates
		if (ride.name === 'Games of Pixar Pier') {
			coordinates = [-117.92254744047085, 33.8048946];
		}

		coordinates = [0, 0];
		console.log(ride.name + ' not found');
	}

	return coordinates;
};

// function to fetch walking time from starting point to destination
// returns the walking time in minutes
const fetchWalkingTime = async (start, dest) => {
	const apiResponse = await fetch(
		'https://api.geoapify.com/v1/routing?waypoints=' +
			start.coordinates[1] +
			',' +
			start.coordinates[0] +
			'|' +
			dest.coordinates[1] +
			',' +
			dest.coordinates[0] +
			'&mode=walk' +
			'&apiKey=' +
			process.env.GEOAPIFY_API_KEY
	);
	const apiResponseJson = await apiResponse.json();

	// get walking time in minutes
	const walkingTime = apiResponseJson.features[0].properties.time / 60;

	return walkingTime;
};

const getAllRides = async () => {
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

	return ridesWithCo;
};

const getDistanceToAll = async (start, rides) => {
	// walking time = starting point to each ride
	const ridesWithWalkingTime = await Promise.all(
		rides.map(async (ride) => ({
			...ride,
			walkingTime: await fetchWalkingTime(start, ride),
		}))
	);

	return ridesWithWalkingTime;
};

export { getAllRides, getDistanceToAll };
