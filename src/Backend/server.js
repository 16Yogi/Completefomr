import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt = 10;

const app = express();
app.use(express.json());
// 
app.use(cors({
    origin:["http://localhost:3001"],
    methods:["POST","GET"],
    credentials:true
}));
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

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password, data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
                    //l
                    const name = data[0].name;
                    const token = jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                    res.cookie('token',token)
                    return res.json({ Status: "success" });
                } else {
                    return res.json({ Status: "password not match" });
                }
            });
        } else {
            return res.json({ Error: "No Email" });
        }
    });
});

const verifyUser = (req,res,next)=>{
    const token = req.cookie.token;
    if(!token){
        return res.json({Error:"you are not authenticated"});
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"Token is not okay"})
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"SUccess",name:req.name});
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})

app.listen(8000,()=>{
    console.log("Running...")
})