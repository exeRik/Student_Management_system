import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isDuplicateRoll } from "../utils/studentUtils";

const defaultValues = { name: "", roll: "", marks: "", gender: "Male" };

export default function StudentForm({ onSubmitForm, students, editing, cancelEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // Prefill form when editing
  useEffect(() => {
    if (editing?.roll) {
      const student = students.find((s) => s.roll === editing.roll);
      if (student) reset(student);
    } else reset(defaultValues);
  }, [editing, students, reset]);

  // Toast for marks validation errors
  useEffect(() => {
    if (errors.marks) {
      toast.error(errors.marks.message || "Marks must be between 0 and 100!");
    }
  }, [errors.marks]);

  // Toast for roll validation errors
  useEffect(() => {
    if (errors.roll) {
      toast.error(errors.roll.message);
    }
  }, [errors.roll]);

  // Form submit handler
  const onSubmit = (data) => {
    const currentRoll = editing ? editing.roll : null; // track editing roll
    onSubmitForm(data, currentRoll);
    reset(defaultValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {editing ? "Edit Student" : "Add Student"}
      </h2>

      {/* Name & Roll */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          className="border p-2 rounded-lg"
        />
        <input
          {...register("roll", {
            required: "Roll No is required",
            validate: (value) => {
              const currentRoll = editing?.roll || null;
              return !isDuplicateRoll(students, value, currentRoll) || "Roll No already exists!";
            },
          })}
          type="text"
          placeholder="Roll No"
          className="border p-2 rounded-lg"
        />
      </div>

      {/* Marks & Gender */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          {...register("marks", {
            required: "Marks is required",
            validate: (value) =>
              (value >= 0 && value <= 100) || "Marks must be between 0 and 100",
          })}
          type="number"
          placeholder="Marks"
          className="border p-2 rounded-lg"
        />
        <select {...register("gender", { required: true })} className="border p-2 rounded-lg">
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* Buttons */}
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
              reset(defaultValues);
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
