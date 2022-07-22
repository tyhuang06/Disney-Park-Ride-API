export class BellmanFord {
	constructor(source, vertices, edges) {
		this.source = source;
		this.vertices = vertices;
		this.edges = edges;

		// fill distance array with infinity, dist to self is 0
		this.dist = Array(vertices.length).fill(Infinity);
		this.dist[source] = 0;
	}

	// Bellman-Ford algorithm
	run() {
		// loop through vertices
		for (let i = 0; i < this.vertices.length - 1; i++) {
			// loop through edges
			for (let j = 0; j < this.edges.length; j++) {
				// get edge
				const edge = this.edges[j];

				// update target distance if necessary
				if (
					this.dist[edge.source] + edge.weight <
					this.dist[edge.target]
				) {
					this.dist[edge.target] =
						this.dist[edge.source] + edge.weight;
				}
			}
		}

		return this.dist;
	}
}
