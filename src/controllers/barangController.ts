import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Menambahkan Produk */
export const createBarang = async (request: Request, response: Response) => {
  try {
    const { name, category, location, quantity } = request.body;

    //validasi input
    if (!name || !category || !location || !quantity || isNaN(quantity)) {
      return response.status(400).json({
        error: `Invalid input data,All fields are required and must be valid.`,
      });
    }

    // Buat produk baru
    const barang = await prisma.barang.create({
      data: {
        name,
        category,
        location,
        quantity: parseInt(quantity, 10),
      },
    });

    return response.status(200).json({
      status: "success",
      message: "successfully created item",
      data: barang,
    });
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

/** Mengupdate Produk */
export const updateBarang = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, category, location, quantity } = request.body;

    const findBarang = await prisma.barang.findFirst({
      where: { id: Number(id) },
    });
    if (!findBarang)
      return response
        .status(200)
        .json({ status: false, message: `Items is not found` });

    const updateBarang = await prisma.barang.update({
      data: {
        name: name || findBarang.name,
        category: category || findBarang.category,  
        location: location || findBarang.location,
        quantity: quantity || findBarang.quantity,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: "success",
        data: updateBarang,
        message: "successfully updated item",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

/** Menghapus Produk */
export const deleteBarang = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    // Periksa apakah produk ada
    const existingProduct = await prisma.barang.findUnique({
      where: { id: Number(id) },
    });
    if (!existingProduct) {
      return response.status(404).json({ message: "Item not found" });
    }

    // Hapus produk
    await prisma.barang.delete({ where: { id: Number(id) } });

    return response.status(200).json({ message: "Item successfully deleted" });
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const getAllBarang = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const getBarang = await prisma.barang.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    //Output
    return response
      .json({
        status: true,
        data: getBarang,
        massage: `the item has been taken`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        massage: `There is an error. ${error}`,
      })
      .status(400);
  }
};
