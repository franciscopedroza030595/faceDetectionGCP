const express = require('express');
const path = require("path");


const app = express();

/* importante por la seguridad , no dejar el dirname para todos los archivos */
const publicFolder = path.join(__dirname, "public");
/* mapeo del directorio publico para poder acceder a el desde http */
app.use("/public", express.static(publicFolder));

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, "public/index.html");
    return res.sendFile(indexFile);
});

app.post("/uploadImage", (req, res) => {
    /* setTimeout(() => {
        return res.send("almost done!");
    }, 5000); */
    return res.send("almost done!");

});

app.listen(8080, function() {
    console.log("server running");
});