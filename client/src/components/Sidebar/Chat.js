import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { setActiveChat } from "../../store/activeConversation";
import { updateMessageStatus } from "../../store/utils/thunkCreators";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  },
}));

const Chat = ({ conversation }) => {
  const dispatch = useDispatch();
  const otherUser = conversation.otherUser;
  const classes = useStyles();

  const handleClick = async (conversation) => {
    const reqBody = {
      conversationId: conversation.id,
      otherUserId: conversation.otherUser.id,
    };
    await dispatch(setActiveChat(conversation.otherUser.username));
    // Update message status only if conversation between the 2 users already exist
    if (conversation.messages?.length > 0) {
      await dispatch(updateMessageStatus(reqBody));
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

export default Chat;
