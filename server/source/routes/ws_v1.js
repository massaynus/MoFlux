import { Server } from "socket.io";
import {
  connectToRoom,
  isRoomOwner,
  isUsernameInRoom,
} from "../services/roomService";

const events = ["seek", "changeSource", "pause", "play", "transferOwnership"];

/**
 * configure Socker.io server
 * @param {Server} io io server instance
 */
export default function (io) {
  io.engine.generateId = (req) => {
    return uuid.v4();
  };

  io.on("connection", (socket) => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (isUsernameInRoom(username, room)) {
      socket.emit("usernameTaken", username, room);
      socket.disconnect(true);
      return;
    }

    socket.join(room);
    connectToRoom(username, room);

    socket.to(room).emit("userJoined", username);

    socket.on("disconnect", () =>
      io.to(room).emit("userDisconnected", username)
    );

    for (const event of events)
      socket.on(event, (arg) => {
        if (isRoomOwner(username, room))
          socket.to(room).emit(event, username, arg);
      });
  });
}
