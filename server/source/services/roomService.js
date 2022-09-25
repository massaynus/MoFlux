export const roomsOwners = {};
export const roomMembers = {};

export function isRoomOwner(username, room) {
  return roomsOwners[room] === username;
}

export function connectToRoom(username, room) {
  if (!roomsOwners[room]) roomsOwners[room] = username;
  if (!roomMembers[room]) roomMembers[room] = new Set();

  roomMembers[room].add(username);
}

export function isUsernameInRoom(username, room) {
  return room in roomMembers && roomMembers[room].has(username);
}

export function transferRoomOwnership(username, room) {
  roomsOwners[room] = username;
}
