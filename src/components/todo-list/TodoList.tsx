import { useDragDrop } from "../../hooks";
import { useTodosContext } from "../../contexts";
import { TodoItem } from "../todo-item";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
export const TodoList = () => {
  const { columns } = useTodosContext();
  const { handleDrapDrop } = useDragDrop();
  return (
    <DragDropContext onDragEnd={handleDrapDrop}>
      <div className="flex flex-col gap-2">
        {columns.map((column) => {
          return (
            <div
              key={column.id}
              className={`${column.backgroundColor} p-4 rounded overflow-y-scroll max-h-screen no-scrollbar`}
            >
              <h2 className="text-xl font-bold mb-2">{column.title}</h2>
              <Droppable droppableId={column.id} type="group">
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {column.list.length === 0 ? (
                        <p>{column.notFoundMessage}</p>
                      ) : (
                        <>
                          {column.list.map((todo, index) => (
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              index={index}
                            ></TodoItem>
                          ))}
                        </>
                      )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
