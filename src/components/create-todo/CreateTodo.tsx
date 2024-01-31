import Message from "../../ui/Message";
import { useAddTodo, useTodos } from "../../hooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormTodo } from "../../interfaces";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { useEditTodo } from "../../hooks/useEditTodo";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 100 characters"),
  description: Yup.string(),
  dueDate: Yup.date(),
});
const CreateTodo = () => {
  const { handleCreateTodo } = useAddTodo();
  const { handleEditTodo } = useEditTodo();
  const { currentTodo, cancelUpdate } = useTodos();
  const isEditing = Boolean(currentTodo);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormTodo>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (!currentTodo) return;
    const { title, description, dueDate } = currentTodo;
    setValue("title", title);
    setValue("description", description);
    dueDate && setValue("dueDate", new Date(dueDate));
  }, [currentTodo, setValue]);
  const onSubmit = (data: FormTodo) => {
    if (isEditing && currentTodo) {
      const { completed, createdAt } = currentTodo;
      handleEditTodo(currentTodo.id, {
        completed,
        createdAt,
        ...data,
      });
    } else handleCreateTodo(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
        >
          {isEditing ? "Update todo" : "Add Todo"}
        </button>
        {isEditing && (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              cancelUpdate();
              reset();
            }}
          >
            Cancel Update
          </button>
        )}
      </div>
    </form>
  );
};

export { CreateTodo };
