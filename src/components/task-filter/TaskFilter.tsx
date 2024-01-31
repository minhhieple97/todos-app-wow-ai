import { useTodos } from "../../hooks";
import { FILTER_STATUS_TODO_VALUE } from "../../utils/constants";

export const TaskFilter = () => {
  const { filterTodo } = useTodos();
  return (
    <select
      className="px-2 py-1 border border-gray-300 rounded"
      onChange={(event) =>
        filterTodo(event.target.value as FILTER_STATUS_TODO_VALUE)
      }
    >
      <option value={FILTER_STATUS_TODO_VALUE.ALL}>All</option>
      <option value={FILTER_STATUS_TODO_VALUE.COMPLETED}>Completed</option>
      <option value={FILTER_STATUS_TODO_VALUE.PENDING}>Pending</option>
    </select>
  );
};
