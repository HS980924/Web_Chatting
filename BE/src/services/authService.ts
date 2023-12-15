import User from '../models/User';
import { signUpType } from '../types/types';

export const signUpUser = async (body:signUpType) => {
    try{
        const { email, password, username } = body;
        
        const [_, created] = await User.findOrCreate({
            where: { email:email },
            defaults: {
                email: email,
                password: password,
                username: username,
            }
        });

        return created;
    }catch(e){
        console.log(e);
    }
}

export const loginUser = async() => {

}
