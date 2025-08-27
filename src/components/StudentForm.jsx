import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";
import SelectField from "./form/SelectField";

const defaultValues = { name: "", roll: "", marks: "", gender: "Male" };

export default function StudentForm({ onAdd, onUpdate, students, editing, cancelEdit }) {
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
    if (editing !== null) onUpdate(editing.index, data);
    else onAdd(data);
    reset(defaultValues);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <InputField label="Name" {...{ register, name: "name", errors }} />
        <InputField label="Roll No" {...{ register, name: "roll", errors }} />
        <InputField label="Marks (0–100)" type="number" min={0} max={100} {...{ register, name: "marks", errors }} />
        <SelectField label="Gender" {...{ register, name: "gender", errors }} options={["Male", "Female"]} />

        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            {editing ? "Update Student" : "Add Student"}
          </button>
          {editing !== null && (
            <button
              type="button"
              onClick={() => { cancelEdit(); reset(defaultValues); }}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
