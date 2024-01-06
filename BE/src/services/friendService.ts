import Sequelize, { Op } from 'sequelize';
import Friends from "../models/Friend";
import User from "../models/User";

export const create_friend = async (friend_id:number ,user_id: number, friend_name:string) =>{
    try{
        const friend = await Friends.create({
            friend_id: friend_id,
            user_id: user_id,
            friend_name: friend_name,
        });
        return friend;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const check_myFriend = async(user_id:number, friend_id:number) => {
    try{
        const friend = await Friends.findOne({
            where: {
                user_id: user_id,
                friend_id: friend_id,
            },
        });
        return friend;
    }catch(e){
        throw e;
    }
}

export const read_myFriend = async(user_id:number, friend_id:number) => {
    try{
        const friend = await Friends.findOne({
            where: {
                user_id: user_id,
                friend_id: friend_id,
            },
            include: [{
                model: User,
                attributes: ["email", "profileImgUrl","backgroundImgUrl","introduce"],
            }],
            attributes: ["friend_id", "friend_name"]
        });
        return friend;
    }catch(e){
        throw e;
    }
}
export const read_myFreinds = async(user_id: number, page: number, size:number) =>{ 
    try{
        const friends = await Friends.findAndCountAll({
            where: { user_id:user_id },
            include: [{
                model: User,
                attributes: ["email", "profileImgUrl", "backgroundImgUrl", "introduce"],
                required: true,
                on: Sequelize.where(
                    Sequelize.col('Friends.friend_id'),
                    '=',
                    Sequelize.col('User.user_id')
                  )
            }],
            attributes: ['friend_id', 'friend_name'],
            offset: page,
            limit: size,
            order: [[User, 'username', 'ASC']],
        });
        return friends
    }catch(e){
        console.log(e);
        throw e;
    }
};

export const read_recommendFriend = async(user_id: number) =>{ 
    try{

        const friendList = await Friends.findAll({
            where: {user_id: user_id},
            attributes: ['friend_id'],
        }); 

        const friends = friendList.map(data => data.friend_id);

        const recommendFriends = await User.findAndCountAll({
            where : { user_id: { [Op.notIn] : friends }},
            attributes: ["user_id", "username", "profileImgUrl", "introduce"],
            order: [['username', 'ASC']]
        });
        return recommendFriends;

    }catch(e){
        console.log(e);
        throw e;
    }
}