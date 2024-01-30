import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ActionType, Todo, TodoAction, TodoContextType } from '../interfaces'

const TodosContext = createContext<TodoContextType | null>(null);

const initialState: TodoContextType = {
  todos: [],
  addTodo: () => { },
  editTodo: () => { },
  deleteTodo: () => { },
  isLoading: false,
  currentTodo: null,
  error: null
};

const reducer = (state: TodoContextType, action: TodoAction) => {
  switch (action.type) {
    case ActionType.LOADING:
    case ActionType.LOADED_TODOS:
    case ActionType.ADD_TODO:
    case ActionType.EDIT_TODO:
    case ActionType.DELETE_TODO:
    case ActionType.REJECTED:
      return state;
    default:
      throw new Error("Unknown action type");
  }
}

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ todos, isLoading, currentTodo, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchTodos() {
      dispatch({ type: ActionType.LOADING });

      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        // const data = await res.json();
        // dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECTED,
          payload: "There was an error loading todos...",
        });
      }
    }
    fetchTodos();
  }, []);

  async function addTodo(todo: Todo) {
  }

  async function deleteTodo(id: number) {

  }

  async function editTodo(todo: Todo) {

  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        currentTodo,
        error,
        addTodo,
        deleteTodo,
        editTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}



export { TodosProvider, TodosContext };