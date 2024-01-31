import React, { createContext, useEffect, useReducer } from "react";
import { ActionType, Todo, TodoAction, TodoContextType } from "../interfaces";
import {
  FILTER_STATUS_TODO_VALUE,
  LOCALSTORATE_KEY_TODOS,
} from "../utils/constants";
import { useLocalStorageState } from "../hooks";
const initialState: TodoContextType = {
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  filterTodo: () => {},
  pickTodo: () => {},
  cancelUpdate: () => {},
  isLoading: false,
  currentTodo: null,
  error: null,
  statusFilter: FILTER_STATUS_TODO_VALUE.ALL,
};
const TodosContext = createContext<TodoContextType>(initialState);

const reducer = (state: TodoContextType, action: TodoAction) => {
  switch (action.type) {
    case ActionType.LOADED_TODOS:
      return { ...state, isLoading: false, todos: action.payload };
    case ActionType.FILTER_TODO:
      return { ...state, statusFilter: action.payload };
    case ActionType.PICK_TODO:
      return { ...state, currentTodo: action.payload };
    case ActionType.REJECTED:
      return { ...state, error: action.payload };
    case ActionType.CANCEL_UPDATE:
      return { ...state, currentTodo: null };
    default:
      throw new Error("Unknown action type");
  }
};

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useLocalStorageState<Todo[]>(
    LOCALSTORATE_KEY_TODOS,
    []
  );
  const [{ isLoading, currentTodo, error, statusFilter }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(
    function () {
      todos.sort((a, b) => {
        if (a.updatedAt !== undefined && b.updatedAt !== undefined) {
          if (a.updatedAt === b.updatedAt) {
            return b.createdAt - a.createdAt;
          }
          return b.updatedAt - a.updatedAt;
        }
        return b.createdAt - a.createdAt;
      });
      dispatch({
        type: ActionType.LOADED_TODOS,
        payload: todos,
      });
    },
    [todos]
  );

  function addTodo(todo: Todo) {
    const newTodos = structuredClone(todos);
    newTodos.push(todo);
    setTodos(newTodos);
  }

  function pickTodo(todo: Todo) {
    dispatch({
      type: ActionType.PICK_TODO,
      payload: todo,
    });
  }

  function deleteTodo(id: number) {
    const newTodos = structuredClone(todos).filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function editTodo(todo: Todo) {
    const id = todo.id;
    const newTodos = structuredClone(todos);
    const indexTodo = newTodos.findIndex((todo) => todo.id === id);
    newTodos[indexTodo] = todo;
    setTodos(newTodos);
    dispatch({ type: ActionType.CANCEL_UPDATE });
  }

  function filterTodo(status: FILTER_STATUS_TODO_VALUE) {
    dispatch({ type: ActionType.FILTER_TODO, payload: status });
  }
  function cancelUpdate() {
    dispatch({ type: ActionType.CANCEL_UPDATE });
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        currentTodo,
        error,
        addTodo,
        deleteTodo,
        editTodo,
        filterTodo,
        pickTodo,
        cancelUpdate,
        statusFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
