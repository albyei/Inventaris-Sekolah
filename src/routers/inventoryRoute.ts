import  express from "express";
import { generateUsageReport,analyzeBorrowedItems } from "../controllers/inventoryController";
import { verifyToken, verifyRole } from "../middlewares/authorization";


const app = express();
app.use(express.json())

app.post("/usage-report",[verifyToken,verifyRole(["admin"])], generateUsageReport);
app.post("/borrow-analysis", [verifyToken,verifyRole(["admin"])],analyzeBorrowedItems)

export default app;
