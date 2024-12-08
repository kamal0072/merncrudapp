const mongoose = require('mongoose');
const DB = process.env.DATABASE;


mongoose.connect(DB)
    .then(()=>console.log('Connection created successfully......'))
    .catch((err)=>console.log('Error : ',  err.message))

