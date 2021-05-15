const express = require('express');
const path = require("path");

const app = express();
const multer = require('multer');

//creo instancia de multer (middleware)
const upload = multer();

//googleApi
const GoogleAPI = require("./GoogleApi");

//service account, apra deploy comment
//process.env["GOOGLE_APPLICATION_CREDENTIALS"] = "./uaofacedeteapp-95977631594d.json"

/* importante por la seguridad , no dejar el dirname para todos los archivos */
const publicFolder = path.join(__dirname, "public");
/* mapeo del directorio publico para poder acceder a el desde http */
app.use("/public", express.static(publicFolder));

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, "public/index.html");
    return res.sendFile(indexFile);
});

app.post("/uploadImage", upload.none(), async(req, res) => {
    const imageBase64 = req.body["image"].replace(/^data:image\/jpeg;base64,/, "");

    const name = req.body["name"];
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const googleApi = new GoogleAPI(imageBuffer);
    const facesAnnotations = await googleApi.detectFaces();
    const textAnnotations = await googleApi.extractText();
    const all = { textAnnotations, facesAnnotations };
    return res.json(all);

});

app.listen(8080, function() {
    console.log("server running");
});