import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoslice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      // console.log("added")
    },
    getTodos: (state, action) => {
      const retrivetodos = JSON.parse(localStorage.getItem("todos") || "[]");
      state.todos = retrivetodos;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (item) => item.id === action.payload.item.id
      );

      state.todos[todoIndex].task = action.payload.editedText;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    shiftEdit: (state, action) => {
      // console.log(action)

      const todoIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.editMode === false) {
        state.todos[todoIndex].editMode = true;
      } else {
        state.todos[todoIndex].editMode = false;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    completeTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.isCompleted === false) {
        state.todos[todoIndex].isCompleted = true;
      } else {
        state.todos[todoIndex].isCompleted = false;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    reloadFun:(state)=>{
          const newarr = state.todos.map((item)=>{
          return ({
            ...item,
            editMode:false
          })
          })
          console.log(newarr)

      localStorage.setItem("todos", JSON.stringify(newarr));

    }
  },
});

export const { add, getTodos, deleteTodo, editTodo, shiftEdit, completeTodo,reloadFun } =
  todoslice.actions;

export default todoslice.reducer;
