import Message from "../../ui/Message";
import { useAddTodo } from "../../hooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormTodo } from "../../interfaces";
import DatePicker from "react-datepicker";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 100 characters"),
  description: Yup.string(),
  dueDate: Yup.date(),
});
const CreateTask = () => {
  const { handleCreateTodo } = useAddTodo();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormTodo>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormTodo) => {
    handleCreateTodo(data);
    reset();
  };
  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="title">
          Title
        </label>
        <input
          className="w-full px-2 py-1 mb-1.5 border border-gray-300 rounded"
          type="text"
          id="title"
          {...register("title")}
        />
        {errors.title?.message && (
          <Message message={errors.title.message}></Message>
        )}
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full px-2 py-1 border border-gray-300 rounded"
          id="description"
          {...register("description")}
        ></textarea>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold" htmlFor="dueDate">
          Due Date
        </label>
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <DatePicker
              className="w-full px-2 py-1 mb-1.5 border border-gray-300 rounded"
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};

export { CreateTask };
