const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const user = require('./routes/user');
const project = require('./routes/project');


var app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './public')))


mongoose.connect("mongodb://localhost:27017/ConvoBot", {
   useNewUrlParser: true
}, () => {
   console.log("Connected to Mongodb at port 27017")
})

app.use("/api/user", user)
app.use("/api/project", project)




app.listen(3000, () => {
   console.log(`Listening to port ${"http://localhost:3000/"}`)
})