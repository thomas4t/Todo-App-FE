import React, { useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import Todos from "./components/Todos";
import ClearTodos from "./components/ClearTodos";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

const axios = require("axios").default;

function App() {
  const todos = useSelector((state) => state.todos);
  const loadingTodos = useSelector((state) => state.loadingTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}:8080/todos`, {
      method: "GET",
    })
      .then((Response) => Response.json())
      .then((json) => {
        dispatch({
          type: "SET_TODOS",
          val: json,
        });
        dispatch({
          type: "SET_LOADING_TODOS",
          val: false,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const addTodo = (text) => {
    axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}:8080/todos`, {
        text: text,
      })
      .then((response) => {
        if (response.statusText === "OK") {
          let newTodos = [response.data, ...todos];
          dispatch({
            type: "SET_TODOS",
            val: newTodos,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://${process.env.REACT_APP_BACKEND_URL}:8080/todos/${id}`)
      .then((response) => {
        if (response.statusText === "OK") {
          let filtered = todos.filter((todo) => todo.id !== id);
          dispatch({
            type: "SET_TODOS",
            val: filtered,
          });
        }
      });
  };
  const markTodo = (parTodo) => {
    let urlPerk = "";
    parTodo.completed ? (urlPerk = "incomplete") : (urlPerk = "complete");
    axios
      .post(
        `http://${process.env.REACT_APP_BACKEND_URL}:8080/todos/${parTodo.id}/${urlPerk}`
      )
      .then((response) => {
        if (response.statusText === "OK") {
          let updatedTodos = todos.map((todo) => {
            if (todo.id === parTodo.id) {
              todo.completed = !todo.completed;
            }
            return todo;
          });
          dispatch({
            type: "SET_TODOS",
            val: updatedTodos,
          });
        }
      });
  };
  const onTodoEditSave = (id, val) => {
    axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}:8080/todos/${id}`, {
        text: val,
      })
      .then((response) => {
        if (response.statusText === "OK") {
          let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
              todo.text = val;
            }
            return todo;
          });
          dispatch({
            type: "SET_TODOS",
            val: updatedTodos,
          });
        }
      });
  };

  const clearTodos = () => {
    todos.map((todo) => {
      return axios.delete(
        `http://${process.env.REACT_APP_BACKEND_URL}:8080/todos/${todo.id}`
      );
    });
    dispatch({
      type: "SET_TODOS",
      val: [],
    });
  };

  return (
    <div className="App">
      <AddTodoForm addTodo={addTodo} />
      {loadingTodos ? (
        <p>Loading your todos</p>
      ) : (
        <Todos
          onTodoEditSave={onTodoEditSave}
          markTodo={markTodo}
          deleteTodo={deleteTodo}
        />
      )}
      {todos.length > 1 ? <ClearTodos clearTodos={clearTodos} /> : null}
    </div>
  );
}

export default App;
