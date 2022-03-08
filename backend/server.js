// const express = require('express') /*  common js way */
// const  cors = require('cors')
// const data = require('./data.js'); /* put ./ if not node consider is package module*/

import express from 'express';
import cors from 'cors';
import data from './data';

const app = express();

app.use(cors())/*By using this we are able send multiple url to this adress https://loaclhost:9000 */

app.get("/api/products", (req,res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req,res) => {
    const product = data.products.find(product => product._id === req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found !'});
    }
});

app.listen(9000, ()=>{
    console.log(`sever is runing at http://loaclhost:9000`)
})
