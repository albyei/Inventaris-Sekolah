// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { v4 as uuidv4 } from "uuid";
// import { BASE_URL } from "../global";
// import fs from "fs";

// const prisma = new PrismaClient({ errorFormat: "pretty" });

// interface CustomRequest extends Request {
//   user?: {
//     id: string;
//     name: string;
//     username: string;
//     role: string
//   }
// }

// //GET ALL MENU
// export const getAllKategori = async (request: Request, response: Response) => {
//   try {
//     const { search } = request.query;
//     const allKategori = await prisma.kategori.findMany({
//       where: { name: { contains: search?.toString() || "" } },
//     });
//     //Output
//     return response
//       .json({
//         status: true,
//         data: allKategori,
//         massage: `Kategori has retrived`,
//       })
//       .status(200);
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         massage: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };

// //CREATE MENU
// export const createKategori = async (request: Request, response: Response) => {
//   try {
//     const { name, description } = request.body;


//     if (!name || !description) {
//         return response.status(400).json({
//           status: false,
//           message: "All fields (name, description) must be filled",
//         });
//       }

      
//     const newKategori = await prisma.kategori.create({
//       data: {
//         name,
//         description,
//       },
//     });

//     //Output
//     return response
//       .json({
//         status: true,
//         data: newKategori,
//         massage: `New kategori has created`,
//       })
//       .status(200);
//   } catch (error) {
//     console.error("Error saat membuat kategori:", error); 
//     return response
//       .json({
//         status: false,
//         massage: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };

// //UPDATE MENU
// export const updateKategori = async (request: Request, response: Response) => {
//   try {
//     const { id } = request.params;
//     const { name, description } = request.body;

//     const findkategori = await prisma.kategori.findFirst({ where: { id: Number(id) } });
//     if (!findkategori)
//       return response
//         .status(200)
//         .json({ status: false, massage: `id: ${id} is not found` });

   

//     const updateKategori = await prisma.kategori.update({
//       data: {
//         name: name || findkategori.name,
//         description: description || findkategori.description,
//       },
//       where: { id: Number(id) },
//     });
//     return response
//       .json({
//         status: true,
//         data: updateKategori,
//         massage: `Kategori has been updated`,
//       })
//       .status(200);
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         massage: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };

// // //CHANGE PICTURE
// // export const changePicture = async (request: Request, response: Response) => {
// //   try {
// //     const { id } = request.params;
// //     const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
// //     if (!findMenu)
// //       return response
// //         .status(200)
// //         .json({ status: false, massage: `Menu with id ${id} is not found` });

// //     /** default value  filename of  saved data*/
// //     let filename = findMenu.picture;
// //     if (request.file) {
// //       /**update filename by new uploaded picture */
// //       filename = request.file.filename;
// //       /**check the old picture in the folder */
// //       let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
// //       let exist = fs.existsSync(path);
// //       /**delet the old exist picture if reupload new file  */
// //       if (exist && findMenu.picture !== ``) fs.unlinkSync(path);
// //     }

// //     /**process to update picture  in database */
// //     const updatePicture = await prisma.menu.update({
// //       data: { picture: filename },
// //       where: { id: Number(id) },
// //     });
// //     return response
// //       .json({
// //         status: true,
// //         data: updatePicture,
// //         message: `picture has change`,
// //       })
// //       .status(200);
// //   } catch (error) {
// //     return response
// //       .json({
// //         status: false,
// //         massage: `There is an error. ${error}`,
// //       })
// //       .status(400);
// //   }
// // };

// //DELETE MENU
// export const deletekategori = async (request: Request, response: Response) => {
//   try {
//     const { id } = request.params;
//     const findMenu = await prisma.kategori.findFirst({ where: { id: Number(id) } });
//     if (!findMenu)
//       return response
//         .status(200)
//         .json({ status: false, massage: `Kategori with id ${id}  not found` });



//     /**process to delet menu's data */
//     const result = await prisma.kategori.delete({
//       where: { id: Number(request.params.id) },
//     });
//     return response
//       .json({
//         status: true,
//         data: result,
//         massage: `Menu with id ${id} has been Deleted`,
//       })
//       .status(200);
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         massage: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };
