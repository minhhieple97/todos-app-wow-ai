import { useContext } from "react";
import { TodosContext } from "../contexts/todo-context";

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("TodosContext was used outside the TodosProvider");
  return context;
}
export { useTodos }