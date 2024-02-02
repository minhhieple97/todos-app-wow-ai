import { useAddTodo, useEditTodo } from "../../hooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormTodo } from "../../interfaces";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { Button, Input, Label, Message, TextArea } from "../../ui";
import { useTodosContext } from "../../contexts";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 100 characters"),
  description: Yup.string(),
  dueDate: Yup.date(),
});
const CreateUpdateTodo = () => {
  const { handleCreateTodo } = useAddTodo();
  const { handleEditTodo } = useEditTodo();
  const { currentTodo, cancelUpdate } = useTodosContext();
  const isEditing = Boolean(currentTodo);
  const {
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
      const { status, createdAt } = currentTodo;
      handleEditTodo(currentTodo.id, {
        status,
        createdAt,
        ...data,
      });
    } else handleCreateTodo(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              placeholder="Enter your task title"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.title?.message && (
          <div className="mt-2">
            <Message message={errors.title.message}></Message>
          </div>
        )}
      </div>

      <div className="mb-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextArea value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="dueDate">Due Date</Label>
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
        <Button size="lg" textColor="white" bgColor="blue-500" type="submit">
          {isEditing ? "Update todo" : "Add Todo"}
        </Button>
        {isEditing && (
          <Button
            size="lg"
            textColor="white"
            bgColor="gray-400"
            handleClick={() => {
              cancelUpdate();
              reset();
            }}
          >
            Cancel Update
          </Button>
        )}
      </div>
    </form>
  );
};

export { CreateUpdateTodo };
