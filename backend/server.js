const express = require('express')
const  cors = require('cors')
const data = require('./data.js'); /* put ./ if not node consider is package module*/


const app = express();

app.use(cors())/*By using this we are able send multiple url to this adress https://loaclhost:9000 */

app.get("/api/products", (req,res) => {
    res.send(data.products);
});

app.listen(9000, ()=>{
    console.log(`sever is runing at https://loaclhost:9000`)
})
