const express = require('express')
const app = express()
const fs = require('fs')
const multer  = require('multer')
const sharp = require('sharp');

const storageStrategy = multer.memoryStorage()
const upload = multer({ Storage: storageStrategy })

app.use(express.json())

app.get('/' , function(req, res) {

    res.send('Hola Mundo desde Heroku !!!!!!!')
}

)

app.post('/imagen', upload.single('imagen'), async function (req, res) {

    
    const imagen = req.file

    const processedImage = sharp(imagen.buffer)

    const resizeImage = processedImage.resize(800, 200, {
        fit: "contain",
        background: "#fff"
    })
    
    const resizeImageBuffer = await resizeImage.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png', resizeImageBuffer)

    console.log(resizeImageBuffer)


res.send({ resizeImage: resizeImageBuffer})

})

const port = process.env.port || 4000

app.listen(port, function(){

console.log("Servidor escuchando en el puerto", port)

})
