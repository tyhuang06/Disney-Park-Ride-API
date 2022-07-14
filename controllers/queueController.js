import fetch from 'node-fetch';

// function to fetch external queue time api
const fetchQueue = async (req, res) => {
	const apiResponse = await fetch(
		'https://queue-times.com/parks/17/queue_times.json'
	);
	const apiResponseJson = await apiResponse.json();

	// store name, is_open, wait_time in db or array
	res.send(apiResponseJson);
};

export default fetchQueue;
