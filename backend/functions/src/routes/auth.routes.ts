import { Router } from "express";
import { verifyTokenController, getUserByEmailController, createUserController } from "../controllers/auth.controller";


const router = Router();

router.post("/verify", verifyTokenController);
router.get("/:email", getUserByEmailController);
router.post("/", createUserController);

export default router;
