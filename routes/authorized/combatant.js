import express from "express";
import combatantController from "../../controllers/combatant.js";
const router = express.Router();

router.post(
    "/create",
    combatantController.authorized.create
);
router.post(
    "/read",
    combatantController.authorized.read
);
router.put(
    "/update",
    combatantController.authorized.update
);
router.delete(
    "/delete",
    combatantController.authorized.delete
);

export default router;