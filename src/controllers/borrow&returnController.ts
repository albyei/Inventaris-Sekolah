import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { request } from "http";
import { create } from "domain";
import { error } from "console";
import { date, invalid } from "joi";
import { format } from "path";

const prisma = new PrismaClient();

export const createBorrow = async (request: Request, response: Response) => {
  try {
    const { userId, barangId, borrowDate, dueDate, returnDate, status } =
      request.body;

    const userIdInt = parseInt(userId, 10);
    const barangIdInt = parseInt(barangId, 10);

    if (isNaN(userIdInt) || isNaN(barangIdInt)) {
      return response
        .status(400)
        .json({
          error:
            "Astagfirullah, userid atau barangid tidak ditemukan, coba masukan data yang sesuai",
        });
    }

    // Pastikan borrowDate dan dueDate adalah objek Date jika tidak
    const borrowDateParsed = new Date(borrowDate);
    const dueDateParsed = new Date(dueDate);

    if (isNaN(borrowDateParsed.getTime()) || isNaN(dueDateParsed.getTime())) {
      return response
        .status(400)
        .json({
          error:
            "Astagfirullah, Format tanggal tidak valid. Anda harus menentukan tanggal peminjaman dan tanggal pengembalian menggunakan format seperti ini 2024-09-14",
        });
    }

    const barang = await prisma.barang.findUnique({
      where: { id: barangIdInt },
    });

    if (!barang) {
      return response
        .status(404)
        .json({ error: "Maaf barang tidak berhasil ditemukan." });
    }

    if (barang.quantity <= 0) {
      return response
        .status(400)
        .json({ error: "Alamaakkk, Stok barang habis." });
    }

    const borrow = await prisma.borrow.create({
      data: {
        userId: userIdInt,
        barangId: barangIdInt,
        borrowDate: borrowDateParsed,
        dueDate: dueDateParsed,
        returnDate: returnDate ? new Date(returnDate) : null,
        status: status || "borrowed", // Default status if none provided
      },
    });

    // Update quantity barang
    await prisma.barang.update({
      where: { id: barangIdInt },
      data: {
        quantity: { decrement: 1 },
      },
    });

    return response.status(200).json({
      status: "SUCCESS",
      message: "ALHAMDULILLAH, Pinjaman berhasil dicatat",
      data: {
        borrowId: borrow.id.toString(),
        userId: borrow.userId.toString(),
        barangId: borrow.barangId.toString(),
        borrowDate: borrow.borrowDate.toISOString(), // Format ISO string
        dueDate: borrow.dueDate.toISOString(), // Format ISO string
      },
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `Astagfirullah, userid yang Anda masukkan tidak ada di tabel, coba masukkan angka yang masuk akal`,
    });
  }
};

export const editBorrow = async (request: Request, response: Response) => {
  try {
    const { userId, barangId, borrowDate, dueDate } = request.body;

    // Pastikan borrowDate dan dueDate ada dan dalam format yang benar
    const borrowDateParsed = new Date(borrowDate);
    const dueDateParsed = new Date(dueDate);

    // Cek apakah tanggal valid
    if (isNaN(borrowDateParsed.getTime()) || isNaN(dueDateParsed.getTime())) {
      return response
        .status(400)
        .json({ error: "Invalid date format for borrowDate or dueDate." });
    }

    // Cari record yang akan diupdate berdasarkan userId dan barangId
    const borrowRecord = await prisma.borrow.findFirst({
      where: {
        userId: Number(userId),
        barangId: Number(barangId),
      },
    });

    if (!borrowRecord) {
      return response
        .status(404)
        .json({ error: "Peminjaman tidak ditemukan." });
    }

    // Update data peminjaman
    const updatedBorrow = await prisma.borrow.update({
      where: { id: borrowRecord.id }, // Menggunakan ID yang ditemukan
      data: {
        borrowDate: borrowDateParsed,
        dueDate: dueDateParsed,
      },
    });

    // Kembalikan response dengan status dan pesan yang sesuai
    return response.status(200).json({
      status: "SUCCESS",
      message: "ALHAMDULILLAH, edit berhasil dicatat",
      data: {
        userId: String(updatedBorrow.userId),
        barangId: String(updatedBorrow.barangId),
        borrowDate: updatedBorrow.borrowDate.toISOString(),
        dueDate: updatedBorrow.dueDate.toISOString(),
      },
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `Terjadi kesalahan: ${error}`,
    });
  }
};

