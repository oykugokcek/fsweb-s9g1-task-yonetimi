import React from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      mode: "onChange",
    },
  });

  const onSubmit = (data) => {
    submitFn(data);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: 3,
          })}
        />
        {/* {errors.title && <p className="input-error">{errors.title.message}</p>} */}
        {errors.title && errors.title.type === "required" && (
          <p className="input-error">Task başlığı yazmalısınız</p>
        )}
        {errors.title && errors.title.type === "minLength" && (
          <p className="input-error">Task başlığı en az 3 karakter olmalı</p>
        )}

        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          type="textarea"
          id="description"
          {...register("description", {
            required: true,
            minLength: 10,
          })}
        />
        {errors.description && errors.description.type === "minLength" && (
          <p className="input-error">
            Task açıklaması en az 10 karakter olmalı
          </p>
        )}

        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
