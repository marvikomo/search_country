import { getConnection, getConnectionManager, getRepository, getManager } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import {User} from "../entity/User"

export class AuthService {

  public static createUser = async (post: AuthDto):Promise<AuthDto> => {
    const AuthRepository = getManager().getRepository(User);
    let newPost = await AuthRepository.save(post);

    return newPost;
   
  } 

  public static getUser = async (email:string):Promise<any> => {
    const AuthRepository = getManager().getRepository(User);
    return  await AuthRepository.findOne({email});
  }


  public static checkIfEmailExists = async (email) => {
    const AuthRepository = getManager().getRepository(User);
    return  await AuthRepository.findOne({email});
  }


}