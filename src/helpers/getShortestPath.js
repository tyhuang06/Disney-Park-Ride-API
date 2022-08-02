import { getAllRides, getDistanceToAll } from './fetchMap.js';
import { BellmanFord } from './bellmanFord.js';

const getShortestPath = async (sourceId, algo) => {
	// get all rides and exclude not opened ones
	let rides = await getAllRides();
	rides = rides.filter((ride) => ride.is_open);

	// generate graph
	// default source to first ride
	if (!sourceId) {
		sourceId = rides[0].id;
	}

	const source = rides.find((ride) => ride.id === sourceId);
	const sourceIdx = rides.findIndex((ride) => ride.id === sourceId);

	rides = await getDistanceToAll(source, rides);

	// create edges
	const edges = [];

	rides.forEach((ride, i) => {
		edges.push({
			source: sourceIdx,
			target: i,
			weight: ride.walkingTime + ride.wait_time,
		});
	});

	let shortestWeight = [];

	if (algo === 'bellman-ford') {
		// find shortest path using Bellman-Ford
		const bf = new BellmanFord(sourceIdx, rides, edges);
		shortestWeight = bf.run();
	}

	// add first ride's wait time
	shortestWeight[sourceIdx] += source.wait_time;

	// attach shortest weight to each ride
	rides.forEach((ride, i) => {
		ride.shortestWeight = shortestWeight[i];
	});

	// sort rides by shortest weight
	rides.sort((a, b) => a.shortestWeight - b.shortestWeight);

	return rides;
};

export default getShortestPath;
