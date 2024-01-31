import { useTodos } from "./useTodos";
import { FormTodo, Todo } from "../interfaces";
export const useAddTodo = () => {
  const { addTodo } = useTodos();
  const handleCreateTodo = (formTodo: FormTodo) => {
    const { title, description, dueDate } = formTodo;
    const todo: Todo = {
      title,
      description,
      id: Date.now(),
      completed: false,
      createdAt: Date.now(),
    };
    if (dueDate) todo.dueDate = dueDate.toISOString();
    addTodo(todo);
  };
  return {
    handleCreateTodo,
  };
};
