'use strict';


/*

.env file contents

PORT=4000
APIKEY=66f77f8f5e3b02d07744446e6e932d4a


*/





//basic (require express and turn it into a variable to use in my code)
const express = require("express");

//read data from json file
const myData = require("./Movie Data/data.json");


//this to read .env file
//you can do it like this which is easier or do the commented lines
//require("dotenv");

//first assign
const dotenv = require("dotenv");
//then start(configure) the dotenv
dotenv.config();

//or use this?
//require("dotenv").config();

//this should be the first step after installing axios
//get axios so we can send http request to an API
const axios = require("axios");


//initializing server!
const app = express();



//variables that live in my .env file
const APIKEY = process.env.APIKEY;

const PORT = process.env.PORT;

// All my end points note: not found end point always should be in the end.

//handle the trending
app.get('/trending', trendingHandler);

//this handles favorite (task requirement)
app.get('/favorite', favoriteHandler);

app.get("/searchMovies", searchMoviesHandler);



//handles popular movies (working)
app.get("/popular", popularMoviesHandler);


//handles top rated (working)
app.get("/topRated", topRatedHandler);





//not found SHOULD ALWAYS BE IN THE END!!!
//The star mean anything, so it will always fire that function if we put it in the beginning
app.use("*", notFoundHandler)

//use the error handler
app.use(errorHandler);




//constructor to format and manipulate data from json file
function DataFormatter(id, title, release_date, poster_path, overview){

  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;

}



function popularMoviesHandler(req, res) {
  let popularMovies = [];
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`).then((value) => {

      value.data.results.forEach((value) => {
        let popularMovie = new DataFormatter(value.id, value.title, value.release_date, value.poster_path, value.overview);
        popularMovies.push(popularMovie);
      });
      return res.status(200).json(popularMovies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}







function topRatedHandler(req, res) {
  let topRatedMovies = [];

  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`).then((value) => {

      value.data.results.forEach((value) => {
        let topRatedMovie = new DataFormatter(value.id, value.title, value.release_date, value.poster_path, value.overview);
        topRatedMovies.push(topRatedMovie);
      });
      return res.status(200).json(topRatedMovies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}










//this function gave me suicidal thoughts
//restudy it so you don't kill yourself
//in case you have backend cancer in advanced course

function trendingHandler(req, res){

  let myFormattedMovies = [];



  //dont forget to add your api key

  //axios will send an http request and it will return promise 
  //and all the code that depend on the returned data should be inside .then
  //apiRespone: is axios object and we just need the data property from it
  //because it has the actual data that's coming from the API

  axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`).then(apiRespone =>{

    apiRespone.data.results.map(value => {
      
      let oneMovie = new DataFormatter(value.id, value.title, value.release_date, value.poster_path, value.overview);

      myFormattedMovies.push(oneMovie);

    })

    //just use 200 when you succeed a request, will discuss this later
    return res.status(200).json(myFormattedMovies);

  }).catch(error => {

    errorHandler(error, req, res);

  })

}



function searchMoviesHandler(req, res){

  //my keyword is something I assign, and it's what I type in postman


  // http://localhost:4000/searchMovies?myKeyword=""

  let searchquery = req.query.myKeyword;
  console.log(req.query.myKeyword);
  let searchedMovies=[];
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchquery}`).then(value => {
      value.data.results.forEach(movies => {
          let searchedMovie = new DataFormatter (movies.id, movies.title, movies.release_date, movies.poster_path, movies.overview);
          searchedMovies.push(searchedMovie);

      })
      return res.status(200).json(searchedMovies);
  }).catch(error => {
      errorHandler(error, req,res);
    
  });

}




function favoriteHandler(req, res){

  return res.send("Welcome to Favorite Page");

}



function notFoundHandler(req, res){

  return res.status(404).send("Page not found");
  
}


function errorHandler(error, req, res){
  const err = {
    status : 500,
    responseText : "Sorry, something went wrong"
  }
  return res.status(500).send(err);

}








app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});






