import React, { useState } from "react";
import { FormControl, FilledInput, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = ({ otherUser, conversationId }) => {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.text.value.trim() === "") return;

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    dispatch(postMessage(reqBody));
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default Input;
