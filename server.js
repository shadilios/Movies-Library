'use strict';

//basic (require express and turn it into a variable to use in my code)
const express = require("express");

//read data from json file
const myData = require("./Movie Data/data.json");




//initializing server!
const app = express();



// All my end points note: not found end point always should be in the end.

//this handles data in data.json
app.get('/', dataHandler);

//this handles favorite (task requirement)
app.get('/favorite', favoriteHandler);

/*
isn't required
//page error
app.use("/error", pageErrorHandler);

//not found SHOULD ALWAYS BE IN THE END!!!
//The star mean anything, so it will always fire that function if we put it in the beginning
app.use("*", notFoundHandler)
*/



//constructor to format and manipulate data from json file
function dataFormatter(title, poster_path, overview){

  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;

}


function dataHandler(req, res){

  //reformat my data to the required
  let oneMovie = new dataFormatter(myData.title, myData.poster_path, myData.overview);


  //just use 200 when you succeed a request, will discuss this later
  return res.status(200).json(oneMovie);

}




function favoriteHandler(req, res){

  return res.send("Welcome to Favorite Page");

}

/*
isnt required

function pageErrorHandler(req, res){
  let myPageError = {
    "status": 500,
    "responseText": "Sorry, something went wrong"
    }

  return res.status(500).send(myPageError);
}


function notFoundHandler(req, res){

  return res.status(404).send("Page not found");
  
}
*/


// The pice of code which make my server work.
app.listen(3000, () => {
  console.log("Listen on 3000");
});







