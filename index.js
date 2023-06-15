const express=require('express');
const { register, login } = require('./auth');
const { bmi } = require('./bmi');
const app=express();
const cors = require('cors')

app.use(express.json());
app.use(cors())
require('dotenv').config()

app.get("/",(req, res)=>{
    res.json({message:"Berhasil Register"})
})

app.post("/register", (req, res)=>{
    try {
        if(!(req.body.username && req.body.email && req.body.password)){
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

// contoh request dan response
// register
// request
// {
//     "email":"ganteng@mail.com",
//     "username":"kegantengan",
//     "password":"wajahkucantik1234",
//     "confirm_password":"wajahkucantik1234"
// }
// response
// {
//     "message":"Register success"
// }

// login
// request
// {
//     "email":"ganteng@mail.com",
//     "password":"wajahkucantik1234"
// }
// response
// {
//     "message":"Login success",
//     "data":{
//         "id":"723652839547",
//         "email":"ganteng@mail.com",
//         "username":"kegantengan",
//         "password":"KJVHzrvkiruyt85yt825y"
//     }
//     "access_token":"NVKFJSHgvueft7rtv38v7tyv3gshvn5kyh6yb56u",
//     "refresh_token":"KJVHkSKJFGHvithgritgh875y45cuhejhkshgkfjb"
// }

// kalkulator bmi
// request
// {
//     "berat":50,
//     "tinggi":180,
//     "kelamin":"pria"
// }
// response
// {
//     "BMI":14.5,
//     "desc":"kurus",
//     "tips":[
//         "Tingkatkan konsumsi protein untuk mencapai berat badan ideal",
//         "Untuk mencapai berat badan ideal kamu perlu makan makanan bergizi dan tingkatkan frekuensi makan",
//         "Tingkatkan aktivitas dan berolahraga secara teratur, dan lakukan pola hidup sehat"    
//     ]
// }