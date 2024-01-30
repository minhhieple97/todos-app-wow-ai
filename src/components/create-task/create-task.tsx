export const CreateTask = () => {
  return (
    <form className="mb-4">
      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="taskTitle">Title</label>
        <input className="w-full px-2 py-1 border border-gray-300 rounded" type="text" id="taskTitle" name="taskTitle" required />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="taskDescription">Description</label>
        <textarea className="w-full px-2 py-1 border border-gray-300 rounded" id="taskDescription" name="taskDescription" required></textarea>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="taskDueDate">Due Date</label>
        <input className="w-full px-2 py-1 border border-gray-300 rounded" type="date" id="taskDueDate" name="taskDueDate" required />
      </div>

      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">Add Task</button>
    </form>
  );
}