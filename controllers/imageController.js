const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadAndProcessImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  const { width, height } = req.query;

  // Get original image metadata
  const metadata = await sharp(req.file.buffer).metadata();

  // Calculate dimensions while maintaining aspect ratio
  let targetWidth = width ? parseInt(width) : null;
  let targetHeight = height ? parseInt(height) : null;

  // If only width is provided, calculate height to maintain aspect ratio
  if (targetWidth && !targetHeight) {
    targetHeight = Math.round((targetWidth / metadata.width) * metadata.height);
  }
  // If only height is provided, calculate width to maintain aspect ratio
  else if (!targetWidth && targetHeight) {
    targetWidth = Math.round((targetHeight / metadata.height) * metadata.width);
  }
  // If neither is provided, use original dimensions
  else if (!targetWidth && !targetHeight) {
    targetWidth = metadata.width;
    targetHeight = metadata.height;
  }

  // Process main high-quality image
  const processedImageBuffer = await sharp(req.file.buffer)
    .resize(targetWidth, targetHeight, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 90 })
    .toBuffer();

  // Create a small, blurred placeholder image
  const placeholderBuffer = await sharp(req.file.buffer)
    .resize(20, 20, {
      // Very small size for quick loading
      fit: 'cover',
      position: 'center',
    })
    .blur(8) // Add significant blur
    .webp({ quality: 30 }) // Low quality is fine for placeholder
    .toBuffer();

  // Upload both images to Cloudinary
  const [mainImage, placeholderImage] = await Promise.all([
    // Upload main image
    new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            format: 'webp',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(processedImageBuffer);
    }),
    // Upload placeholder image
    new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            format: 'webp',
            transformation: [
              { effect: 'blur:1000' }, // Additional blur effect in Cloudinary
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(placeholderBuffer);
    }),
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      url: mainImage.secure_url,
      placeholderUrl: placeholderImage.secure_url,
      width: mainImage.width,
      height: mainImage.height,
      format: mainImage.format,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
    },
  });
});
