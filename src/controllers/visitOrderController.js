import getShortestPath from '../helpers/getShortestPath.js';

const getVisitOrder = async (req, res) => {
	const sourceId = req.body.sourceId;
	const algo = req.body.algo || 'bellman-ford';

	const rides = await getShortestPath(sourceId, algo);

	res.send(rides);
};

export default getVisitOrder;
