import { useTodos } from "./useTodos";
import { FormTodo, Todo } from "../interfaces";
export const useDeleteTodo = () => {
  const { deleteTodo } = useTodos();
  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };
  return {
    handleDeleteTodo,
  };
};
