import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  previewText: {
    fontSize: 12,
    color: ({ unread }) => unread ? theme.palette.black : theme.palette.rockBlue,
    letterSpacing: -0.17,
    fontWeight: ({ unread }) => (unread ? "bold" : ""),
  },
}));

export const PreviewMessage = ({ children, unread, ...props }) => {
  const classes = useStyles({ unread });

  return (
    <Typography {...props} className={classes.previewText}>
      {children}
    </Typography>
  );
};

export default PreviewMessage;
