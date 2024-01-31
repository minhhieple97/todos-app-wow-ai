import { useUpdateTodo } from "../../hooks/useTaskList";
import { Todo } from "../../interfaces";
import { formatDate } from "../../utils/helpers";
type ITaskItem = {
  todo: Todo;
};
export const TodoItem = ({ todo }: ITaskItem) => {
  const { handleUpdate } = useUpdateTodo();
  const { title, description, dueDate, completed } = todo;
  return (
    <div className="mb-2 bg-white rounded p-2 shadow">
      <div className="cursor-pointer">
        <div className="flex gap-1">
          <input
            type="checkbox"
            onChange={(event) => {
              const completed = event.target.checked;
              const todoUpdate = { ...todo, completed };
              handleUpdate(todoUpdate);
            }}
            checked={completed}
          />
          <h3
            className={`text-lg font-bold mb-1 ${
              completed && "line-through"
            } truncate ...`}
          >
            {title}
          </h3>
        </div>

        <p className="text-sm">{description}</p>
      </div>
      {dueDate ? (
        <p className="text-sm text-gray-500">Due Date: {formatDate(dueDate)}</p>
      ) : (
        <p className="text-sm text-gray-500">No due date</p>
      )}
      <button className="bg-red-500 text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    </div>
  );
};
