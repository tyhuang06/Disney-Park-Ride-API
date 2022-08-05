import express from 'express';
import http from 'http';
import 'dotenv/config';
import allRoutes from './routes/allRoutes.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(express.json()); // to accept json data
app.use(bodyParser.urlencoded({ extended: true })); // to accept form data

// routing
app.use('/', allRoutes);

server.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
