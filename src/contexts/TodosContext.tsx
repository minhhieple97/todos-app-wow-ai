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
    case ActionType.ADD_TODO:
      return { ...state, todos: action.payload };
    case ActionType.FILTER_TODO:
      return { ...state, statusFilter: action.payload };
    case ActionType.EDIT_TODO:
      return { ...state, todos: action.payload };
    case ActionType.DELETE_TODO:
    case ActionType.REJECTED:
      return state;
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

  async function addTodo(todo: Todo) {
    const newTodos = structuredClone(todos);
    newTodos.push(todo);
    setTodos(newTodos);
    dispatch({ type: ActionType.ADD_TODO, payload: newTodos });
  }

  async function deleteTodo(id: number) {}

  async function editTodo(todo: Todo) {
    const id = todo.id;
    const newTodos = structuredClone(todos);
    const indexTodo = newTodos.findIndex((todo) => todo.id === id);
    newTodos[indexTodo] = { ...todo, updatedAt: Date.now() };
    setTodos(newTodos);
    dispatch({ type: ActionType.EDIT_TODO, payload: newTodos });
  }

  async function filterTodo(status: FILTER_STATUS_TODO_VALUE) {
    dispatch({ type: ActionType.FILTER_TODO, payload: status });
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
        statusFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
