import { Request, Response } from "express";
import { AuthDto } from "../dto/auth.dto";
import { generateAuthToken } from "../util/generateAuthToken";
import { ResponseHelper } from "../util/response/response-handler";
import bcrypt from "bcrypt"
import { AuthService } from "../services/Auth.service";

const sendResponse = ResponseHelper.sendResponse;
export class AuthController {
    static register = async (req:Request, res: Response)=>{
        try{
        const { name, email, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let save_data: AuthDto = {
          name,
          email,
          password: hash
        };
      
        if(await AuthService.checkIfEmailExists(email)){
          return sendResponse(
            res,
            403,
            true,
            false,
            "User already exists"
          );

        }
        let created: any = await AuthService.createUser(save_data);
        
        return sendResponse(
          res,
          201,
          false,
          created,
          "User successful"
        );
  
        }catch(err){
          console.log(err)
          return sendResponse(res, 500, err);
        }
  
      }

      static login = async(req:Request, res: Response)=>{
        try{
          const {email, password } = req.body;

          let result = await AuthService.getUser(email);
          if(!result){
            return sendResponse(
              res,
              403,
              true,
              false,
              "User not found"
            );

          }
          const validPassword = await bcrypt.compare(password, result.password);
          delete result.password;
          if(validPassword){
            let token = await generateAuthToken({email: result.email, name:result.name});
            return sendResponse(
              res,
              200,
              false,
              {...result, token},
              "User successful"
            );
          }else{
            return sendResponse(
              res,
              403,
              true,
              false,
              "Password incorrect"
            );
          }

        }catch(err){
          console.log(err)
          return sendResponse(res, 500, err);
        }
      }
}