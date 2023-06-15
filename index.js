const express=require('express');
const { register, login } = require('./auth');
const { bmi } = require('./bmi');
const app=express();

app.use(express.json());
app.use(cors())
require('dotenv').config()

app.get("/",(req, res)=>{
    res.json({message:"Berhasil Register"})
})

app.post("/register", (req, res)=>{
    try {
        if(!(req.body.username && req.body.email && req.body.password && req.body.phone_number && req.body.name)){
            res.status(400).json({message : "Data Belum Lengkap"})
        }
        if(!req.body.username.length>=3){
            res.status(400).json({message : "Username Tidak Mencukupi"})
        }
        if(!req.body.password.length>=6){
            res.status(400).json({message : "Password Minimal 6 Karakter"})
        }
        if(req.body.password!==req.body.confirm_password){
            res.status(400).json({message : "Password Tidak Sesuai"})
        }
        return register(req.body).then((result)=>{
            res.json(result)
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.post("/login", (req,res) => {
    try {
        if(!(req.body.username && req.body.password)){
            res.status(400).json({message:"Data Belum Lengkap"})
        }
        return login(req.body).then((result) => {
            res.json(result)
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.post("/bmi", (req,res) => {
    try {
        if(!(req.body.tinggi && req.body.berat && req.body.kelamin)){
            res.status(400).json({message:"Data Belum Lengkap"})
        }
        return bmi(req.body).then((result) => {
            res.json(result)
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.listen(process.env.APP_PORT, ()=>{
    console.log("apps jalan")
})