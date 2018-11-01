const express = require('express');
const mongoose = require('mongoose');

const user = require('./routes/user')

var app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ConvobBot", {
   useNewUrlParser: true
}, () => {
   console.log("Connected to Mongodb at port 27017")
})

app.use("/api/user", user)


app.listen(3000, () => {
   console.log(`Listening to port ${"http://localhost:3000/"}`)
})