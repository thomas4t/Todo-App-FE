import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

import EdiText from "react-editext";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import "../css/btnNoOutline.css";

const StyledEdiText = styled(EdiText)`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  input,
  textarea,
  div[editext="view-container"] {
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
    font-weight: ${(props) => (props.completed ? "normal" : "bold")};
  }
  button {
    border: none;
    background: none;
    background-color: none;
    margin-right: 5px;
  }
  button:hover {
    border-radius: 25%;
    background-color: rgba(63, 81, 181, 0.2);
  }
`;

function Todo(props) {
  const todoStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const handleMarkTodo = () => {
    props.markTodo(props.todo);
  };

  let handleTodoEditSave = (val) => {
    props.onTodoEditSave(props.todo.id, val);
  };

  return (
    <td style={todoStyle}>
      <IconButton
        onClick={() => handleMarkTodo()}
        color={props.todo.completed ? "default" : "primary"}
      >
        {" "}
        <CheckCircleOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
      <StyledEdiText
        cancelOnUnfocus
        buttonsAlign="before"
        showButtonsOnHover
        submitOnEnter
        cancelOnEscape
        type="text"
        value={props.todo.text}
        onSave={handleTodoEditSave}
        completed={props.todo.completed}
      />
      <MDBBtn
        type="button"
        onClick={() => props.deleteTodo(props.todo.id)}
        color="danger"
      >
        <MDBIcon size="sm" icon="trash-alt" />
      </MDBBtn>
    </td>
  );
}

export default Todo;
