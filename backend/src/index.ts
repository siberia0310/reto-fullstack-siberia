import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.get("/", (_req, res) => {
  res.send("Backend funcionando");
});
