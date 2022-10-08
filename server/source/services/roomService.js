export const roomsOwners = {};
export const roomMembers = {};

export function isRoomOwner(username, room) {
  const owner = roomsOwners[room];
  return owner === username;
}

export function connectToRoom(username, room) {
  if (!roomsOwners[room]) roomsOwners[room] = username;
  if (!roomMembers[room]) roomMembers[room] = new Set();

  roomMembers[room].add(username);
}

export function getRoomOwner(room) {
  return roomsOwners[room];
}

export function disconnectFromRoom(username, room) {
  roomMembers[room].delete(username);

  if (isRoomOwner(username, room)) {
    const nextUser = Array.from(roomMembers[room]).shift();
    transferRoomOwnership(nextUser, room);
    return nextUser;
  }

  return null;
}

export function isUsernameInRoom(username, room) {
  return room in roomMembers && roomMembers[room].has(username);
}

export function transferRoomOwnership(username, room) {
  roomsOwners[room] = username;
}
