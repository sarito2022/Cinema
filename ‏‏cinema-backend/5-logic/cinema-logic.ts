import { CinemaModel } from '../4-models/CinemaModel';
import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { MovieModel } from '../4-models/MovieModel';

export async function getAllCinemas(): Promise<CinemaModel[]> {
    const query = "SELECT * FROM mydb.cinema";
    const [rows] = await execute<CinemaModel[]>(query);
    return rows;
}

export async function getAllMoviesByCinemaId(cinemaID:number): Promise<MovieModel[]> {
    const query = "SELECT * FROM mydb.movies WHERE cinemaID=?";
    const [rows] = await execute<MovieModel[]>(query, [cinemaID]);
    if (rows.length === 0) return null;
    return rows;
}

export async function createNewMovie(movieName:string,movieDateHour:Date, movieDuring:number, cinemaID:number) {
    const query = `INSERT INTO mydb.movies(movieName , movieDateHour, movieDuring, cinemaID) VALUES (?,?,?,?);`;
    const [result] = await execute<OkPacket>(query, [movieName,movieDateHour, movieDuring, cinemaID]);
    const movieID = result.insertId;
    
    return {
       movieID,
       movieName,
       movieDateHour,
       movieDuring,
       cinemaID       
    }
}

export async function deleteMovie(movieID:number){
    const query = "DELETE FROM mydb.movies WHERE movieID=?";
    await execute(query, [movieID]);
}










