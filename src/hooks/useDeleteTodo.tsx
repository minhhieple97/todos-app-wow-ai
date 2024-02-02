import { useTodosContext } from "../contexts";
import { ExcludeAll } from "../interfaces";
import { FILTER_STATUS_TODO_VALUE } from "../utils/constants";
export const useDeleteTodo = () => {
  const { deleteTodo } = useTodosContext();
  const handleDeleteTodo = (
    id: number,
    status: ExcludeAll<FILTER_STATUS_TODO_VALUE>
  ) => {
    deleteTodo(id, status);
  };
  return {
    handleDeleteTodo,
  };
};
