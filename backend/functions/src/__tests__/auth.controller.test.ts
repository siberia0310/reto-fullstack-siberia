import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth.routes";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth API", () => {
  it("POST /api/auth/verify with invalid token should fail", async () => {
    const res = await request(app)
      .post("/api/auth/verify")
      .send({ idToken: "invalid_token" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
