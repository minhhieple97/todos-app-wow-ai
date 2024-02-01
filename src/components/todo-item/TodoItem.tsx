import { Draggable } from "react-beautiful-dnd";
import { useEditTodo, useTodos } from "../../hooks";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { FormTodoEdit, Todo } from "../../interfaces";
import { formatDate } from "../../utils/helpers";
import { FILTER_STATUS_TODO_VALUE } from "../../utils/constants";
type ITaskItem = {
  todo: Todo;
  index: number;
};
export const TodoItem = ({ todo, index }: ITaskItem) => {
  const { handleEditTodo } = useEditTodo();
  const { pickTodo, currentTodo } = useTodos();
  const { handleDeleteTodo } = useDeleteTodo();
  const { title, description, dueDate, status } = todo;
  return (
    <Draggable
      draggableId={`${todo.id}`}
      index={index}
      isDragDisabled={Boolean(currentTodo)}
    >
      {(provided) => {
        return (
          <div
            className={`mb-2 bg-white rounded p-2 shadow ${
              currentTodo && currentTodo.id === todo.id ? "opacity-50" : ""
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="cursor-pointer">
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  disabled={
                    currentTodo && currentTodo.id === todo.id ? true : false
                  }
                  onChange={(event) => {
                    const completed = event.target.checked;
                    const todoUpdate: FormTodoEdit = {
                      ...todo,
                      status: completed
                        ? FILTER_STATUS_TODO_VALUE.COMPLETED
                        : FILTER_STATUS_TODO_VALUE.PENDING,
                      dueDate: todo.dueDate
                        ? new Date(todo.dueDate)
                        : undefined,
                    };
                    handleEditTodo(todo.id, todoUpdate);
                  }}
                  checked={status === FILTER_STATUS_TODO_VALUE.COMPLETED}
                />
                <h3
                  className={`text-lg font-bold mb-1 ${
                    status === FILTER_STATUS_TODO_VALUE.COMPLETED &&
                    "line-through"
                  } truncate ...`}
                >
                  {title}
                </h3>
              </div>

              <p className="text-sm">{description}</p>
            </div>
            {dueDate ? (
              <p className="text-sm text-gray-500">
                Due Date: {formatDate(dueDate)}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No due date</p>
            )}
            <div className="flex gap-2">
              <button
                className="bg-blue-300 text-white px-2 py-1 rounded mt-2"
                onClick={() => pickTodo(todo)}
                disabled={
                  currentTodo && currentTodo.id === todo.id ? true : false
                }
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={
                  currentTodo && currentTodo.id === todo.id ? true : false
                }
              >
                Delete
              </button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
