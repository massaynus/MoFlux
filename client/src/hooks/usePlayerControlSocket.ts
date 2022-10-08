import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import {
  selectRoom,
  selectUsername,
  setCurrentTime,
  setPlaybackState,
  setSource,
} from "../features/player/playerSlice";

const socket = io("http://localhost:7000/", { path: "/ws" });
const events = ["seek", "changeSource", "pause", "play", "transferOwnership"];

export function usePlayerControlSocket() {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(socket.connected);

  const username = useAppSelector(selectUsername);
  const room = useAppSelector(selectRoom);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));

    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on("seek", (username, arg) => {
      dispatch(setCurrentTime(parseInt(arg)));
      console.log(`user ${username} dispatched a seek to ${arg}`);
    });

    socket.on("changeSource", (username, arg) => dispatch(setSource(arg)));

    socket.on("pause", (username) => dispatch(setPlaybackState("paused")));

    socket.on("play", (username) => dispatch(setPlaybackState("started")));

    socket.on("transferOwnership", (username, arg) => {});

    return () => {
      events.map((event) => socket.off(event));
    };
  }, [dispatch, room, username]);

  useEffect(() => {
    isConnected && socket.emit("credentials", username, room);
  }, [isConnected, room, username]);

  const seek = (time: number) => socket.emit("seek", time);
  const changeSource = (source: string) => socket.emit("changeSource", source);
  const pause = () => socket.emit("pause");
  const play = () => socket.emit("play");
  const transferOwnership = (owner: string) =>
    socket.emit("transferOwnership", owner);

  return {
    socket,
    isConnected,
    seek,
    changeSource,
    transferOwnership,
    pause,
    play,
  };
}
