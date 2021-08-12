import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatarIcon: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
}));

const MessageReadAvatar = ({ otherUser }) => {
  const classes = useStyles();

  return (
    <Box>
      <Avatar
        className={classes.avatarIcon}
        alt={otherUser.username}
        src={otherUser.photoUrl}
      ></Avatar>
    </Box>
  );
};

export default MessageReadAvatar;
