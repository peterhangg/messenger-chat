import React, { useEffect, useRef } from "react";
import moment from "moment";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";

const Messages = ({ messages, otherUser, userId }) => {
  const messageBottomRef = useRef(null);

  useEffect(() => {
    messageBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            messageId={message.id}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      <Box ref={messageBottomRef} />
    </Box>
  );
};

export default Messages;
