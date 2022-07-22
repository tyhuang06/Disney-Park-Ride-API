import getShortestPath from '../helpers/getShortestPath.js';

const getVisitOrder = async (req, res) => {
	const rides = await getShortestPath(req.body.source);
	res.send(rides);
};

export default getVisitOrder;
