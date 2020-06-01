import React from "react";
import Todo from "./Todo";
import { MDBTable, MDBTableBody } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function Todos(props) {
  const todos = useSelector((state) => state.todos);

  const todosStyle = {
    width: "500px",
    margin: "auto",
    padding: "25px",
    textAlign: "left",
  };
  const renderTodos = () => {
    return (
      <MDBTable hover style={todosStyle}>
        <MDBTableBody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <Todo
                  onTodoEditSave={props.onTodoEditSave}
                  todo={todo}
                  deleteTodo={props.deleteTodo}
                  markTodo={props.markTodo}
                />
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    );
  };
  return todos.length === 0 ? "Add some todos:)" : renderTodos();
}
export default Todos;
