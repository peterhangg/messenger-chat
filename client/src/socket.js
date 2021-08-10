import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateMessageStatusAsRead,
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const socket = io(window.location.origin, {
  auth: { token },
});

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
});

export default socket;
