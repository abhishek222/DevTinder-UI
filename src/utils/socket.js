import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

export const createSocketConnection = () => {
  const socket = io(BASE_URL, {
    withCredentials: true,
  });
  return socket;
};
