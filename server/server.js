const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
// const GridFSStorage = require("multer-gridfs-storage");
const gridfsStream = require("gridfs-stream");
const GridFSStorage = require('multer-gridfs-storage').GridFsStorage;


// middleware (security)
// set up server to listen, using port 8000
const server = app.listen(8000, () => {console.log("Server listening on port 8000...");});

// For both sigint and sigterm signals, shut down the server gracefully!
process.on('SIGINT', shutdownFun);
process.on('SIGTERM', shutdownFun);

// connect to database 
const mongoDB = 'mongodb://127.0.0.1:27017/foutube';
mongoose.connect(mongoDB)  
    .then(() => console.log("Sucess! We connected to foutube!"))  // success confirmation 
    .catch((err) => console.log("Oh no! " + err));                // error catching 

//create variable for the connection (used by shutdown function)
let mongooooseDb = mongoose.connection;

const storage = multer.diskStorage({
  destination: function( req, file, cb ) {
    cb(null, 'test/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });

app.post('/test/upload', upload.single('testFile'), (req, res) =>{
  res.send("Did it work!?!");
});


// //setting up grid fs
// let gfs;
// const conn = mongooooseDb;
// conn.once("open", () => {
//   gfs = gridfsStream(conn.db, mongoose.mongo);
//   gfs.collection("uploadsCOLLECTION"); // specify collection for GridFS
// });

// const storage =  new GridFSStorage({
//   url: mongoDB,
//   file: (req, file) => {
//     console.log("Storage function executing!");
//     console.log("File details: ", file);
//     return;
//     // return { 
//       // bucketName: "uploadsCOLLECTION", // specify the collection name in GridFS
//       // filename: file.originalname, // use original filename
//     // };
//   } 
// });


//to be used as a middleware to upload the files upon route request
// const upload = multer({ storage });

// middleware to allow requests from client

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// middleware to simply log when a request is received
app.use((req, res, next) => {
    console.log("Request Received!");
    next();
});

// routes 
// route for when a user wants to upload a video
// app.post("/upload/video", upload.single('videoFile'), async (req, res) => {
//     console.log("Trying to Upload Video...");

//     if( !req.file){
//         console.log("There's no file here!");
//     }
//     else console.log("File uploaded!")
    
//     res.status(200).send("Done!");
//     console.log("Done!");
//     return;
// }); 
// end of routes


//shuts down server when receiving SIGINT
function shutdownFun(signal){
  // TODO DELETE?
  console.log(`Recieved ${signal}`);
  if(server){ 

    const timeout = setTimeout(() => {
        console.log("Forcefully shutting down due to timeout.");
        process.exit(1);  // Exit forcefully if it takes too long
      }, 10000); 

    server.close(()=> 
    {
        clearTimeout(timeout);
        console.log("Server closed.");
        if(mongooooseDb){
            mongooooseDb.close().then(() => {
                console.log("Database instance disconnected");
                console.log("la la la");
                process.exit(0);
            }).catch(err => {
            console.log("We ran into an error when trying to close mongoose! ", err);
            process.exit(1);
            });
        }
        else{
            console.log("No Mongoose");
            process.exit(0);
        }
    });
    // get all connections 
    server.getConnections((err, count) => {
        if (err) {
          console.error("Error getting connections:", err);
          process.exit(1);
        }
        console.log(`There are ${count} connections active.`);
      });

  }
  else{
    console.log("Server not open!");
    process.exit(0);
  }
}