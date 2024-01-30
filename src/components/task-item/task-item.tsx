export const TaskItem = () => {
  return <div className="flex items-start">
    <input className="mr-2 mt-1.5" type="checkbox" />
    <div className="w-full">
      <h3 className="font-bold truncate ...">Task 1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium temporibus ea magnam nostrum sunt ipsum doloribus delectus. Perferendis laboriosam eum facere eaque nam iusto, a repudiandae optio non beatae nostrum.<span className="text-green-500">(Completed)</span></h3>
      <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, impedit, nesciunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minima atque tempora in eaque adipisci rerum eligendi eum explicabo quia aspernatur, quod asperiores totam architecto recusandae repellat! Sunt, laborum corporis.</p>
      <p className="text-sm text-gray-500">Due Date: 2024-02-15</p>
    </div>
  </div>;
}