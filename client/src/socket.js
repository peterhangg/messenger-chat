import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateMessageStatusAsRead,
} from "./store/conversations";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const socket = io(API_URL, { autoConnect: false });

socket.on("connect", () => {
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("read-messages", (data) => {
    store.dispatch(
      updateMessageStatusAsRead(
        data.conversationId,
        data.messages,
        data.lastReadMessage,
        data.userId
      )
    );
  });
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

export default socket;
