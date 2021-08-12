import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    height: "100%",
  },
  chatContainer: {
    padding:"0 1.5em",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    overflow: "scroll",
    width: "100%",
    overflowX: "hidden"
  },
}));

const ActiveChat = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const conversation =
    useSelector(
      (state) =>
        state.conversations &&
        state.conversations.find(
          (conversation) =>
            conversation.otherUser.username === state.activeConversation
        )
    ) || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
