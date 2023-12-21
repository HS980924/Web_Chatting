import Sequelize from 'sequelize';
import Friends from "../models/Friend";
import User from "../models/User";

export const create_friend = async (friend_id:number ,user_id: number) =>{
    try{
        const friend = await Friends.create({
            friend_id: friend_id,
            user_id: user_id,
        });
        return friend;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const read_myFreinds = async(user_id: number, page: number, size:number) =>{ 
    try{
        const friends = await Friends.findAndCountAll({
            where: { user_id:user_id },
            include: [{
                model: User,
                attributes: {exclude:["password", "createdAt","updatedAt","deletedAt"]},
                required: true,
                on: Sequelize.where(
                    Sequelize.col('Friends.friend_id'),
                    '=',
                    Sequelize.col('User.user_id')
                  )
            }],
            attributes: ['friend_id'],
            offset: page,
            limit: size,
            order: [[User, 'username', 'ASC']],
        });
        return friends
    }catch(e){
        console.log(e);
        throw e;
    }
}