const express = require('express');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");


const app = express();

// intilise middleware
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// database connection
require('./database');


// connecting to routes
app.use("/api/users", require('./routes/users'));
app.use("/api/model", require('./routes/model'));




//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


// listening on port
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT} successfully...`)
})