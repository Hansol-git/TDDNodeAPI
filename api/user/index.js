import express from "express";
import ctrl from "./user.ctrl";
const router = express.Router();

router.get("/", ctrl.getUsers);
router.get("/:id", ctrl.getUserById);
router.delete("/:id", ctrl.deleteUserById);
router.post("", ctrl.createUser);
router.put("/:id", ctrl.editUser);

export default router;
