import express from "express";
import {
getAllBarang,
  createBarang,
  updateBarang,
  deleteBarang,
} from "../controllers/barangController";
import  {verifyAddProduct, verifyEditProduct} from "../middlewares/verifyBarang"
import {verifyToken,verifyRole} from "../middlewares/authorization"

const app = express();
app.use(express.json());

app.post("/create", [verifyToken,verifyRole(["admin"]),verifyAddProduct], createBarang);
app.put("/edit/:id", [verifyToken,verifyRole(["admin"]),verifyEditProduct], updateBarang);
app.delete("/delete/:id", [verifyToken,verifyRole(["admin"])],deleteBarang);
app.get("/", [verifyToken,verifyRole(["admin","student"])],getAllBarang);
// []: midlleware

export default app;
