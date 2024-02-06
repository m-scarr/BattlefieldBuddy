import express from "express";
import battlefieldController from "../../controllers/battlefield.js";
const router = express.Router();

router.post(
    "/create",
    battlefieldController.authorized.create
);
router.post(
    "/read",
    battlefieldController.authorized.read
);
router.put(
    "/update",
    battlefieldController.authorized.update
);
router.delete(
    "/delete",
    battlefieldController.authorized.delete
);

export default router;