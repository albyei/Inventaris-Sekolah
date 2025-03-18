import express from "express";
import { createBorrow, returnItem,editBorrow,  } from "../controllers/borrow&returnController";
import { verifyAddBorrow, verifyReturn } from "../middlewares/verifyBorrow";
import { verifyToken, verifyRole } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.post("/create",[verifyToken,verifyRole(["admin","manager"])],verifyAddBorrow, createBorrow)
app.post("/return",[verifyToken,verifyRole(["admin","student"])],verifyReturn,returnItem);
app.put( "/edit/:id",editBorrow)
// app.post("/inventory",getUsageReport)

// );
// app.delete("/delete/:id", [verifyToken, verifyRole(["admin"])], deleteBarang);
// app.get("/", getAllBarang);
// []: midlleware

export default app;
