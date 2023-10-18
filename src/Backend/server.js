import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.unsubscribe(cookieParser)

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
})

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error:"Errror for hassing password"})

        const values = [
            req.body.name,
            req.body.email,
            hash 
            ]
            db.query(sql,[values],(err,result)=>{
                if(err) return res.json({Error:"Inserting data errorr in server"});
                return res.json({Status:"SUccess"});
            })
    })

})

app.listen(8000,()=>{
    console.log("Running...")
})