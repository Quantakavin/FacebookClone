import { createContext } from 'react';
import { io } from "socket.io-client";
import config from '../config/config';

export const socket = io.connect(config.serverURL);
export const SocketContext = createContext();