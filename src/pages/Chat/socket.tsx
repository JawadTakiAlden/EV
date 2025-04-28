import { io } from "socket.io-client";

const socket = io("https://api.evolvevw.com", {
  withCredentials: true,
  autoConnect: false,
  port: 8080,
});

export default socket;
