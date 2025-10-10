const express = require("express");
const multer = require("multer");
const { DocumentReader } = require("doc-extract");
const XLSX = require("xlsx");
const { createWorker } = require("tesseract.js");
const { pdfToPng } = require("pdf-to-png-converter");

const app = express();
const upload = multer();
const reader = new DocumentReader({ debug: true });

app.use("/", express.static("public"));

async function pdfToPngBuffers(buffer) {
  try {
    // Convert PDF buffer to PNG buffers
    const pngPages = await pdfToPng(buffer, {
      disableFontFace: true,
      useSystemFonts: false,
      viewportScale: 2.0
    });
    return pngPages.map(page => page.content);
  } catch (error) {
    console.error("Error converting PDF to PNG:", error);
    throw error;
  }
}

async function ocrPdfBuffer(buffer, lang = "eng") {
  const worker = await createWorker(lang);
  try {
    const images = await pdfToPngBuffers(buffer);
    let text = "";
    for (let i = 0; i < images.length; i++) {
      console.log(`Running OCR on page ${i + 1}/${images.length}`);
      const { data } = await worker.recognize(images[i]);
      text += (data.text || "") + "\n\n--- Page " + (i + 1) + " ---\n\n";
    }
    return text.trim();
  } finally {
    await worker.terminate();
  }
}

// Unified endpoint for all document types (PDF, DOCX, DOC, PPT, PPTX, TXT)
app.post("/extract-text", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`Processing ${req.file.originalname} (${req.file.mimetype})`);

    const content = await reader.readDocumentFromBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Send back text content
    res.send(content.text);
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).send("Error processing document: " + error.message);
  }
});

// Alternative endpoint that returns JSON with metadata
app.post("/extract-document", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`Processing ${req.file.originalname} (${req.file.mimetype})`);

    const content = await reader.readDocumentFromBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Send back text and metadata
    res.json({
      text: content.text,
      metadata: content.metadata,
      filename: req.file.originalname,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: error.message });
  }
});

// Excel extraction endpoint (XLS, XLSX, XLSM, XLSB, XLTX, XLTM, XLAM)
app.post("/extract-excel", upload.single("document"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`Processing Excel: ${req.file.originalname}`);

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheets = workbook.SheetNames.map(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      return {
        name: sheetName,
        data: XLSX.utils.sheet_to_json(worksheet, { defval: "" }),
        csv: XLSX.utils.sheet_to_csv(worksheet)
      };
    });

    const allText = sheets.map(s => `Sheet: ${s.name}\n${s.csv}`).join("\n\n");

    res.json({
      text: allText,
      sheets: sheets.map(s => ({ name: s.name, data: s.data })),
      metadata: {
        sheetCount: workbook.SheetNames.length,
        sheetNames: workbook.SheetNames
      },
      filename: req.file.originalname
    });
  } catch (error) {
    console.error("Error processing Excel:", error);
    res.status(500).json({ error: error.message });
  }
});

// OCR extraction for scanned PDFs
app.post("/extract-pdf-ocr", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!/\.pdf$/i.test(req.file.originalname)) return res.status(400).json({ error: "Only PDF files are supported for OCR" });

    console.log(`OCR Processing PDF: ${req.file.originalname}`);
    const lang = (req.body && req.body.lang) || "eng";
    const text = await ocrPdfBuffer(req.file.buffer, lang);
    res.json({ text, ocr: true, lang, filename: req.file.originalname });
  } catch (error) {
    console.error("Error during PDF OCR:", error);
    res.status(500).json({ error: "Failed to extract text via OCR", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
  console.log("Supported formats:");
  console.log("  - Documents: PDF, DOCX, DOC, PPT, PPTX, TXT");
  console.log("  - Spreadsheets: XLS, XLSX, XLSM, XLSB, XLTX, XLTM, XLAM");
  console.log("  - OCR: PDF files (scanned documents)");
});
