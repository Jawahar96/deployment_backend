const express = require('express');

const app = express();
const dotenv =require('dotenv').config

const PORT = process.env.PORT || 8080

const mongodb = require('mongodb')

const cors = require('cors')

const mongoClient = mongodb.MongoClient

const url =('mongodb+srv://jawaharsabesan:0NahDDc83UyIQLXL@cluster0.n6dtkg8.mongodb.net/?retryWrites=true&w=majority')

const DB ="fullstackdemo"

app.use(express.json())

app.use(cors({
    origin : "http ://localhost:3000"
}))



app.get('/home',function(req,res){
    
    res.json({message : "WELCOME TO FULL STACK DEMO TASK"})
})

// creata a user
app.post('/create-user', async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db=connection.db(DB)
   await  db.collection("user").insertOne(req.body)
    await connection.close()
    res.status(200).json({message : "User is inserted"})
    }catch(error){
        console.log(error);
       res.status(500).json({message : "User is not connected properly"})
    }
// get user
    app.get('/getuser', async function(req,res){
        try{
        const connection = await mongoClient.connect(url)
        const db=connection.db(DB)
       let users= await db.collection("users").find().toArray()
     await  connection.close()
     res.json(users)
        }catch(error){
            res.status(500).json({message : "Users are not getting properly"})
        }
    })
    // view user
    app.get('/user/:id', async function(req,res){
        try{
            const connection =  await mongoClient.connect(url)
            const db= connection.db(DB)
           const users =  db.collection('user').findOne({_id : new mongodb.ObjectId(req.params.id)})
           await  connection.close()
           res.json(users)

        }catch(error){
                res.json({message : "User view is not listed properly"})
        }
    })

    // Edit user
    app.put('/user/:id', async function(req,res){
        try{
            const connection =  await mongoClient.connect(url)
            const db= connection.db(DB)
            const view =  await db.collection('user').findOneAndUpdate({_id :new mongodb.ObjectId(req.params.id)},{$set : req.body});
            await connection.close()
            res.json(view)
            res.json({message : "Users details are updated"})
            
        }catch(error){
            res.status(500).json({messasge : "Users details are not updated properly"})
        }
    })
    // delete the user
app.delete('/userdelete', async function(req,res){
    try{
    const connection =  await mongoClient.connect(url)
    const db=connection.db(DB)
    const deleteuser = db.collection('user').findOneAndDelete(req.body)
     await connection.close()
     res.json(deleteuser)
     res.status(200).json({message : "user detail has been deleted successfully"})
    }catch(error){
        res.json({message : "user details cannot be deleted properly"})
    }
})

})
app.listen(PORT,()=>{
    console.log(`SERVER IS  RUNNING ON THE PORT ${PORT}`);
})