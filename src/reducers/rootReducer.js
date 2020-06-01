const initialState = {
  todos: [],
  loadingTodos: true,
  addTodoValue: "",
};

const rootReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_TODOS":
      newState.todos = action.val;
      return newState;
    case "SET_LOADING_TODOS": // maybe make its own reducer which only accepts boolean values
      newState.loadingTodos = action.val;
      return newState;
    case "SET_ADD_TODO_VALUE":
      newState.addTodoValue = action.val;
      return newState;
    default:
      return newState;
  }
};

export default rootReducer;
