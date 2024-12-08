require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./db/conn.js')
const users = require('./models/userSchema.js');
const cors = require('cors');
const router = require('./routes/router.js')

const PORT = process.env.PORT || 8003;
 
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`)
});