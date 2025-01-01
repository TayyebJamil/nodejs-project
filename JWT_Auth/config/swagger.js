// config/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Role-Based Authentication and Product Management API",
      version: "1.0.0",
      description:
        "API documentation for the Role-Based Authentication and Product Management System.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
      // Add production server URLs as needed
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "60d0fe4f5311236168a109ca",
            },
            username: {
              type: "string",
              example: "johndoe",
            },
            email: {
              type: "string",
              format: "email",
              example: "johndoe@example.com",
            },
            role: {
              type: "string",
              enum: ["Admin", "Editor", "Viewer"],
              example: "Viewer",
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-12-30T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-12-30T12:00:00.000Z",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "60d1f9b5f5311236168a10ab",
            },
            name: {
              type: "string",
              example: "Wireless Keyboard",
            },
            description: {
              type: "string",
              example: "A sleek wireless keyboard with ergonomic design.",
            },
            price: {
              type: "number",
              example: 49.99,
            },
            category: {
              type: "string",
              example: "Electronics",
            },
            stock: {
              type: "integer",
              example: 100,
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "url",
                example: "https://example.com/images/keyboard1.jpg",
              },
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-12-30T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-12-30T12:15:00.000Z",
            },
          },
        },
        // Define additional schemas as needed
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
