import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TodosProvider } from "./contexts/TodosContext.tsx";
import "react-datepicker/dist/react-datepicker.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <TodosProvider>
    <App />
  </TodosProvider>
);
