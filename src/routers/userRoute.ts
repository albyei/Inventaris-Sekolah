import express from "express";
import {
  authentification,
  getAlluser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  verifyAdduser,
  verifyEdituser,
  verifyAuthentification,
} from "../middlewares/verifyUser";
import { verifyToken, verifyRole } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.post("/create", [verifyAdduser], createUser);
app.post(`/login`, [verifyAuthentification], authentification);
app.put(
  "/edit/:id",
  [verifyToken, verifyRole(["admin", "student"]), verifyEdituser],
  updateUser
);
app.delete(
  "/delete/:id",
  [verifyToken, verifyRole(["admin", "student"])],
  deleteUser
);
app.get("/",  getAlluser);
// []: midlleware

export default app;
