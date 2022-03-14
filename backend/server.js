// const express = require('express') /*  common js way */
// const  cors = require('cors')
// const data = require('./data.js'); /* put ./ if not node consider is package module*/

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';

/**
 * Importing Routers
 */
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';

import data from './data';

// database connexion
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(' 🇨🇵 ⭐️ 👍 👏 😃 🫀 🫁 🧠 🇨🇵 Connected to mongodb  🇨🇵 ⭐️ 👍 👏 😃 🫀 🫁 🧠 🇨🇵 ');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
app.use(cors())/*By using this we are able send multiple url to this adress https://loaclhost:9000 */
app.use(bodyParser.json());

/**
 * Routers
 */
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

// app.use('/api/products', productRouter);

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

/**
 * By using this all our error will be catch by this
 * middleware
 */
app.use((err, req, res, next) => {
  /*
  * This mean user enter something wrond or server has problem
  */
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(9000, ()=>{
    console.log(`sever is runing at http://loaclhost:9000`)
})
