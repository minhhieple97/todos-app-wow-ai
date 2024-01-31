import { CreateTask } from "./components/create-task";
import { TaskFilter } from "./components/task-filter";
import { TaskList } from "./components/task-list";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { todos } = useTodos();
  return (
    <div className="container mx-auto p-4 flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold m-auto">To-Do App</h1>
      <div className="min-w-96">
        <CreateTask></CreateTask>
      </div>

      <div className="min-w-[80%]">
        {todos.length > 0 && (
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-bold mr-2">Tasks</h2>
            <TaskFilter></TaskFilter>
          </div>
        )}
        <TaskList></TaskList>
      </div>
    </div>
  );
}
