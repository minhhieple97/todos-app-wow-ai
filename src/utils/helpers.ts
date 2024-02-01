import { Column, ColumnsData } from "../interfaces";
import { FILTER_STATUS_TODO_VALUE } from "./constants";

export const formatDate = (date: string): string => {
  const dateObj  = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear());
  return `${day}/${month}/${year}`;
}


export const getColumnsByStatus = (key: FILTER_STATUS_TODO_VALUE,columns:ColumnsData): Column[] => {
  switch (key) {
    case FILTER_STATUS_TODO_VALUE.ALL:
      return Object.values(columns);
    case FILTER_STATUS_TODO_VALUE.PENDING:
      return [columns[FILTER_STATUS_TODO_VALUE.PENDING]];
    case FILTER_STATUS_TODO_VALUE.COMPLETED:
      return [columns[FILTER_STATUS_TODO_VALUE.COMPLETED]];
    default:
      return [];
  }
}