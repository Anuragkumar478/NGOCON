import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage config for cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // folder in cloudinary
    allowed_formats: ["jpg", "jpeg", "png","webp", "pdf"],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp", // 👈 important (many images are webp)
    "application/pdf",
  ];
// Debugging line
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP images or PDFs are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});