import { useContext } from "react";
import { TodosContext } from "./TodosContext";

const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("TodosContext was used outside the TodosProvider");
  return context;
};
export { useTodosContext };
