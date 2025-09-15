// backend/src/routes/task.routes.ts
import express from "express";
import { TaskController } from "../controllers/task.controller";

const router = express.Router();
const controller = new TaskController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
