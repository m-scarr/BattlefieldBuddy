import express from "express";
import battlefield from "./battlefield.js";
import combatant from "./combatant.js";
import message from "./message.js"
import user from "./user.js"

const router = express.Router();

router.use("/battlefield", battlefield);
router.use("/combatant", combatant);
router.use("/message", message);
router.use("/user", user);

export default router;