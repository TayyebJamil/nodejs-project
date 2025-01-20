// const request = require("supertest");
// const app = require("../server"); // Assuming your server is exported
// const User = require("../models/User");

// // Mock the middleware
// jest.mock("../middleware/authenticateToken", () => (req, res, next) => {
//   req.user = { userId: "mockAdminId", role: "Admin" }; // Mock admin user
//   next();
// });

// // Mock the User model
// jest.mock("../models/User", () => ({
//   find: jest.fn(),
//   findById: jest.fn(),
// }));

// jest.mock("../models/User");

// describe("UserController Tests", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("GET /api/users", () => {
//     test("should return all users (Admin Only)", async () => {
//       const mockUsers = [
//         {
//           _id: "1",
//           username: "JohnDoe",
//           email: "john@example.com",
//           role: "User",
//         },
//         {
//           _id: "2",
//           username: "JaneDoe",
//           email: "jane@example.com",
//           role: "Admin",
//         },
//       ];

//       User.find.mockResolvedValue(mockUsers);

//       const response = await request(app)
//         .get("/api/users")
//         .set("Authorization", "Bearer validAdminToken"); // Simulate Admin token

//       expect(response.status).toBe(200);
//       expect(response.body.users).toEqual(mockUsers);
//       expect(User.find).toHaveBeenCalledTimes(1);
//     });

//     test("should return 500 if there is a server error", async () => {
//       User.find.mockRejectedValue(new Error("Database error"));

//       const response = await request(app)
//         .get("/api/users")
//         .set("Authorization", "Bearer validAdminToken");

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty(
//         "message",
//         "Server error. Please try again later."
//       );
//     });
//   });

//   describe("PUT /api/users/:id/role", () => {
//     test("should update the user role (Admin Only)", async () => {
//       const mockUser = {
//         _id: "1",
//         username: "JohnDoe",
//         email: "john@example.com",
//         role: "User",
//       };

//       User.findById.mockResolvedValue(mockUser);
//       User.prototype.save = jest.fn().mockResolvedValue({
//         ...mockUser,
//         role: "Admin",
//       });

//       const response = await request(app)
//         .put("/api/users/1/role")
//         .set("Authorization", "Bearer validAdminToken") // Simulate Admin token
//         .send({ role: "Admin" });

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty(
//         "message",
//         "User role updated successfully."
//       );
//       expect(response.body.user.role).toBe("Admin");
//       expect(User.findById).toHaveBeenCalledTimes(1);
//     });

//     test("should return 400 if Admin tries to downgrade themselves", async () => {
//       const response = await request(app)
//         .put("/api/users/1/role")
//         .set("Authorization", "Bearer validAdminToken") // Simulate Admin token
//         .send({ role: "User" });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty(
//         "message",
//         "Admins cannot downgrade their own role."
//       );
//     });

//     test("should return 404 if user is not found", async () => {
//       User.findById.mockResolvedValue(null);

//       const response = await request(app)
//         .put("/api/users/123/role")
//         .set("Authorization", "Bearer validAdminToken")
//         .send({ role: "Admin" });

//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "User not found.");
//     });
//   });

//   describe("GET /api/users/:id", () => {
//     test("should return a user by ID (Admin or User themselves)", async () => {
//       const mockUser = {
//         _id: "1",
//         username: "JohnDoe",
//         email: "john@example.com",
//         role: "User",
//       };

//       User.findById.mockResolvedValue(mockUser);

//       const response = await request(app)
//         .get("/api/users/1")
//         .set("Authorization", "Bearer validUserToken");

//       expect(response.status).toBe(200);
//       expect(response.body.user).toEqual(mockUser);
//       expect(User.findById).toHaveBeenCalledTimes(1);
//     });

//     test("should return 404 if user is not found", async () => {
//       User.findById.mockResolvedValue(null);

//       const response = await request(app)
//         .get("/api/users/123")
//         .set("Authorization", "Bearer validUserToken");

//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "User not found.");
//     });

//     test("should return 403 if insufficient permissions", async () => {
//       const mockUser = {
//         _id: "1",
//         username: "JohnDoe",
//         email: "john@example.com",
//         role: "User",
//       };

//       User.findById.mockResolvedValue(mockUser);

//       const response = await request(app)
//         .get("/api/users/1")
//         .set("Authorization", "Bearer anotherUserToken"); // Simulate another user's token

//       expect(response.status).toBe(403);
//       expect(response.body).toHaveProperty(
//         "message",
//         "Access forbidden: insufficient permissions."
//       );
//     });
//   });
// });
