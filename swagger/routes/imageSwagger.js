/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image upload and processing operations
 */

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload and process an image
 *     description: |
 *       Upload an image, optionally resize while maintaining aspect ratio, convert to WebP format, and upload to Cloudinary.
 *       Returns both high-quality and blurred placeholder versions.
 *       - If both width and height are provided, image will be resized to exact dimensions
 *       - If only width is provided, height will be calculated to maintain aspect ratio
 *       - If only height is provided, width will be calculated to maintain aspect ratio
 *       - If neither is provided, original dimensions will be maintained
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload (max 2MB)
 *     parameters:
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Desired width of the image (optional, will maintain aspect ratio if height not provided)
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Desired height of the image (optional, will maintain aspect ratio if width not provided)
 *     responses:
 *       "200":
 *         description: Image successfully processed and uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Cloudinary URL of the high-quality image
 *                       example: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/example.webp
 *                     placeholderUrl:
 *                       type: string
 *                       description: Cloudinary URL of the blurred placeholder image
 *                       example: https://res.cloudinary.com/your-cloud/image/upload/e_blur:1000/v1234567890/placeholder.webp
 *                     width:
 *                       type: integer
 *                       description: Final width of the processed image
 *                       example: 800
 *                     height:
 *                       type: integer
 *                       description: Final height of the processed image
 *                       example: 600
 *                     originalWidth:
 *                       type: integer
 *                       description: Original width of the uploaded image
 *                       example: 1920
 *                     originalHeight:
 *                       type: integer
 *                       description: Original height of the uploaded image
 *                       example: 1080
 *                     format:
 *                       type: string
 *                       description: Image format
 *                       example: webp
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Please upload an image
 *       "413":
 *         description: Payload too large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: File too large. Maximum size is 2MB
 */
