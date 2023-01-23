import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    toast("Yükleniyor.");

    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    console.log({ ...data, id: nanoid(5), status: "yapılacak" });
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
            required: true,
            minLength: 3,
          })}
        />
        {/* {errors.title && <p className="input-error">{errors.title.message}</p>} */}
        {errors.title && errors.title.type === "required" && (
          <p className="input-error"></p>
        )}

        {errors.title && errors.title.type === "minLength" && (
          <p className="input-error">Task başlığı en az 3 karakter olmalı</p>
        )}
      </div>

      <div className="form-line">
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
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                id="people"
                value={p}
                {...register("people", { required: true })}
              />
              {p} kişisi
            </label>
          ))}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
