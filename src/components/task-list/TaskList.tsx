import { useUpdateTodo } from "../../hooks/useTaskList";
import { TodoItem } from "../todo-item";

export const TaskList = () => {
  const { completedTodos, pendingTodos } = useUpdateTodo();
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-400 p-4 rounded overflow-y-scroll max-h-96 no-scrollbar">
        <h2 className="text-xl font-bold mb-2">Pending Tasks</h2>
        {pendingTodos.length === 0 ? (
          <p>No pending tasks.</p>
        ) : (
          <ul>
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo}></TodoItem>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-green-500 p-4 rounded overflow-y-scroll max-h-96 no-scrollbar">
        <h2 className="text-xl font-bold mb-2">Completed Tasks</h2>
        {completedTodos.length === 0 ? (
          <p>No completed tasks.</p>
        ) : (
          <ul>
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo}></TodoItem>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
