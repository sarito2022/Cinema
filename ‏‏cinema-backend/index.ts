import express, { json } from 'express';
import { cinemaRouter } from './6-controllers/cinema-controller';
import cors from "cors";

const server = express();

server.use(json());
server.use(cors());

server.use('/api', cinemaRouter);

server.listen(3001, () => {
    console.log('Listening on port 3000...');
})

console.log("hiii");