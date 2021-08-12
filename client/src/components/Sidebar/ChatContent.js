import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatStatusBadge from "./ChatStatusBadge";
import PreviewMessage from "./PreviewMessage";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();
  const { latestMessageText, otherUser, unreadMessageCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <PreviewMessage unread={unreadMessageCount > 0}>
          {latestMessageText}
        </PreviewMessage>
      </Box>
      {unreadMessageCount > 0 && (
        <ChatStatusBadge unreadMessageCount={unreadMessageCount} />
      )}
    </Box>
  );
};

export default ChatContent;
