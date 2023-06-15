const bcrypt = require('bcryptjs')
const newClient = require('./connection')
const jwt = require('jsonwebtoken')

const register=(data)=>{
    return new Promise(async(resolve, reject)=>{
        const hashedPassword = await bcrypt.hash(data.password, 8)
        const client = newClient()
        client.connect()
        client.query(`INSERT into public.user(username, email, password)
                      values('${data.username}','${data.email}','${hashedPassword}')`, (err)=>{
                        if(err){
                            reject(err.message)
                        }
                        const accessToken = 
                        resolve({message : "Register success"})
                        client.end()
                    })
    })
}

const login=(data)=>{
    return new Promise(async(resolve, reject)=>{
        const client = newClient()
        client.connect()
        // client.query(`SELECT * from public.user where username = '${data.username}'`, async (err, result)=>{
        //     if(err){
        //         reject(err.message)
        //     }
        //     if(!result.rows[0]){
        //         reject({message : "Data Tidak Ditemukan"})
        //     }
        //     const match = await bcrypt.compareSync(data.password, result.rows[0].password)
        //     if(!match){
        //         reject({ message : "Password Salah"})
        //     }
        //     resolve({message : "Login success", data : result.rows[0]})
        //     client.end()
        // })
        const result = await client.query(`SELECT * from public.user where username = '${data.username}'`)
        if(!result.rows[0]){
            reject({message : "Data Tidak Ditemukan"})
        }
        else{
            const match = await bcrypt.compareSync(data.password, result.rows[0].password)
            if(!match){
                reject({ message : "Password Salah"})
            } else {
                const access_token = jwt.sign({id:result.rows[0].id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"})
                const refresh_token = jwt.sign({id:result.rows[0].id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
                resolve({message : "Login success", data : result.rows[0], access_token, refresh_token})    
            }
        }
        client.end()
    })
}

module.exports = {
    register,
    login
}