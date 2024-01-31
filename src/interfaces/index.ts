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
  PICK_TODO = "todo/pick_todo",
  CANCEL_UPDATE = "todo/cancel_update",
  REJECTED = "rejected",
}

export type TodoAction =
  | { type: ActionType.FILTER_TODO; payload: FILTER_STATUS_TODO_VALUE }
  | { type: ActionType.LOADED_TODOS; payload: Todo[] }
  | { type: ActionType.PICK_TODO; payload: Todo }
  | { type: ActionType.REJECTED; payload: string }
  | { type: ActionType.CANCEL_UPDATE; };

export type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  pickTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  cancelUpdate: () => void;
  filterTodo: (status: FILTER_STATUS_TODO_VALUE) => void;
  isLoading: boolean;
  currentTodo: Todo | null;
  error: string | null;
  statusFilter: FILTER_STATUS_TODO_VALUE;
};

export type FormTodo = {
  title: string;
  description?: string;
  dueDate?: Date;
};

export type FormTodoEdit = FormTodo & {
  completed: boolean;
  createdAt: number;
};
