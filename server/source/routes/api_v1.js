import express from "express";
import * as PersonController from "../controllers/personController";

const router = express.Router();

router.get("/", PersonController.getAll);
router.get("/:id", PersonController.getOne);

router.post("/create", PersonController.createOne);

export default router;
