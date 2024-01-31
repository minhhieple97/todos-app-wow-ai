import { useTodos } from "../../hooks";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useUpdateStatusTodo } from "../../hooks/useUpdateStatusTodo";
import { Todo } from "../../interfaces";
import { formatDate } from "../../utils/helpers";
type ITaskItem = {
  todo: Todo;
};
export const TodoItem = ({ todo }: ITaskItem) => {
  const { handleUpdate } = useUpdateStatusTodo();
  const { pickTodo, currentTodo } = useTodos();
  const { handleDeleteTodo } = useDeleteTodo();
  const { title, description, dueDate, completed } = todo;
  return (
    <div className="mb-2 bg-white rounded p-2 shadow">
      <div className="cursor-pointer">
        <div className="flex gap-1">
          <input
            type="checkbox"
            disabled={currentTodo && currentTodo.id === todo.id ? true : false}
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
      <div className="flex gap-2">
        <button
          className="bg-blue-300 text-white px-2 py-1 rounded mt-2"
          onClick={() => pickTodo(todo)}
          disabled={currentTodo && currentTodo.id === todo.id ? true : false}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          onClick={() => handleDeleteTodo(todo.id)}
          disabled={currentTodo && currentTodo.id === todo.id ? true : false}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
