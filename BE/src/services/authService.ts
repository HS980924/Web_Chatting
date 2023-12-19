import User from '../models/User';
import { signUpType, loginType } from '../types/types';
import bcrypt from "bcrypt";

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

export const readEmail = async() => {
    
}

export const loginUser = async(body:loginType) => {
    try{
        const { email, password } = body;

        const userInfo = await User.findOne({where: {email: email}});
        if(userInfo){
            const checkPassword = await bcrypt.compare(userInfo.password, password);

            if(checkPassword){
                // 등록 성공
                console.log("로그인 성공");
            }else{
                // 비밀번호가 일치하지 않음
                console.log("비밀번호 일치 x");
            }

        }
        // 등록되지 않은 이메일입니다.
        return 
    }catch(e){
        console.log(e);
    }
}
