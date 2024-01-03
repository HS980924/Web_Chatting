import http from "http";
import { Server } from "socket.io";

export const Websocket = ( server:http.Server, app: Express.Application ) => {
    const io = new Server(server, { path: '/webchat' });

    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'];
        console.log("New client connection!", ip, socket.id);
        socket.on('disconnect',()=>{
            console.log("Client disconnection", ip, socket.id);
            // clearInterval(socket.interval);
        });
        socket.on('error', (error)=>{
           console.error(error); 
        });

    });
};