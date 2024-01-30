export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface TodoState {
  todos: Todo[];
}

export enum ActionType {
  LOADING = "loading",
  LOADED_TODOS = "todo/loaded_todos",
  ADD_TODO = "todo/add_todo",
  DELETE_TODO = "todo/delete_todo",
  EDIT_TODO = "todo/edit_todo",
  REJECTED = "rejected",
}

export type TodoAction =
  | { type: ActionType.LOADING}
  | { type: ActionType.LOADED_TODOS; payload: Todo[] }
  | { type: ActionType.ADD_TODO; payload: Todo }
  | { type: ActionType.DELETE_TODO; payload: number }
  | { type: ActionType.EDIT_TODO; payload: Todo }
  | { type: ActionType.REJECTED; payload: string };

export type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  isLoading: boolean;
  currentTodo: Todo | null;
  error: string | null;
};
