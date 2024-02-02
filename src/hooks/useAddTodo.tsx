import { useTodosContext } from "../contexts";
import { FormTodo, Todo } from "../interfaces";
import { FILTER_STATUS_TODO_VALUE } from "../utils/constants";
export const useAddTodo = () => {
  const { addTodo } = useTodosContext();
  const handleCreateTodo = (formTodo: FormTodo) => {
    const { title, description, dueDate } = formTodo;
    const todo: Todo = {
      title,
      description,
      id: Date.now(),
      status: FILTER_STATUS_TODO_VALUE.PENDING,
      createdAt: Date.now(),
    };
    if (dueDate) todo.dueDate = dueDate.toISOString();
    addTodo(todo);
  };
  return {
    handleCreateTodo,
  };
};
