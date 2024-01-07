import express from 'express'
import http from "http";
import { Server, Socket } from "socket.io";
import Chatting from '../models/Chatting';
import Room from '../models/Room';
import Participant from '../models/Participant';
import { Op } from 'sequelize';

export const Websocket = ( server:http.Server, app: express.Application ) => {
    const io = new Server(server, { path: '/webchat' });
    app.set('io',io);

    // const room = io.of('room');
    // const chat = io.of('chat');

    io.on("connection", (socket) => {
        const req = socket.request;
        const ip:string | string[] | undefined = req.headers['x-forwarded-for'];
        console.log("New client connection!", ip, socket.id);
        disconnect(socket, ip);
        error(socket);
        creaet_message(socket, io);
        read_message(socket, io);
    });
};

const disconnect = (socket: Socket, ip:string | string[] | undefined) => {
    socket.on('disconnect',()=>{
        console.log("Client disconnection", ip, socket.id);
    });
};

const error = (socket: Socket) => {
    socket.on('error', (error)=>{
        console.error(error);
    });
};

/** 실시간 채팅 보내기 */
const creaet_message = (socket: Socket, io: Server) => {
    socket.on('message', async (req) => {
        const { room_id, user_id, message } = req;

        const not_read_userCnt = await Participant.count({where: {room_id}});

        const newMessage = await Chatting.create({
            room_id,
            user_id,
            message,
            not_read_userCnt: not_read_userCnt-1,
        });

        await Room.update(
            { last_message: message },
            { where: { room_id }}
        );

        await Participant.increment({not_read_messageCnt: 1},{
            where: {
                room_id: room_id,
                user_id: { [Op.not] : user_id } 
            }
        });

        const roomId = (room_id).toString();
        
        io.to(roomId).emit('message',newMessage);
        
    });
};

/** 실시간 채팅 읽기 */
const read_message = (socket: Socket, io: Server)=> {
    socket.on('read', async (req) => {
        const { room_id, user_id, last_chat_id ,recent_chat_id } = req;
        
        const readChatting = await Chatting.decrement({ not_read_userCnt: 1 },{
            where: {
                room_id: room_id,
                chat_id: {
                    [Op.gt] : last_chat_id,
                    [Op.lte] : recent_chat_id
                },
                not_read_userCnt: { [Op.gt] : 0 }   
            }
        });

        await Participant.update({
            not_read_messageCnt: 0,
            last_read_messageId: recent_chat_id,
        },{
            where: {
                room_id: room_id,
                user_id: user_id,
            }
        });

        const roomId = (room_id).toString();
        io.to(roomId).emit("readChat", readChatting);

    });
}

