import User from '../models/User';

export const read_UserEmail = async (email:string) => {
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

export const create_User = async (body: any) => {
    try{
        const createUser = await User.create({
            email: body.email,
            password: body.password,
            username: body.username,
        });
        return createUser;
    }catch(e){
        throw e;
    }
}

export const findOrCreate_User = async (body: any) => {
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
        throw e;
    }
}