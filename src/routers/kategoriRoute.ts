// import express from "express";
// import {
//   getAllKategori,
//   createKategori,
//   updateKategori,
//   deletekategori,
// } from "../controllers/KategoriController";
// import  {verifyAddKategori, verifyUpdateKategori} from "../middlewares/verifyKategori"
// import {verifyToken,verifyRole} from "../middlewares/authorization"

// const app = express();
// app.use(express.json());

// app.post("/create", [verifyToken,verifyRole(["admin"]),verifyAddKategori], createKategori);
// app.put("/edit/:id", [verifyUpdateKategori], updateKategori);
// app.delete("/delete/:id", deletekategori);
// app.get("/", [verifyToken,verifyRole(["admin","manager"])],getAllKategori);
// // []: midlleware

// export default app;
