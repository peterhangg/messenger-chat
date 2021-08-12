import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import MessageReadAvatar from "./MessageReadAvatar";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
}));

const SenderBubble = ({ time, text, otherUser, messageId }) => {
  const conversation = useSelector(
    (state) =>
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      )
  );
  const lastReadMessageId = conversation?.lastReadMessage?.id;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {lastReadMessageId === messageId && (
        <MessageReadAvatar otherUser={otherUser} />
      )}
    </Box>
  );
};

export default SenderBubble;
