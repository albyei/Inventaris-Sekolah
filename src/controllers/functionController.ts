// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const getInventoryStats = async (
//   request: Request,
//   response: Response
// ) => {
//   try {
//     // Hitung total produk
//     const totalProducts = await prisma.barang.count();

//     // Hitung total kategori
//     const totalCategories = await prisma.kategori.count();

//     // Hitung total stok dan total nilai inventaris
//     const products = await prisma.barang.findMany({
//       select: {
//         // price: true,
//         quantity: true,
//       },
//     });

//     // Menghitung total stok dan total nilai
//     const { totalStock, totalValue } = products.reduce(
//       (acc, product) => {
//         acc.totalStock += product.quantity;
//         acc.totalValue += product.quantity * product.price;
//         return acc;
//       },
//       { totalStock: 0, totalValue: 0 }
//     );

//     // Kirimkan respons
//     return response.status(200).json({
//       message: "Inventory statistics retrieved successfully",
//       data: {
//         totalProducts,
//         totalCategories,
//         totalStock,
//         totalValue,
//       },
//     });
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         message: `Failed to retrieve inventory statistics, There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };
