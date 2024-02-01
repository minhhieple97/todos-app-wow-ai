import { DropResult } from "react-beautiful-dnd";

export const useDragDrop = () => {
  const handleDrapDrop = (result: DropResult) => {
    const { source, destination } = result;
    console.log({ result });
    if (!source || !destination) return;
    const { droppableId: droppableIdDes, index: indexDes } = destination;
    const { droppableId: droppableIdSource, index: indexSource } = source;
    if (droppableIdDes === droppableIdSource && indexDes === indexSource) {
      return null;
    }

    // if (droppableIdDes === droppableIdSource) {
    // }
  };
  return {
    handleDrapDrop,
  };
};
