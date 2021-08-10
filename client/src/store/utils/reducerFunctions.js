export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  //  non existing conversation between the 2 users
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMessageCount: 1,
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.unreadMessageCount =
        message.senderId === convoCopy.otherUser.id
          ? convoCopy.unreadMessageCount + 1
          : 0;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateReadMessageStatusInStore = (
  state,
  conversationId,
  messages,
  lastReadMessage,
  userId,
) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = messages;
      if (userId !== convo.otherUser.id) {
        convoCopy.unreadMessageCount = 0;
        convoCopy.lastReadMessage = lastReadMessage;
      } else {
        const userReadMessages = convoCopy.messages.filter(
          (message) => message.senderId !== userId && message.read
        );
        const userLastReadMessage =
          userReadMessages[userReadMessages.length - 1];
        convoCopy.lastReadMessage = userLastReadMessage;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};
