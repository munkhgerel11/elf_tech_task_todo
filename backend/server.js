const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log(uri)
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB  servertei holbogdloo")
})


app.listen(port, () => {
    console.log('Server port : ' + port);
});