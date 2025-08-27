import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function StudentForm({ onAdd, onUpdate, students, editing, cancelEdit }) {
  const defaultValues = { name: "", roll: "", marks: "", gender: "Male" };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (editing !== null) {
      const s = students[editing.index];
      if (s) reset({ name: s.name, roll: s.roll, marks: s.marks, gender: s.gender });
    } else {
      reset(defaultValues);
    }
  }, [editing, students, reset]);

  const onSubmit = (data) => {
    if (editing !== null) {
      onUpdate(editing.index, data);
    } else {
      onAdd(data);
    }
    reset(defaultValues);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input {...register("name", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          {errors.name && <p className="text-xs text-red-500">Name is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Roll No</label>
          <input {...register("roll", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          {errors.roll && <p className="text-xs text-red-500">Roll No is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Marks (0–100)</label>
          <input type="number" {...register("marks", { required: true, min: 0, max: 100 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          {(errors.marks?.type === "min" || errors.marks?.type === "max") && <p className="text-xs text-red-500">Marks must be 0–100</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select {...register("gender", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            {editing ? "Update Student" : "Add Student"}
          </button>
          {editing !== null && (
            <button type="button" onClick={() => { cancelEdit(); reset(defaultValues); }} className="px-4 py-2 rounded bg-gray-200">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
