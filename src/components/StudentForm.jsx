import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function StudentForm({ onAdd, onUpdate, students, editing, cancelEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editing?.roll) {
      const student = students.find((s) => s.roll === editing.roll);
      if (student) {
        setValue("name", student.name);
        setValue("roll", student.roll);
        setValue("marks", student.marks);
        setValue("gender", student.gender);
      }
    } else {
      reset({ name: "", roll: "", marks: "", gender: "Male" });
    }
  }, [editing, students, setValue, reset]);

  const onSubmit = (data) => {
    data.marks = Number(data.marks);

    // 🚨 Duplicate roll check
    const currentRoll = editing ? editing.roll : null;
    const duplicate = students.some(
      (s) => s.roll === data.roll && s.roll !== currentRoll
    );
    if (duplicate) {
      toast.error("Roll No already exists!");
      return;
    }

    // 🚨 Marks check
    if (data.marks < 0 || data.marks > 100) {
      toast.error(" Marks must be between 0 and 100!");
      return;
    }

    if (editing) {
      onUpdate(editing.roll, data);
    } else {
      onAdd(data);
    }

    reset({ name: "", roll: "", marks: "", gender: "Male" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {editing ? "Edit Student" : "Add Student"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
          className="border p-2 rounded-lg"
        />

        <input
          {...register("roll", { required: true })}
          type="text"
          placeholder="Roll No"
          className="border p-2 rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          {...register("marks", { required: true })}
          type="number"
          placeholder="Marks"
          className="border p-2 rounded-lg"
        />

        <select
          {...register("gender", { required: true })}
          className="border p-2 rounded-lg"
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              cancelEdit();
              reset({ name: "", roll: "", marks: "", gender: "Male" });
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
