import { Request, Response } from "express";
import { Prisma, PrismaClient, Role } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, SECRET } from "../global";
import fs from "fs";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { request } from "http";

const prisma = new PrismaClient();

export const getAlluser = async (request: Request, response: Response) => {
  try {
    const {search} = request.query
    const getUser = await prisma.user.findMany({
      where: {name: {contains: search?.toString() || ""  }}
    })
    return response
      .json({
        status: true,
        data: getUser,
        message: `The user has been taken`
      })
      .status(200)
  }catch (error) {
    return response
      .json({
        status: false,
        massage: ` Validasi Query Parameter`
      })
      .status(400)
  }
}



//  export const getAlluser = async (req: Request, res: Response) => {
//   const { role } = req.query;

//   // Validasi role yang diterima sesuai dengan enum Role
//   const roleEnum = Object.values(Role).includes(role as Role)
//     ? (role as Role)
//     : undefined;

//   try {
//     if (roleEnum) {
//       // Jika role valid, ambil data user berdasarkan role
//       const allUser = await prisma.user.findMany({
//         where: {
//           role: roleEnum, // Gunakan roleEnum yang sudah divalidasi
//         },
//       });
//       return res.json({
//         status: true,
//         data: allUser,
//         message: `User retrieved successfully`,
//       }); // Kirim data pengguna dalam bentuk JSON
//     } else {
//       return res.status(400).json({
//         status: false,
//         message: 'Invelid Role'
//       }); // Role tidak valid
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return res.status(500).json({
//       status: false,
//       message: 'Failed to fetch users'
//      }); // Jika ada error pada query
//   }
// };

// export default { getAlluser };

// const getUsers = async (req: Request, res: Response) => {
//   const { role } = req.query;

//   // Check if the role is a valid value from the Role enum
//   const roleEnum = Object.values(Role).includes(role as Role) ? (role as Role) : undefined;

//   try {
//     if (roleEnum) {
//       // If the role is valid, use it in the query
//       const allUser = await Prisma.user.findMany({
//         where: {
//           role: roleEnum,  // Use the validated roleEnum
//         },
//       });
//       return res.json(allUser);
//     } else {
//       // If the role is not valid, return an error or default users
//       return res.status(400).json({ error: 'Invalid role' });
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return res.status(500).json({ error: 'Failed to fetch users' });
//   }
// };

// export default { getUsers };

// export const getAlluser = async (request: Request, response: Response) => {
//   try {
//     const { search,Role } = request.query;

//     if (role && ! ['admin','student'].includes(role.toString())) {
//       return response.status(400).json({
//         status: false,
//         message: 'Invalid role Value'
//       })
//     }

//     const allUser = await prisma.user.findMany({
//       where: {
//         name: {contains: search?.toString() || ''},
//         role: Role? Role.toString(): undefined,
//       }

//     });

//     console.log("Found user:",allUser)

//     return response
//       .json({
//         status: true,
//         data: allUser,
//         message: `User has retrieved`,
//       })
//       .status(200);
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         message: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, username, password, role } = request.body;
    const uuid = uuidv4();

    const validRoles = ["admin", "student"];
    if (role && !validRoles.includes(role)) {
      return response.status(400).json({ message: "Invalid role provided" });
    }

    const newUser = await prisma.user.create({
      data: { uuid, name, username, password: md5(password), role },
    });

    return response
      .json({
        status: true,
        data: newUser,
        message: `New User has created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `username is already in use, please use another username`,
      })
      .status(400);
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, username, password, role } = request.body;

    const findUser = await prisma.user.findFirst({
      where: { id: Number(id) },
    });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: `User is not found` });

    const updateUser = await prisma.user.update({
      data: {
        name: name || findUser.name,
        username: username || findUser.username,
        password: password ? md5(password) : findUser.password,
        role: role || findUser.role,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updateUser,
        message: `User has updated`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `username is already in use, please use another username`,
      })
      .status(400);
  }
};

// export const changeProfile = async (request:Request, response:Response)=>{
//   try {
//       const {id} = request.params
//       const findUser = await prisma.user.findFirst({where: {id: Number(id)}})
//       if (!findUser)return response
//       .status(200).json({ status: false, massage:`User with id ${id} is not found`})

//       /** default value  filename of  saved data*/
//       let filename = findUser.profile_picture
//       if (request.file) {
//           /**update filename by new uploaded picture */
//           filename = request.file.filename
//           /**check the old picture in the folder */
//           let path = `${BASE_URL}/../public/profile_picture/${findUser.profile_picture}`
//           let exist = fs.existsSync(path)
//           /**delet the old exist picture if reupload new file  */
//           if (exist && findUser.profile_picture !==``) fs.unlinkSync(path)
//       }

//       /**process to update picture  in database */
//       const  updateProfile = await prisma.user.update ({
//           data:{profile_picture:filename},
//           where: {id: Number(id)}
//           })
//           return response.json({
//               status: true,
//               data:updateProfile,
//               message:`picture has change`
//           }).status(200)

//   } catch (error) {
//       return response.json({
//           status: false,
//           massage:`There is an error. ${error}`
//           }).status(400)
//   }
// }

// export const deleteUser = async(request:Request, response:Response) =>{
//     try {
//         const {id} = request.params
//         const findUser = await prisma.user.findFirst({where: {id: Number(id)}})
//         if (!findUser)return response
//         .status(200).json({ status: false, massage:`User with id ${id} not found`})

//         /**check the old picture in the folder */
//         let path = `${BASE_URL}/../public/profil_picture/${findUser.profile_picture}`
//         let exist = fs.existsSync(path)
//         /**delete the old exist picture if reupload new file  */
//         if (exist && findUser.profile_picture !==``) fs.unlinkSync(path)

//         /**process to delet User's data */
//         const result = await prisma.user.delete({
//             where:{ id: Number(request.params.id)}
//         })
//         return response.json({
//             status: true,
//             data: result,
//             massage: `User with id ${id} has been Deleted`
//         }).status(200)

//     } catch (error) {
//         return response.json({
//         status: false,
//         massage:`There is an error. ${error}`
//         })
//         .status(400)
//     }
// }

//AUTHENTIFICATION USER
export const authentification = async (
  request: Request,
  response: Response
) => {
  try {
    const { username, password } = request.body;

    const findUser = await prisma.user.findFirst({
      where: { username, password:md5(password) },
    });

    if (!findUser)
      return response.status(200).json({
        status: false,
        logged: false,
        message: `Email or password is invalid`,
      });

    let data = {
      id: findUser.id,
      name: findUser.name,
      username: findUser.username,
      role: findUser.role,
    };

    let payload = JSON.stringify(data);

    let token = sign(payload, SECRET || "token");

    return response
      .status(200)
      .json({ status: true, logged: true, message: `Login Success`, token });
  } catch (error) {
    return response
      .json({
        status: false,
        massage: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, massage: `User with id ${id} not found` });

    /**process to delet User's data */
    const result = await prisma.user.delete({
      where: { id: Number(request.params.id) },
    });
    return response
      .json({
        status: true,
        data: result,
        massage: `User with id ${id} has been Deleted`,
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
