import { io } from "socket.io-client";

export const setupSocketIoClient = (clientId: number)=>{
    const clientSocket = io('http://localhost:3000');

    setInterval(()=>{
        clientSocket.emit(`client-${clientId}`, {a:1,b:2});
        console.log("Sending Hello World");
    }, 5000);
}
