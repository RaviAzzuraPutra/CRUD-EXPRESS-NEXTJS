const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dq0msj7dz",
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "EXPRESS_NEXT_MONGO_CLOUDINARY",
        allowed_formats: ["jpg", "png"],
    }
});

const upload = multer({ storage: storage }).single('image_url');

module.exports = upload;