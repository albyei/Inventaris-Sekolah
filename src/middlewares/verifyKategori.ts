import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { describe } from "node:test";


const addDataSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),

})

const EditDataSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional()
})

export const verifyAddKategori = (request: Request, response: Response, next: NextFunction) => {
    console.log("Request body sebelum validasi:", request.body); 
    const {error} = addDataSchema.validate(request.body,{abortEarly: false})
    
    if (error) {
        console.log ("Error validasi Joi:",error.details)
        return response.status(400).json({
            status: false,
            massage: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyUpdateKategori = (request: Request, response: Response, next: NextFunction) => {
    const {error} = EditDataSchema.validate(request.body,{abortEarly: false})
    
    if (error) {
        
        return response.status(400).json({
            status: false,
            massage: error.details.map(it => it.message).join()
        })
    }
    return next()
}

