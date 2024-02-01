import React, { createContext, useReducer } from "react";
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
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  filterTodo: () => {},
  pickTodo: () => {},
  cancelUpdate: () => {},
  moveTodo: () => {},
  currentTodo: null,
  statusFilter: FILTER_STATUS_TODO_VALUE.ALL,
  columns: [],
  columnsData: initialColumnsData,
  setColumnsData: () => {},
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
  const [columnsData, setColumnsData] = useLocalStorageState<ColumnsData>(
    LOCALSTORATE_KEY_TODOS,
    initialColumnsData
  );

  const [{ currentTodo, statusFilter }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  const addTodo = (todo: Todo) => {
    const newColumsData = structuredClone(columnsData);
    const pendingTodos = newColumsData.pending.list;
    pendingTodos.push(todo);
    setColumnsData(newColumsData);
  };

  const pickTodo = (todo: Todo) => {
    dispatch({
      type: ActionType.PICK_TODO,
      payload: todo,
    });
  };

  const deleteTodo = (
    id: number,
    status: ExcludeAll<FILTER_STATUS_TODO_VALUE>
  ) => {
    const newColumsData = structuredClone(columnsData);
    const newTodos = newColumsData[status].list.filter(
      (todo) => todo.id !== id
    );
    newColumsData[status].list = newTodos;
    setColumnsData(newColumsData);
  };

  const editTodo = (todo: Todo) => {
    const id = todo.id;
    const newColumsData = structuredClone(columnsData);
    const todos = newColumsData[todo.status].list;
    const indexTodo = todos.findIndex((todo) => todo.id === id);
    todos[indexTodo] = todo;
    setColumnsData(newColumsData);
    dispatch({ type: ActionType.CANCEL_UPDATE });
  };

  const moveTodo = (
    id: number,
    statusStart: ExcludeAll<FILTER_STATUS_TODO_VALUE>,
    statusEnd: ExcludeAll<FILTER_STATUS_TODO_VALUE>
  ) => {
    const newColumsData = structuredClone(columnsData);
    const todosStart = newColumsData[statusStart].list;
    const todosEnd = newColumsData[statusEnd].list;
    const todo = todosStart.find((todo) => todo.id === id)!;
    todo.status = statusEnd;
    todosEnd.push(todo);
    newColumsData[statusStart].list = todosStart.filter(
      (todo) => todo.id !== id
    );
    newColumsData[statusEnd].list = todosEnd;
    setColumnsData(newColumsData);
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
        currentTodo,
        addTodo,
        deleteTodo,
        editTodo,
        filterTodo,
        pickTodo,
        cancelUpdate,
        statusFilter,
        columns,
        columnsData,
        setColumnsData,
        moveTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
