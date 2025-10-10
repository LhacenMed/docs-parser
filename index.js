const express = require("express");
const multer = require("multer");
const { DocumentReader } = require("doc-extract");

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

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
