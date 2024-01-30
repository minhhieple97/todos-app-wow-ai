import { CreateTask } from "./components/create-task";
import { TaskFilter } from "./components/task-filter";
import { TaskList } from "./components/task-list";

export default function App() {

  return (
    <div className="container mx-auto p-4 max-w-2xl flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
      <CreateTask></CreateTask>
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold mr-2">Tasks</h2>
        <TaskFilter></TaskFilter>
      </div>
      <TaskList></TaskList>
    </div>

  )
}