import { useTodosContext } from "../../contexts";
import { FILTER_STATUS_TODO_VALUE } from "../../utils/constants";

export const TodoFilter = () => {
  const { filterTodo } = useTodosContext();
  const allStatus = Object.values(FILTER_STATUS_TODO_VALUE);
  return (
    <select
      className="px-2 py-1 border border-gray-300 rounded"
      onChange={(event) =>
        filterTodo(event.target.value as FILTER_STATUS_TODO_VALUE)
      }
    >
      {allStatus.map((status) => {
        return (
          <option key={status} value={status}>
            {status.toUpperCase()}
          </option>
        );
      })}
    </select>
  );
};
