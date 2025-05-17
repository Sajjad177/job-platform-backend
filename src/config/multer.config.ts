import multer from "multer";
import path from "path";

// Multer Storage (Disk-based)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname + Date.now() + path.extname(file.originalname)
    );
  },
});

// File Type Check
const fileFilter = (req: any, file: any, callback: any) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error());
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
