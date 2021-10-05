import { Request, Response } from "express";
import { ResponseHelper } from "../util/response/response-handler";
import { HttpService } from "../services/Http.service";

const sendResponse = ResponseHelper.sendResponse;
export class CountryController {
   static getCountries = async (req:Request, res: Response)=>{
       try{
        let  result = await HttpService.getCountries();
        return sendResponse(
            res,
            200,
            false,
            result,
            "successful"
          );

       }catch(err){
        return sendResponse(res, 500, err);
       }
    
   }
}