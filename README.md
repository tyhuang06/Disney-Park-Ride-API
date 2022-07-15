## Instructions

1. Run `yarn install`
2. Start server by running `node server.js` or `yarn start` (with hot reload)

## API Docs

- `GET /`: temporary hello world
- `GET /queue`: (Jamie working on it) fetch queue time data from external api, this route is just for demo purpose. fetch queue works as a helper function we can call when we want to get the current wait time, it will return an array of ride objects. The array shown on this demo route is the array the helper function will return.