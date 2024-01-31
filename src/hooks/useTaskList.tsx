import { useTodos } from ".";
import { Todo } from "../interfaces";

export const useUpdateTodo = () => {
  const { todos, filterTodo, editTodo } = useTodos();
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const handleUpdate = (todo: Todo) => {
    editTodo(todo);
  };
  return {
    handleUpdate,
    pendingTodos,
    completedTodos,
  };
};
