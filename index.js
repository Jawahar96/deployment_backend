const express = require('express');

const app = express();

const mongodb = require('mongodb')

const cors = require('cors')

const mongoClient = mongodb.MongoClient

const dotenv = require('dotenv').config()

const url = process.env.DB

const DB ="fullstackdemo"

app.use(express.json())

app.use(cors({
    origin : "http://localhost:3001"
}))

app.get('/home',function(req,res){
//     let qParams =req.query
//   console.log(qParams);
//   let reusers =[]
//   for(let i=parseInt(req.query.offset);i<parseInt(req.query.offset + req.query.limit);i++){
//     reusers=push(users[i])
//   }
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
       let users= await db.collection("user").find().toArray()
     await  connection.close()
     res.json(users)
     console.log(res);
        }catch(error){
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
app.listen(process.env.PORT || 3000)
