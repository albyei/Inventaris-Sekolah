import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { request } from "node:http";
import { describe } from "node:test";

/** create schema for detail of orderlist */
const addEditSchema = Joi.object({
  name: Joi.string().optional(),
  username: Joi.string().optional(),
  password: Joi.string().min(3).optional(),
  role: Joi.string().valid("admin", "student").optional(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(0).required(),
});

const addDataSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "student",).required(),
});





export const verifyAdduser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addDataSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

export const verifyAuthentification = (
  request: Request,
  response:Response,
  next: NextFunction
) =>{
  const {error} = loginSchema.validate(request.body,{abortEarly:false})

  if (error){
      return response.status(400).json({
          status:false,
          message: error.details.map((it)=> it.message).join()
      })
  }
  return next();
}

export const verifyEdituser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addEditSchema.validate(request.body, { abortEarly: false });
  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};
