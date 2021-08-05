import React from "react";
import { Box, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(6),
  },
}));

const ChatStatusBadge = ({ unreadMessageCount }) => {
  const classes = useStyles();
  // TODO
  // - badgeContent reflect # of unread messages
  // - Currently has a hardcoded value of '12'
  return (
    <Box className={classes.root}>
      <Badge badgeContent={unreadMessageCount} color="primary"></Badge>
    </Box>
  );
};

export default ChatStatusBadge;
