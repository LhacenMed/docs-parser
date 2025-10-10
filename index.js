const express = require("express");
const multer = require("multer");
const { DocumentReader } = require("doc-extract");
const XLSX = require("xlsx");

const app = express();
const upload = multer();
const reader = new DocumentReader({ debug: true });

app.use("/", express.static("public"));

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

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
  console.log("Supported formats:");
  console.log("  - Documents: PDF, DOCX, DOC, PPT, PPTX, TXT");
  console.log("  - Spreadsheets: XLS, XLSX, XLSM, XLSB, XLTX, XLTM, XLAM");
});
