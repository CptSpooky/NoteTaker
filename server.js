// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

//Note array
let noteArray = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));

//Create IDs Function
let c = 0;
const makeID = noteArray.forEach( i => i.id = c++);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for index.js
app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// Route for css
app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// Route that sends to note page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Reads db.json and returns all saved notes as JSON
app.get("/api/notes", function(req, res) {
    try {
        let data = fs.readFileSync(`${__dirname}/db/db.json`);
        res.end(data);
    } catch (err) {
        console.log(err);
        res.end(err);
    }    
});

app.delete("/api/notes:id", function(req, res) {
    const notesID = req.params.id;
    makeID();
    noteArray.splice(notesID, 1);
    
    try {
        let data = fs.readFileSync(`${__dirname}/db/db.json`);
        res.end(data);
    } catch (err) {
        console.log(err);
        res.end(err);
    }    
});

//POST which receives a new note to save on the request body, adds it to the `db.json` file, and then returns new note to the clien
app.post("/api/notes", function(req, res) {
    // our body parsing middleware
    let newNote = req.body;
  
    console.log(newNote);
  
    // We then add the data the user sent to the db
    noteArray.push(newNote);

    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(noteArray), (err) => {
        if (err) { 
            console.log(err); 
          } 
          else { 
            // We then display the JSON to the users
            res.json(noteArray);
          } 
    })
  });

  // Route that sends to index page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route that sends to index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});