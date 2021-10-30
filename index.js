const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6goi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db("tourCountries");
      const countryCollection = database.collection("countries");
     
    //GET API 
       app.get('/countries',async(req,res) => {
        const cursor = countryCollection.find({});
        const countries = await cursor.toArray();
        res.send(countries);
    })

    //GET SINGLE Country 
    app.get('/countries/:id',async(req,res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const country = await countryCollection.findOne(query);
        res.json(country);
        console.log(country);
    })

    //POST API 
    app.post('/countries',async(req,res) => {
        const country = req.body;
        console.log('hit the post api',service);

        const result = await countryCollection.insertOne(country);
        console.log(result);
     res.json(result);
     });
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res) => {
   res.send('Tour server is running'); 
})

app.listen(port, () =>{
    console.log('Server running at port',port);
})


