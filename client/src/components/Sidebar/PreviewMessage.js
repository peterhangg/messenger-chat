import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  previewText: {
    fontSize: 12,
    color: (props) => (props.unread === "true" ? "#000000" : "#9CADC8"),
    letterSpacing: -0.17,
    fontWeight: (props) => (props.unread === "true" ? "bold" : ""),
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
