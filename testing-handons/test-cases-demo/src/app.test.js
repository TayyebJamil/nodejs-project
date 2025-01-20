const request = require("supertest");
const app = require("./app");

describe("USERS APIs", () => {
  test("GET /users can get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "John" }]);
  });
  test("POST /users should create a new user", async () => {
    const res = await request(app).post("/users").send({ name: "Alice" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 2, name: "Alice" });
  });

  test("POST /users should return 400 if name is missing", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Name is required");
  });

  // Add to app.test.js
  test("POST /users should handle duplicate names", async () => {
    const res = await request(app).post("/users").send({ name: "Alice" });
    expect(res.status).toBe(201);
    const duplicateRes = await request(app)
      .post("/users")
      .send({ name: "Alice" });
    expect(duplicateRes.status).toBe(201); // Your logic can handle duplicates differently if required.
  });
});
