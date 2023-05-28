import { Router } from "express";
import {  getAllCinemas, createNewMovie, deleteMovie, getAllMoviesByCinemaId } from "../5-logic/cinema-logic";


export const cinemaRouter = Router();

cinemaRouter.get('/theaters', async (req, res, next) => {
    try{
        const cinemas = await getAllCinemas();
        console.log(cinemas)
        res.json(cinemas);
    }catch(e){
        next(e);
    }
})

cinemaRouter.get('/theaters/:cinemaID([0-9]+)', async (req, res, next) => {
    let cinemaID=req.params.cinemaID as any;
    const movies = await getAllMoviesByCinemaId(cinemaID);
        if (!cinemaID) {
            res.sendStatus(404);
            return;
        }
        res.json(movies);
})

cinemaRouter.post('/movies', async (req, res, next) => {
    try{
        let movieName=req.body.movieName as any;
        let movieDateHour=req.body.movieDateHour as any;
        let movieDuring=req.body.movieDuring as any;
        let cinemaID=req.body.cinemaID as any;
       
        const movie = await createNewMovie(movieName, movieDateHour, movieDuring, cinemaID);
        res.json(movie);
    }catch(e){
        next(e);
    }
})

cinemaRouter.delete('/movies/:movieID([0-9]+)', async (req, res, next) => {
    try{
        await deleteMovie(+req.params.movieID);
        res.sendStatus(204);
    }catch(e){
        next(e);
    }
})


















function getOneCinemaByID(cinemaID: any) {
    throw new Error("Function not implemented.");
}
//עובד, תקין
// cinemaRouter.put('/products/:ProductID([0-9]+)', async (req, res, next) => {
//     try{
//         let ProductName=req.body.ProductName as any;
//         let UnitPrice=req.body.UnitPrice as any;
//         let UnitsInStock=req.body.UnitsInStock as any;
//         let ProductID =req.params.ProductID as any;
//         //let ProductID=req.query.userId as any;

//         const product = await updateProduct(ProductName, UnitPrice, UnitsInStock, +ProductID);
//         res.json(product);
//     }catch(e){
//         next(e);
//     }
// })

