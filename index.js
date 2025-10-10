const express = require("express");
const fileUpload = require("express-fileupload");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");
const { pathToFileURL } = require("url");

const app = express();

// Configure worker for Node.js environment
const workerPath = require.resolve("pdfjs-dist/legacy/build/pdf.worker.mjs");
const workerUrl = pathToFileURL(workerPath).href;
PDFParse.setWorker(workerUrl);

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-pdf", async (req, res) => {
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

app.post("/extract-docx", async (req, res) => {
  if (!req.files || !req.files.docxFile) {
    return res.status(400).send("No file uploaded.").end();
  }

  try {
    const result = await mammoth.extractRawText({ buffer: req.files.docxFile.data });
    res.send(result.value);
  } catch (err) {
    console.error("Error processing DOCX file:", err);
    res.status(500).send("Error processing DOCX file: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
