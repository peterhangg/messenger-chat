import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  previewText: {
    fontSize: 12,
    color: (props) =>
      props.unread === 1 ? theme.palette.black : theme.palette.rockBlue,
    letterSpacing: -0.17,
    fontWeight: (props) => (props.unread === 1 ? "bold" : ""),
  },
}));

export const PreviewMessage = ({ children, ...props }) => {
  const classes = useStyles(props);

  return (
    <Typography {...props} className={classes.previewText}>
      {children}
    </Typography>
  );
};

export default PreviewMessage;
