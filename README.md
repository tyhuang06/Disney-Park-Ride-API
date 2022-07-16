## Instructions

1. Run `yarn install`
2. Start server by running `node server.js` or `yarn start` (with hot reload)

## API Docs

- `GET /`: temporary hello world
- `GET /demo`: This route is just for demo purpose. Currently the demo shows distance from "Guardians of the Galaxy – Mission: Breakout!" to all rides.

    Shows how to use the functions below:

    1. `fetchQueue()`: fetch external queue api, returns an array of ride objects with queue time.
    2. `fetchCoordinates(ride)`: fetch geocoding api, takes in an ride object and returns the coordinates.
    3. `fetchWalkingTime(start, dest)`: fetch routing api, takes in two rides start and destination. Returns the walking time from start to dest in minutes.