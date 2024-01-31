import { useTodos } from "./useTodos";
import { FormTodoEdit, Todo } from "../interfaces";
export const useEditTodo = () => {
  const { editTodo } = useTodos();
  const handleEditTodo = (id: number, todo: FormTodoEdit) => {
    const { title, description, dueDate, completed, createdAt } = todo;
    const updateTodo: Todo = {
      id,
      title,
      description,
      completed,
      createdAt,
      updatedAt: Date.now(),
    };
    if (dueDate) updateTodo.dueDate = dueDate.toString();
    editTodo(updateTodo);
  };
  return {
    handleEditTodo,
  };
};
