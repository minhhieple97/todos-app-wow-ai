import { FILTER_STATUS_TODO_VALUE } from "../utils/constants";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: ExcludeAll<FILTER_STATUS_TODO_VALUE>;
  dueDate?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface Column {
  id: FILTER_STATUS_TODO_VALUE,
  title: string;
  notFoundMessage: string;
  list: Todo[];
  backgroundColor: string;
}

export type ExcludeAll<T> = T extends "all" ? never : T;

type ColumnsDataBase = {
  [key in ExcludeAll<FILTER_STATUS_TODO_VALUE>]: Column;
};

export interface ColumnsData extends ColumnsDataBase {}


export interface TodoState {
  todos: Todo[];
}

export enum ActionType {
  FILTER_TODO = "todo/filter_todos",
  LOADED_TODOS = "todo/loaded_todos",
  PICK_TODO = "todo/pick_todo",
  CANCEL_UPDATE = "todo/cancel_update",
  REJECTED = "rejected",
}

export type TodoAction =
  | { type: ActionType.FILTER_TODO; payload: FILTER_STATUS_TODO_VALUE }
  | { type: ActionType.PICK_TODO; payload: Todo }
  | { type: ActionType.CANCEL_UPDATE; };

export type State = {
  currentTodo: Todo | null;
  statusFilter: FILTER_STATUS_TODO_VALUE;
};


export type TodoContextType = State & {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  pickTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  cancelUpdate: () => void;
  filterTodo: (status: FILTER_STATUS_TODO_VALUE) => void;
  columns:Column[]
};

export type FormTodo = {
  title: string;
  description?: string;
  dueDate?: Date;
};

export type FormTodoEdit = FormTodo & {
  status: ExcludeAll<FILTER_STATUS_TODO_VALUE>;
  createdAt: number;
};
