import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  ActionType,
  ColumnsData,
  ExcludeAll,
  State,
  Todo,
  TodoAction,
  TodoContextType,
} from "../interfaces";
import {
  FILTER_STATUS_TODO_VALUE,
  LOCALSTORATE_KEY_TODOS,
  initialColumnsData,
} from "../utils/constants";
import { useLocalStorageState } from "../hooks";
import { getColumnsByStatus } from "../utils/helpers";
const initialValue: TodoContextType = {
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  filterTodo: () => {},
  pickTodo: () => {},
  cancelUpdate: () => {},
  currentTodo: null,
  statusFilter: FILTER_STATUS_TODO_VALUE.ALL,
  columns: [],
};
const TodosContext = createContext<TodoContextType>(initialValue);

const reducer = (state: State, action: TodoAction) => {
  switch (action.type) {
    case ActionType.FILTER_TODO:
      return { ...state, statusFilter: action.payload };
    case ActionType.PICK_TODO:
      return { ...state, currentTodo: action.payload };
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

  const [columnsData, setColumnsData] =
    useState<ColumnsData>(initialColumnsData);

  const [{ currentTodo, statusFilter }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  useEffect(() => {
    setColumnsData((columnsData) => {
      const newColumsData = structuredClone(columnsData);
      const keys = Object.keys(
        newColumsData
      ) as ExcludeAll<FILTER_STATUS_TODO_VALUE>[];
      for (const key of keys) {
        newColumsData[key].list = todos.filter((todo) => todo.status === key);
      }
      return newColumsData;
    });
  }, [todos]);

  const addTodo = (todo: Todo) => {
    const newTodos = structuredClone(todos);
    newTodos.push(todo);
    setTodos(newTodos);
  };

  const pickTodo = (todo: Todo) => {
    dispatch({
      type: ActionType.PICK_TODO,
      payload: todo,
    });
  };

  const deleteTodo = (id: number) => {
    const newTodos = structuredClone(todos).filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (todo: Todo) => {
    const id = todo.id;
    const newTodos = structuredClone(todos);
    const indexTodo = newTodos.findIndex((todo) => todo.id === id);
    newTodos[indexTodo] = todo;
    setTodos(newTodos);
    dispatch({ type: ActionType.CANCEL_UPDATE });
  };

  const filterTodo = (status: FILTER_STATUS_TODO_VALUE) => {
    dispatch({ type: ActionType.FILTER_TODO, payload: status });
  };
  const cancelUpdate = () => {
    dispatch({ type: ActionType.CANCEL_UPDATE });
  };
  const columns = getColumnsByStatus(statusFilter, columnsData);
  return (
    <TodosContext.Provider
      value={{
        todos,
        currentTodo,
        addTodo,
        deleteTodo,
        editTodo,
        filterTodo,
        pickTodo,
        cancelUpdate,
        statusFilter,
        columns,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
