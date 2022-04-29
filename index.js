const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uy572.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const itemsCollection = client.db('Electronics').collection('allItems')
        app.get('/allItems',async(req,res)=>{
            const query ={};
            const cursor = itemsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items)
        })
    }
    finally{}
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Running Server')
})
app.listen(port,()=>{
    console.log('Listening POrt',port);
})