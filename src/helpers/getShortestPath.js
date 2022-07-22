import { getAllRides, getDistanceToAll } from './fetchMap.js';
import { BellmanFord } from './bellmanFord.js';

const getShortestPath = async (source) => {
	// get all rides and exclude not opened ones
	let rides = await getAllRides();
	rides = rides.filter((ride) => ride.is_open);

	// generate graph
	// default source to first ride
	if (!source) {
		source = rides[0];
	}
	const sourceIdx = rides.findIndex((ride) => ride.id === source.id);

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

	// find shortest path using Bellman-Ford
	const bf = new BellmanFord(sourceIdx, rides, edges);
	const shortestWeight = bf.run();

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
