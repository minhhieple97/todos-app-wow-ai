export const TaskFilter = () => {
  return <select className="px-2 py-1 border border-gray-300 rounded">
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>


}