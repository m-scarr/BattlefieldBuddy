import express from "express";
import messageController from "../../controllers/message.js";
const router = express.Router();

/*router.post(
    "/create",
    messageController.authorized.create
);*/
router.get(
    "/readByUser",
    messageController.authorized.readByUser
);

export default router;