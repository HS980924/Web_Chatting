import User from '../models/User';

export const read_UserEmail = async (email:string) : Promise<User | null | undefined> => {
    try{
        const userInfo = await User.findOne({
            where: { email:email }
        });
        return userInfo;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const read_UserId = async (user_id: number) =>{
    try{
        const userInfo = await User.findOne({
            where: { user_id:user_id }
        });
        return userInfo;
    }catch(e){
        console.log(e);
        throw e;
    }
}