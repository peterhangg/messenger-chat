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

  return (
    <Box className={classes.root}>
      <Badge
        badgeContent={unreadMessageCount}
        color="primary"
      ></Badge>
    </Box>
  );
};

export default ChatStatusBadge;
