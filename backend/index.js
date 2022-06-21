const express = require("express");
const app = express();
const port = 5400;
const cors = require("cors");
const conn = require("./db");
conn();

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/stocks',require('./routes/stocks'));
app.use('/api/invoice',require('./routes/invoice'));

app.listen(port,()=>{
    console.log('http://localhost:' +port);
});