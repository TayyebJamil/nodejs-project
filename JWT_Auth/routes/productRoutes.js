// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and information
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Product data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Mouse
 *               description:
 *                 type: string
 *                 example: A high-precision wireless mouse.
 *               price:
 *                 type: number
 *                 example: 29.99
 *               category:
 *                 type: string
 *                 example: Electronics
 *               stock:
 *                 type: integer
 *                 example: 150
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: url
 *                   example: https://example.com/image1.jpg
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully.
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Validation errors or duplicate product name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product with this name already exists.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Price must be a non-negative number.
 *                       param:
 *                         type: string
 *                         example: price
 *                       location:
 *                         type: string
 *                         example: body
 *       401:
 *         description: Unauthorized - Access token missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Server error.
 */

router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin", "Editor"),
  [
    body("name")
      .notEmpty()
      .withMessage("Product name is required.")
      .isLength({ min: 3 })
      .withMessage("Product name must be at least 3 characters long."),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a non-negative number."),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer."),
    body("images")
      .optional()
      .isArray()
      .withMessage("Images must be an array of URLs."),
    body("images.*")
      .optional()
      .isURL()
      .withMessage("Each image must be a valid URL."),
  ],
  createProduct
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price to filter products
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price to filter products
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 12
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error.
 */

router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer."),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer."),
    query("search").optional().isString(),
    query("category").optional().isString(),
    query("minPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("minPrice must be a non-negative number."),
    query("maxPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("maxPrice must be a non-negative number."),
  ],
  getProducts
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid product ID.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID.")],
  getProductById
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       description: Product data to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Wireless Mouse
 *               description:
 *                 type: string
 *                 example: An updated description for the wireless mouse.
 *               price:
 *                 type: number
 *                 example: 34.99
 *               category:
 *                 type: string
 *                 example: Electronics
 *               stock:
 *                 type: integer
 *                 example: 120
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: url
 *                   example: https://example.com/images/mouse3.jpg
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product updated successfully.
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Validation errors.
 *       401:
 *         description: Unauthorized - Access token missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin", "Editor"),
  [
    param("id").isMongoId().withMessage("Invalid product ID."),
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Product name must be at least 3 characters long."),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a non-negative number."),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer."),
    body("images")
      .optional()
      .isArray()
      .withMessage("Images must be an array of URLs."),
    body("images.*")
      .optional()
      .isURL()
      .withMessage("Each image must be a valid URL."),
  ],
  updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully.
 *       400:
 *         description: Bad Request - Invalid product ID.
 *       401:
 *         description: Unauthorized - Access token missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  [param("id").isMongoId().withMessage("Invalid product ID.")],
  deleteProduct
);

module.exports = router;
