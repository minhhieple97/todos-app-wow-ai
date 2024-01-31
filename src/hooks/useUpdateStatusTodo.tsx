import { useTodos } from ".";
import { Todo } from "../interfaces";

export const useUpdateStatusTodo = () => {
  const { todos, editTodo, statusFilter } = useTodos();
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const handleUpdate = (todo: Todo) => {
    editTodo(todo);
  };
  return {
    handleUpdate,
    pendingTodos,
    completedTodos,
    statusFilter,
  };
};
