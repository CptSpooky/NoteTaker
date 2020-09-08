// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route that sends to index page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route that sends to note page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// Reads db.json and returns all saved notes as JSON
app.get("/db/db.json", function(req, res) {
    fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>");
        }
        else {
          res.writeHead(200, { "Content-Type": "text/html" });
          return res.json(data);
        }
      });
});

//POST which receives a new note to save on the request body, adds it to the `db.json` file, and then returns new note to the clien
app.post("/api/characters", function(req, res) {
    // our body parsing middleware
    let newNote = req.body;
  
    console.log(newNote);
  
    // We then add the json the user sent to the db
    characters.push(newNote);
  
    // We then display the JSON to the users
    res.json(newNote);
  });

  