import { ColumnsData } from "./../interfaces";
export const LOCALSTORATE_KEY_TODOS = 'todos';
export enum FILTER_STATUS_TODO_VALUE {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}
export const initialColumnsData: ColumnsData = {
  [FILTER_STATUS_TODO_VALUE.PENDING]: {
    id:FILTER_STATUS_TODO_VALUE.PENDING,
    title: "Pending Tasks",
    notFoundMessage: "No pending tasks.",
    backgroundColor: "bg-gray-400",
    list: [],
  },
  [FILTER_STATUS_TODO_VALUE.COMPLETED]: {
    id:FILTER_STATUS_TODO_VALUE.COMPLETED,
    title: "Completed Tasks",
    notFoundMessage: "No completed tasks.",
    backgroundColor: "bg-green-500",
    list: [],
  },
};