const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
  if (!req.files || !req.files.pdfFile) {
    return res.status(400).send("No file uploaded.").end();
  }

  pdfParse(req.files.pdfFile)
    .then((data) => {
      res.send(data.text);
    })
    .catch((err) => {
      res.status(500).send("Error processing PDF file:", err);
    });

  // const pdfFile = req.files.pdf;
  // try {
  //   const data = pdfParse(pdfFile.data);
  //   res.send(data.text);
  // } catch (err) {
  //   res.status(500).send("Error processing PDF file.");
  // }
});

app.listen(3000);
