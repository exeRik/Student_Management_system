import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isDuplicateRoll } from "../utils/studentUtils";

const defaultValues = { name: "", roll: "", marks: "", gender: "Male" };

export default function StudentForm({ onSubmitForm, students, editing, cancelEdit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
  });

  // Prefill form on edit
  useEffect(() => {
    if (editing) {
      reset({
        name: editing.name || "",
        roll: editing.roll || "",
        marks: editing.marks || "",
        gender: editing.gender || "Male",
      });
    } else {
      reset(defaultValues);
    }
  }, [editing, reset]);

  useEffect(() => {
    if (errors.name) toast.error(errors.name.message || "Name required");
    if (errors.roll) toast.error(errors.roll.message);
    if (errors.marks) toast.error(errors.marks.message || "Marks must be 0-100");
  }, [errors]);

  const onSubmit = (data) => {
    const currentRoll = editing?.roll || null;
    if (!editing && isDuplicateRoll(students, data.roll, null)) {
      toast.error("Roll number already exists!");
      return;
    }
    onSubmitForm(data, currentRoll);
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{editing ? "Edit Student" : "Add Student"}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <input {...register("name", { required: "Name required" })} placeholder="Name" className="border p-2 rounded-lg" />
        <input {...register("roll", {
          required: "Roll required",
          validate: (value) => !isDuplicateRoll(students, value, editing?.roll) || "Roll exists!",
        })} placeholder="Roll No" className="border p-2 rounded-lg" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input {...register("marks", {
          required: "Marks required",
          validate: (v) => (v >= 0 && v <= 100) || "Marks must be 0-100",
        })} placeholder="Marks" type="number" className="border p-2 rounded-lg" />
        <select {...register("gender")} className="border p-2 rounded-lg">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" onClick={() => { cancelEdit(); reset(defaultValues); }} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
      </div>
    </form>
  );
}
