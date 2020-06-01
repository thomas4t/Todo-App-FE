import React from "react";
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import { useSelector, useDispatch } from "react-redux";

function AddTodoForm(props) {
  const addTodoValue = useSelector((state) => state.addTodoValue);
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    dispatch({
      type: "SET_ADD_TODO_VALUE",
      val: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTodoValue.length !== 0 && addTodoValue.length < 40) {
      props.addTodo(addTodoValue);
      dispatch({
        type: "SET_ADD_TODO_VALUE",
        val: "",
      });
    }
  };

  const formStyle = {
    width: "400px",
    margin: "20px auto",
    minWidth: "250px",
  };

  return (
    <>
      <form style={formStyle} onSubmit={handleSubmit}>
        <MDBInput
          value={addTodoValue}
          onChange={onInputChange}
          label="What needs to be done?"
          size="lg"
        />
        <MDBBtn className="btn" type="submit" color="primary">
          Add
        </MDBBtn>
      </form>
    </>
  );
}

export default AddTodoForm;
