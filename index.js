const path = require("path");
const fs = require("fs");
const mammoth = require("mammoth");
const express = require("express");
const fileUpload = require("express-fileupload");
const { PDFParse } = require("pdf-parse");
const { pathToFileURL } = require("url");

const app = express();
const filePath = path.join(__dirname, "./samples/cv.docx");

// Configure worker for Node.js environment
const workerPath = require.resolve("pdfjs-dist/legacy/build/pdf.worker.mjs");
const workerUrl = pathToFileURL(workerPath).href;
PDFParse.setWorker(workerUrl);

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", async (req, res) => {
  if (!req.files || !req.files.pdfFile) {
    return res.status(400).send("No file uploaded.").end();
  }

  const parser = new PDFParse({ data: req.files.pdfFile.data });

  try {
    const result = await parser.getText();
    res.send(result.text);
  } catch (err) {
    console.error("Error processing PDF file:", err);
    res.status(500).send("Error processing PDF file: " + err.message);
  } finally {
    // Always clean up to free memory
    await parser.destroy();
  }
});

mammoth.extractRawText({ path: filePath }).then((result) => {
  console.log(result.value);
  const extractedText = result.value;

  fs.writeFileSync(
    path.join(__dirname, "./samples/extracted-text.txt"),
    extractedText.trim(),
    "utf8"
  );
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
