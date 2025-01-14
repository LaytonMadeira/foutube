const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

// routes 

// end of routes

//shuts down server when receiving SIGINT
function shutdownFun(signal){
  // TODO DELETE?
  console.log(`Recieved ${signal}`);
  if(server){ 
      server.close(()=> 
      {
          console.log("Server closed. Database instance disconnected");
          if(mongooooseDb){
              mongooooseDb.close().then(() => {
                  console.log("la la la");
                  process.exit(0);
              });
          }
      })
  }
}