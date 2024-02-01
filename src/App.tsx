import { CreateTodo } from "./components/create-todo";
import { TodoFilter } from "./components/todo-filter";
import { TodoList } from "./components/todo-list";
export default function App() {
  return (
    <div className="w-full p-6 flex flex-col gap-5">
      <h1 className="text-2xl font-bold m-auto inline-block">To-Do App</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 max-w-3xl">
          <CreateTodo></CreateTodo>
        </div>
        <div className="p-2">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-bold mr-2">Tasks</h2>
            <TodoFilter></TodoFilter>
          </div>
          <TodoList></TodoList>
        </div>
      </div>
    </div>
  );
}
