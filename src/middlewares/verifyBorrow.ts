import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";
import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import { request } from "http";
import Joi from "joi";
import { join } from "path";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const verifyAddBorrow = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const addBorrow = Joi.object({
    userId: Joi.number().positive().required(),
    barangId: Joi.number().positive().required(),
    borrowDate: Joi.date().iso().required(),
    dueDate: Joi.date().iso().min(Joi.ref("borrowDate")).required(),
  });
  const { error } = addBorrow.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

export const verifyReturn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    borrowId: Joi.number().integer().required(),
    dueDate: Joi.date().required(),
  });
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).json({
      status: false,
      message: `Validate Error : ${error}`,
    });
  }

  const { borrowId, dueDate } = request.body;

  try {
    const borrow = await prisma.borrow.findUnique({
      where: { id: borrowId },
    });

    if (!borrow) {
      return response.status(400).json({
        status: false,
        messaage: "Data pinjam tidak ditemukan",
      });
    }

    if (new Date(dueDate) < new Date(borrow.borrowDate)) {
      return response.status(400).json({
        status: false,
        message: `Tanggal pembelian tidak boleh lebih awal dari tanggal peminjaman`,
      });
    }
    return next();
  } catch (err) {
    console.error(err);
    return response.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat validasi data",
    });
  }
};






















// export const verifyEditBorrow = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { error } = editBorrow.validate(request.body, {
//     abortEarly: false,
//   });
//   if (error) {
//     return response
//       .status(400)
//       .json({
//         status: false,
//         message: error.details.map((it) => it.message).join(),
//       })
//       .status(400);
//   }
//   return next();
// };
// const validateSchema =
//   (schema: Joi.ObjectSchema) =>
//   (request: Request, response: Response, next: NextFunction) => {
//     const { error } = schema.validate(request.body, { abortEarly: false });

//     if (error) {
//       return response.status(400).json({
//         status: false,
//         message: error.details.map((it) => it.message).join(", "),
//       });
//     }

//     return next();
//   };

// }

// export const returnItem = Joi.object({
//   barangId: Joi.string().required(),
// });

// export const verifyBorrow = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { error } = borrowItem.validate(request.body, { abortEarly: false });
//   if (error) {
//     return response.status(400).json({
//       status: false,
//       message: error.details.map((it) => it.message).join(" "),
//     });
//   }
//   return next();
// };

// export const verifyReturn = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { error } = returnItem.validate(request.body, { abortEarly: false });

//   if (error) {
//     return response.status(400).json({
//       status: false,
//       message: error.details.map((it) => it.message).join(","),
//     });
//   }
//   return next();
// };

// import { PrismaClient } from "@prisma/client";
// import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

// const prisma = new PrismaClient();

// export const checkInventoryAvilable = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { barangId } = request.body;
//   try {
//     const barang = await prisma.barang.findUnique({
//       where: { id: barangId },
//     });

//     if (!barang) {
//       return response.status(404).json({
//         status: false,
//         message: "Inventroy item not found",
//       });
//     }
//     if (barang.status !== "avilable") {
//       return response.status(400).json({
//         status: false,
//         message: "Item is not available for borrowing",
//       });
//     }

//     if (barang.quantity <= 0) {
//       return response.status(400).json({
//         status: false,
//         message: "No stock available for this item",
//       });
//     }

//     request.body.inventory = barang; // Simpan data barang di request
//     return next();
//   } catch (error) {
//     return response.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// }
