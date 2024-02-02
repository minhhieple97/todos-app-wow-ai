import { useTodosContext } from "../contexts";
import { FormTodoEdit, Todo } from "../interfaces";
export const useEditTodo = () => {
  const { editTodo } = useTodosContext();
  const handleEditTodo = (id: number, todo: FormTodoEdit) => {
    const { title, description, dueDate, status, createdAt } = todo;
    const updateTodo: Todo = {
      id,
      title,
      description,
      createdAt,
      status,
      updatedAt: Date.now(),
    };
    if (dueDate) updateTodo.dueDate = dueDate.toISOString();
    editTodo(updateTodo);
  };
  return {
    handleEditTodo,
  };
};
