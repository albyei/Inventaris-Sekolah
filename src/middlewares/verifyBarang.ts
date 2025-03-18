// import { Category } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/** Schema untuk validasi tambah/edit produk */
export const addBarangSchema = Joi.object({
  name: Joi.string().min(3).required(),
  category: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  location: Joi.string().required(),
});

export const EditBarangSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  category: Joi.string().optional(),
  quantity: Joi.number().integer().min(0).optional(),
  location: Joi.string().optional(),
});


/** Middleware untuk validasi tambah produk */
export const verifyAddProduct = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addBarangSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

/** Middleware untuk validasi edit produk */
export const verifyEditProduct = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = EditBarangSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(" "),
    });
  }
  return next();
};

