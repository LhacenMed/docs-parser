# Multi-Format Document Text Extractor

A Node.js Express application that extracts text and data from multiple document formats including PDF, DOCX, DOC, PPT, PPTX, TXT, and Excel files (XLS, XLSX, XLSM, XLSB, etc.).

## Features

- 📄 **Multi-format support**: PDF, DOCX, DOC, PPT, PPTX, TXT, XLS, XLSX, XLSM, XLSB
- 🚀 **Simple API**: Upload any document and get extracted text/data
- 📊 **Metadata extraction**: Get document metadata along with text
- 📈 **Excel support**: Extract data from all sheets with JSON and CSV output
- 🔍 **OCR for PDFs**: Extract text from scanned PDFs using Tesseract.js
- 🎨 **User-friendly interface**: Clean web interface for easy file uploads
- ⚡ **Fast processing**: Uses `doc-extract` and `xlsx` libraries for efficient extraction

## Installation

```bash
npm install
```

## Dependencies

- `express` - Web server framework
- `multer` - File upload handling
- `doc-extract` - Multi-format document text extraction
- `xlsx` (v0.20.3) - Excel file parsing (SheetJS Community Edition from CDN)
- `tesseract.js` - JavaScript OCR for extracting text from images and scanned PDFs
- `pdf-to-png-converter` - Convert PDF pages to images for OCR processing

## Usage

### Start the server

```bash
node index.js
```

The server will start on `http://localhost:3000`

### API Endpoints

#### 1. Extract Text Only

**POST** `/extract-text`

Upload a document and receive extracted text as plain text response.

```bash
curl -X POST http://localhost:3000/extract-text \
  -F "document=@/path/to/your/file.pdf"
```

#### 2. Extract Text with Metadata

**POST** `/extract-document`

Upload a document and receive extracted text along with metadata as JSON.

```bash
curl -X POST http://localhost:3000/extract-document \
  -F "document=@/path/to/your/file.docx"
```

**Response:**
```json
{
  "text": "Extracted text content...",
  "metadata": {
    "pages": 5,
    "words": 1234,
    "characters": 6789
  },
  "filename": "file.docx",
  "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}
```

#### 3. Extract Excel Data

**POST** `/extract-excel`

Upload an Excel file and receive data from all sheets in JSON format.

```bash
curl -X POST http://localhost:3000/extract-excel \
  -F "document=@/path/to/your/file.xlsx"
```

**Response:**
```json
{
  "text": "Sheet: Sheet1\nHeader1,Header2\nValue1,Value2\n\nSheet: Sheet2\n...",
  "sheets": [
    {
      "name": "Sheet1",
      "data": [
        {"Header1": "Value1", "Header2": "Value2"},
        {"Header1": "Value3", "Header2": "Value4"}
      ]
    }
  ],
  "metadata": {
    "sheetCount": 2,
    "sheetNames": ["Sheet1", "Sheet2"]
  },
  "filename": "file.xlsx"
}
```

#### 4. Extract Text from PDF with OCR

**POST** `/extract-pdf-ocr`

Upload a PDF file and extract text using OCR (useful for scanned documents).

```bash
curl -X POST http://localhost:3000/extract-pdf-ocr \
  -F "document=@/path/to/scanned.pdf"
```

**Response:**
```json
{
  "text": "Extracted text from all pages...",
  "ocr": true,
  "lang": "eng",
  "filename": "scanned.pdf"
}
```

**Note:** OCR processing is slower than regular text extraction and requires more resources.

## Web Interface

Open `http://localhost:3000` in your browser to use the web interface:

1. Click "Choose File" and select a document (PDF, DOCX, DOC, PPT, PPTX, TXT, XLS, XLSX, etc.)
2. For scanned PDFs, check "Use OCR for PDF (slower)"
3. Click "Extract Text"
4. View the extracted text/data and metadata
5. For Excel files, see individual sheet data in the metadata section

## Supported Formats

### Documents
- **PDF** (.pdf) - Portable Document Format
- **DOCX** (.docx) - Microsoft Word (2007+)
- **DOC** (.doc) - Microsoft Word (legacy)
- **PPT** (.ppt) - Microsoft PowerPoint (legacy)
- **PPTX** (.pptx) - Microsoft PowerPoint (2007+)
- **TXT** (.txt) - Plain text files

### Spreadsheets
- **XLSX** (.xlsx) - Excel (2007+)
- **XLS** (.xls) - Excel (legacy)
- **XLSM** (.xlsm) - Excel with macros
- **XLSB** (.xlsb) - Excel binary format
- **XLTX** (.xltx) - Excel template
- **XLTM** (.xltm) - Excel template with macros
- **XLAM** (.xlam) - Excel add-in

## System Requirements

For full functionality, some system dependencies may be required:

### Windows
- Most formats work out of the box

### Linux/Mac
You may need to install additional tools:
```bash
# Ubuntu/Debian
sudo apt-get install antiword poppler-utils tesseract-ocr

# macOS
brew install antiword poppler tesseract
```

## Project Structure

```
docs-parser/
├── index.js           # Express server with doc-extract integration
├── public/
│   └── index.html    # Web interface
├── package.json      # Project dependencies
└── README.md         # This file
```

## Error Handling

The application includes comprehensive error handling:

- Returns 400 status for missing files
- Returns 500 status with error message for processing failures
- Console logs all errors for debugging

## License

ISC

## Notes

- The library uses `doc-extract` which provides a unified API for multiple document formats
- `xlsx` library is installed from the official SheetJS CDN (v0.20.3) instead of npm registry
- Some formats may have dependencies on system tools (see System Requirements)
- Large files may take longer to process

### Why SheetJS from CDN?

The npm registry version of `xlsx` is outdated (0.18.5). The official SheetJS CDN provides the latest version (0.20.3) with:
- Latest bug fixes and security patches
- Better performance and stability
- Support for newer Excel formats

**To upgrade in the future:**
```bash
npm rm --save xlsx
npm i --save https://cdn.sheetjs.com/xlsx-VERSION/xlsx-VERSION.tgz
```

Check [https://cdn.sheetjs.com](https://cdn.sheetjs.com) for the latest version.
