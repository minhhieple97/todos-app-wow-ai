import { FILTER_STATUS_TODO_VALUE } from "../utils/constants";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface TodoState {
  todos: Todo[];
}

export enum ActionType {
  FILTER_TODO = "todo/filter_todos",
  LOADED_TODOS = "todo/loaded_todos",
  ADD_TODO = "todo/add_todo",
  DELETE_TODO = "todo/delete_todo",
  EDIT_TODO = "todo/edit_todo",
  RESET_TODO = "todo/reset_todo",
  REJECTED = "rejected",
}

export type TodoAction =
  | { type: ActionType.FILTER_TODO; payload: FILTER_STATUS_TODO_VALUE }
  | { type: ActionType.RESET_TODO }
  | { type: ActionType.LOADED_TODOS; payload: Todo[] }
  | { type: ActionType.ADD_TODO; payload: Todo[] }
  | { type: ActionType.DELETE_TODO; payload: number }
  | { type: ActionType.EDIT_TODO; payload: Todo[] }
  | { type: ActionType.REJECTED; payload: string };

export type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  filterTodo: (status: FILTER_STATUS_TODO_VALUE) => void;
  isLoading: boolean;
  currentTodo: Todo | null;
  error: string | null;
  statusFilter: FILTER_STATUS_TODO_VALUE
};

export type FormTodo = {
  title: string;
  description?: string;
  dueDate?: Date;
};
