import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Tipe untuk field yang valid dalam groupBy (category atau location)
type GroupByField = 'category' | 'location';

export const generateUsageReport = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, group_by } = req.body;

    // Pastikan tanggal mulai dan selesai valid
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: "Format tanggal tidak valid. Harap gunakan format YYYY-MM-DD."
      });
    }

    // Validasi agar end_date tidak lebih kecil dari start_date
    if (endDate < startDate) {
      return res.status(404).json({
        error: "end_date tidak boleh lebih kecil dari start_date.",
      });
    }

    // Tentukan groupByField dan validasi inputnya
    const groupByField: GroupByField = group_by === 'category' || group_by === 'location' ? group_by : 'category';

    // Ambil data barang berdasarkan `groupByField` (category atau location)
    const groupedBarang = await prisma.barang.findMany({
      select: {
        [groupByField]: true,
        borrow: {
          where: {
            borrowDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    });

    // Gabungkan data peminjaman berdasarkan `groupByField`
    const analysis = groupedBarang.map((barang) => {
      const borrowData = barang.borrow;

      const totalBorrowed = borrowData.length;
      const totalReturned = borrowData.filter((borrow) => borrow.returnDate !== null).length;
      const itemsInUse = totalBorrowed - totalReturned;

      return {
        group: barang[groupByField], // Menyimpan kategori atau lokasi
        total_borrowed: totalBorrowed, // Jumlah peminjaman
        total_returned: totalReturned, // Jumlah pengembalian
        items_in_use: itemsInUse, // Barang yang masih digunakan
      };
    });

    // Kirim hasil analisis ke client
    return res.status(200).json({
      status: "success",
      data: {
        analysis_period: {
          start_date: start_date,
          end_date: end_date,
        },
        usage_analysis: analysis,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Terjadi kesalahan: ${error}`,
    });
  }
};

export const analyzeBorrowedItems = async (request: Request, response: Response) => {
  try {
    const { start_date, end_date } = request.body;

    // Validasi dan parsing input tanggal
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return response.status(400).json({
        status: "error",
        message: "Astagfirullah, Format tanggal tidak valid. Harap gunakan format 'YYYY-MM-DD'.",
      });
    }

    // Validasi agar end_date tidak lebih kecil dari start_date
    if (endDate < startDate) {
      return response.status(404).json({
        error: "Tanggal selesai tidak bisa lebih kecil dari tanggal mulai.",
      });
    }

    // Barang paling sering dipinjam
    const frequentlyBorrowedItems = await prisma.borrow.groupBy({
      by: ["barangId"],
      _count: { barangId: true },
      where: {
        borrowDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        _count: { barangId: "desc" },
      },
      take: 5,
    });

    // Barang kurang efisien (sering telat dikembalikan)
    const inefficientItems = await prisma.borrow.groupBy({
      by: ["barangId"],
      _count: {
        barangId: true,
        _all: true,
      },
      where: {
        returnDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Gabungkan data barang dari tabel `barang`
    const frequentlyBorrowedData = await Promise.all(
      frequentlyBorrowedItems.map(async (item) => {
        const barang = await prisma.barang.findUnique({
          where: { id: item.barangId },
          select: { name: true, category: true },
        });

        return {
          item_id: item.barangId,
          name: barang?.name || "Unknown",
          category: barang?.category || "Unknown",
          total_borrow: item._count.barangId,
        };
      })
    );

    const inefficientData = await Promise.all(
      inefficientItems.map(async (item) => {
        const barang = await prisma.barang.findUnique({
          where: { id: item.barangId },
          select: { name: true, category: true },
        });

        return {
          item_id: item.barangId,
          name: barang?.name || "Unknown",
          category: barang?.category || "Unknown",
          total_borrowed: item._count._all,
          total_late_returns: item._count.barangId,
        };
      })
    );

    return response.status(200).json({
      status: "success",
      data: {
        analysis_period: {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
        frequently_borrow_items: frequentlyBorrowedData,
        inefficient_items: inefficientData,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: `Internal server error: ${error}`,
    });
  }
};
