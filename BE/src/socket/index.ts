import express from 'express'
import http from "http";
import { Server, Socket } from "socket.io";
import Chatting from '../models/Chatting';
import Room from '../models/Room';
import Participant from '../models/Participant';

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

const creaet_message = (socket: Socket, io: Server) => {
    socket.on('message', async (req) => {
        const { room_id, user_id, message, not_read_userCnt } = req;
        const newMessage = await Chatting.create({
            room_id,
            user_id,
            message,
            not_read_userCnt,
        });

        await Room.update(
            { last_message: message },
            { where: { room_id }}
        );

        const roomId = (room_id).toString()
        
        io.to(roomId).emit('message',newMessage);
        
    });
};

const read_message = (socket: Socket, io: Server)=> {
    socket.on('read', async (req) => {
        const { room_id, user_id,  } = req;
    });
}

