import { DropResult } from "react-beautiful-dnd";
import { FILTER_STATUS_TODO_VALUE } from "../utils/constants";
import { ExcludeAll } from "../interfaces";
import { useTodosContext } from ".";

export const useDragDrop = () => {
  const { columnsData, setColumnsData } = useTodosContext();
  const handleDrapDrop = (result: DropResult) => {
    const { source, destination, draggableId: todoId } = result;
    if (!source || !destination) return;
    const { droppableId: droppableIdDes, index: indexDes } = destination;
    const { droppableId: droppableIdSource, index: indexSource } = source;
    if (droppableIdDes === droppableIdSource && indexDes === indexSource) {
      return null;
    }
    const startColumn =
      columnsData[droppableIdSource as ExcludeAll<FILTER_STATUS_TODO_VALUE>];
    const endColumn =
      columnsData[droppableIdDes as ExcludeAll<FILTER_STATUS_TODO_VALUE>];
    const listStartTodo = structuredClone(startColumn.list);
    if (startColumn.id === endColumn.id) {
      [listStartTodo[indexSource], listStartTodo[indexDes]] = [
        listStartTodo[indexDes],
        listStartTodo[indexSource],
      ];
      setColumnsData({
        ...columnsData,
        [droppableIdDes as ExcludeAll<FILTER_STATUS_TODO_VALUE>]: {
          ...startColumn,
          list: listStartTodo,
        },
      });
    } else {
      const todo = listStartTodo.find((todo) => todo.id === parseInt(todoId));
      if (!todo) return;
      todo.status = droppableIdDes as ExcludeAll<FILTER_STATUS_TODO_VALUE>;
      const newTodosStart = listStartTodo.filter(
        (todo) => todo.id !== parseInt(todoId)
      );
      const endTodos = endColumn.list;
      endTodos.splice(indexDes, 0, todo);
      setColumnsData({
        ...columnsData,
        [droppableIdDes as ExcludeAll<FILTER_STATUS_TODO_VALUE>]: {
          ...endColumn,
          list: endTodos,
        },
        [droppableIdSource as ExcludeAll<FILTER_STATUS_TODO_VALUE>]: {
          ...startColumn,
          list: newTodosStart,
        },
      });
    }
  };
  return {
    handleDrapDrop,
  };
};
