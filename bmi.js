const newClient = require('./connection')

const bmi = async (data) => {
    const client = newClient()
    client.connect()
    const bmi = (data.berat/((data.tinggi/100)*(data.tinggi/100))).toFixed(2)
    const result = await client.query(`UPDATE public.user SET berat_badan = '${data.berat}', tinggi_badan = '${data.tinggi}' jenis_kelamin = '${data.kelamin}'`)
    client.end()
    if(bmi < 18.5){
        resolve({
            BMI : bmi,
            desc : "kurus",
            tips : [
                "Tingkatkan konsumsi protein untuk mencapai berat badan ideal",
                "Untuk mencapai berat badan ideal kamu perlu makan makanan bergizi dan tingkatkan frekuensi makan",
                "Tingkatkan aktivitas dan berolahraga secara teratur, dan lakukan pola hidup sehat"
            ]
        })
    } else if(bmi < 25){
        resolve({
            BMI : bmi,
            desc : "ideal",
            tips : [
                "Pertahankan asupan kalori untuk memenuhi kebutuhan kalori harian",
                "Jaga keseimbangan asupan makanan, jalankan pola rutin hidup sehat, ",
            ]
        })
    } else if(bmi < 30){
        resolve({
            BMI : bmi,
            desc : "overweight",
            tips : [
            "Tingkatkan konsumsi protein untuk mencapai berat badan ideal",
            "Tingkatkan asupan protein untuk meningkatkan massa otot",
            "Untuk mencapai berat badan ideal kamu perlu makan makanan bergizi dan tingkatkan frekuensi makan",
            "Tingkatkan aktivitas dan berolahraga secara teratur, dan lakukan pola hidup sehat"
            ]
        })
    } else{
        resolve({
            BMI : bmi,
            desc : "obesity",
            tips : [
                "Tingkatkan konsumsi protein untuk mencapai berat badan ideal",
                "Tingkatkan asupan protein untuk meningkatkan massa otot",
                "Kurangi asupan kalori agar bisa defisit kalori",
                "Tingkatkan aktivitas dan berolahraga secara teratur, dan lakukan pola hidup sehat"
            ]
        })
    }
}

module.exports = {
    bmi
}