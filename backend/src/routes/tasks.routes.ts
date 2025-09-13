import express from "express";
import { TaskService } from "../usecases/TaskService";
import { FirestoreTaskRepository } from "../infraestructure/repositories/FirestoreTaskRepository";

const router = express.Router();
const taskService = new TaskService(new FirestoreTaskRepository());

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Error getting tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await taskService.update(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await taskService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

export default router;
