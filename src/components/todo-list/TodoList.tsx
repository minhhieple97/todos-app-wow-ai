import { useUpdateStatusTodo } from "../../hooks/useUpdateStatusTodo";
import { FILTER_STATUS_TODO_VALUE } from "../../utils/constants";
import { TodoItem } from "../todo-item";

export const TodoList = () => {
  const { completedTodos, pendingTodos, statusFilter } = useUpdateStatusTodo();
  return (
    <div className="flex flex-col gap-2">
      {statusFilter === FILTER_STATUS_TODO_VALUE.COMPLETED ? null : (
        <div className="bg-gray-400 p-4 rounded overflow-y-scroll max-h-96 no-scrollbar">
          <h2 className="text-xl font-bold mb-2">Pending Tasks</h2>
          {pendingTodos.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            <>
              {pendingTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}></TodoItem>
              ))}
            </>
          )}
        </div>
      )}
      {statusFilter === FILTER_STATUS_TODO_VALUE.PENDING ? null : (
        <div className="bg-green-500 p-4 rounded overflow-y-scroll max-h-96 no-scrollbar">
          <h2 className="text-xl font-bold mb-2">Completed Tasks</h2>
          {completedTodos.length === 0 ? (
            <p>No completed tasks.</p>
          ) : (
            <>
              {completedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}></TodoItem>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
