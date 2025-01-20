const request = require("supertest");
const app = require("../server"); // Your Express app
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { register, login, verifyOTP } = require("./authController");

// Mock dependencies
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/User");
jest.mock("../config/email", () => ({
  sendMail: jest.fn(),
}));

describe("AuthController Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("POST /api/register", () => {
    it("should register a user successfully", async () => {
      User.findOne.mockResolvedValue(null); // Simulate user not existing
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.prototype.save = jest.fn().mockResolvedValue(); // Mock save
      jwt.sign.mockReturnValue("mockToken"); // Mock JWT token

      const response = await request(app).post("/api/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Password123",
        role: "Viewer",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("token");
      expect(User.findOne).toHaveBeenCalledTimes(2); // Email and username checks
      expect(User.prototype.save).toHaveBeenCalled();
    });

    it("should return 400 if user already exists", async () => {
      User.findOne.mockResolvedValue({ email: "testuser@example.com" });

      const response = await request(app).post("/api/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Password123",
        role: "Viewer",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "User with this email already exists."
      );
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/api/register").send({
        username: "",
        email: "invalidemail",
        password: "123",
        role: "Admin",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });

  describe("POST api/login", () => {
    it("should log in a user successfully", async () => {
      const mockUser = {
        email: "testuser@example.com",
        password: "hashedPassword",
        isOTPVerified: true,
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken");

      const response = await request(app).post("/login").send({
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Logged in successfully."
      );
      expect(response.body).toHaveProperty("token");
      expect(User.findOne).toHaveBeenCalledWith({
        email: "testuser@example.com",
      });
    });

    it("should return 401 if OTP is not verified", async () => {
      const mockUser = { email: "testuser@example.com", isOTPVerified: false };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/login").send({
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Please verify your OTP before logging in."
      );
    });

    it("should return 401 for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app).post("/api/login").send({
        email: "invaliduser@example.com",
        password: "WrongPassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password."
      );
    });
  });

  describe("POST /api/verify-otp", () => {
    it("should verify OTP successfully", async () => {
      const mockUser = {
        email: "testuser@example.com",
        otp: "123456",
        otpExpires: Date.now() + 600000, // Valid OTP
        isOTPVerified: false,
        save: jest.fn(),
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/verify-otp").send({
        email: "testuser@example.com",
        otp: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "OTP verified successfully. Your account is now active."
      );
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should return 400 for expired OTP", async () => {
      const mockUser = {
        email: "testuser@example.com",
        otp: "123456",
        otpExpires: Date.now() - 600000, // Expired OTP
        isOTPVerified: false,
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/verify-otp").send({
        email: "testuser@example.com",
        otp: "123456",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "OTP has expired. Please request a new one."
      );
    });

    it("should return 400 for invalid OTP", async () => {
      const mockUser = {
        email: "testuser@example.com",
        otp: "123456",
        otpExpires: Date.now() + 600000, // Valid OTP
        isOTPVerified: false,
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/verify-otp").send({
        email: "testuser@example.com",
        otp: "654321",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid OTP.");
    });
  });
});