export const returnItem = async (request: Request, response: Response) => {
  const { borrowId, dueDate } = request.body;
  const borrowIdInt = parseInt(borrowId, 10);
  try {
    if (!borrowId || !dueDate) {
      return response.status(400).json({
        status: "error",
        message:
          "Id pinjam (borrowdId) dan tanggal pengembalian (dueDate) wajib diisi",
      });
    }

    const borrow = await prisma.borrow.findUnique({
      where: { id: borrowId },
    });

    if (!borrow) {
      return response.status(400).json({
        status: "error",
        message: "Data pinjam tidak ditemukan",
      });
    }

    if (borrow.returnDate) {
      return response.status(400).json({
        status: error,
        message: "Item ini sudah dikembalikan sebelumya",
      });
    }

    const updatedBorrow = await prisma.borrow.update({
      where: { id: borrowIdInt },
      data: {
        returnDate: new Date(dueDate), // Mengubah status menjadi 'returnDate'
      },
    });

    await prisma.barang.update({
      where: { id: updatedBorrow.barangId },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    // if (isNaN(borrowIdInt)) {
    //     return response.status(400).json({
    //         error: "Astagfirullah, borrowId tidak ditemukan, coba masukan data yang sesuai"
    //     })
    // }
    // const borrowDateParsed = new Date (dueDate);
    // if (isNaN(borrowDateParsed.getTime())) {
    //   return response
    //     .status(400)
    //     .json({ error: "Astagfirullah, Format tanggal tidak valid. Anda harus menentukan tanggal pengembalian menggunakan format seperti ini 2024-09-14" });
    // }

    // // Pastikan borrowDate dan dueDate adalah objek Date jika tidak
    // const borrow = await prisma.borrow.findUnique ({
    //     where: {id: borrowIdInt},
    //     include: {
    //         barang: true,
    //         user: true,
    //     }
    // })

    // if (!borrow) {
    //     return response.status(400).json({error:"Maaf... catatan peminjaman tidak ditemukan, mungkin anda bisa memasukkan angka yang lebih masuk akal."})
    // }

    // Update status peminjaman menjadi 'returned' dan set returnDate

    // Update quantity barang setelah dikembalikan
    await prisma.barang.update({
      where: { id: borrow.barangId },
      data: {
        quantity: { increment: 1 }, // Menambahkan 1 ke jumlah barang yang tersedia
      },
    });

    return response.status(200).json({
      status: "SUCCESS",
      message: "ALHAMDULILLAH, Pengembalian berhasil dicatat",
      data: {
        borrowId: updatedBorrow.id,
        userId: borrow.userId,
        barangId: borrow.barangId,
        actual_return_date: updatedBorrow.returnDate, // Menampilkan tanggal pengembalian
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `There is an error: ${error}`,
    });
  }
};

//     const dueDateParsed = new Date(dueDate);

//     if (isNaN(borrowDateParsed.getTime()) || isNaN(dueDateParsed.getTime())) {
//       return response
//         .status(400)
//         .json({ error: "Invalid date format for borrowDate or dueDate." });
//     }

//     const barang = await prisma.barang.findUnique({
//       where: { id: barangIdInt },
//     });

//     if (!barang) {
//       return response.status(404).json({ error: "Barang tidak ditemukan." });
//     }

//     if (barang.quantity <= 0) {
//       return response.status(400).json({ error: "Stok barang habis." });
//     }

//     const borrow = await prisma.borrow.create({
//       data: {
//         userId: userIdInt,
//         barangId: barangIdInt,
//         borrowDate: borrowDateParsed,
//         dueDate: dueDateParsed,
//         returnDate: returnDate ? new Date(returnDate) : null,
//         status: status || "borrowed", // Default status if none provided
//       },
//     });

//     // Update quantity barang
//     await prisma.barang.update({
//       where: { id: barangIdInt },
//       data: {
//         quantity: { decrement: 1 },
//       },
//     });

//     return response.status(200).json({
//       status: "success",
//       message: "Loan successfully recorded",
//       data: {
//         borrowId: borrow.id.toString(),
//         userId: borrow.userId.toString(),
//         barangId: borrow.barangId.toString(),
//         borrowDate: borrow.borrowDate.toISOString(), // Format ISO string
//         dueDate: borrow.dueDate.toISOString(), // Format ISO string
//       },
//     });
//   } catch (error) {
//     return response.status(400).json({
//       status: false,
//       message: `There is an error: ${error}`,
//     });
//   }
// };
