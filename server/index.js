const connectToMongo = require('./config/database')
const express =require('express')

connectToMongo();

const app = express()
const port = 8000

app.get('/',(req , res)=>{
    res.send('hello')
})

app.listen(port, ()=> {
    console.log(`Example app listening on http://localhost:${port}`)
})