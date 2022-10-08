import { Server } from "socket.io";
import {
  connectToRoom,
  disconnectFromRoom,
  getRoomOwner,
  isRoomOwner,
  isUsernameInRoom,
} from "../services/roomService";

const events = ["seek", "changeSource", "pause", "play", "transferOwnership"];

/**
 * configure Socker.io server
 * @param {Server} io io server instance
 */
export default function (io) {
  io.on("connection", (socket) => {
    console.log(new Date(), "\tnew Connection");

    socket.on("credentials", (username, room) => {
      if (isUsernameInRoom(username, room)) {
        socket.emit("usernameTaken", username, room);
        socket.disconnect(true);
        return;
      }

      socket.join(room);
      connectToRoom(username, room);

      socket.to(room).emit("userJoined", username);
      socket.emit("roomOwner", getRoomOwner(room));
      console.log(new Date(), "\t=>", `user ${username} joined room ${room}`);

      socket.on("disconnect", () => {
        const newPotentialOwner = disconnectFromRoom(username, room);

        io.to(room).emit("userDisconnected", username);
        console.log(new Date(), "\t=>", `user ${username} left room ${room}`);

        newPotentialOwner &&
          socket
            .to(room)
            .emit("transferOwnership", username, newPotentialOwner);
      });

      for (const event of events)
        socket.on(event, (arg) => {
          if (isRoomOwner(username, room)) {
            socket.to(room).emit(event, username, arg);
            console.log(
              new Date(),
              "\t=>",
              `emitting event ${event} for user ${username} with arg ${arg}`
            );
          }
        });
    });
  });
}
