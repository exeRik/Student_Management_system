import React, { useState, useEffect } from "react";

export default function StudentForm({ onAdd, onUpdate, students, editing, cancelEdit }) {
  const [form, setForm] = useState({ name: "", roll: "", marks: "", gender: "Male" });

  useEffect(() => {
    if (editing?.roll) {
      const student = students.find((s) => s.roll === editing.roll);
      if (student) {
        setForm({
          name: student.name,
          roll: student.roll,
          marks: student.marks,
          gender: student.gender,
        });
      }
    } else {
      setForm({ name: "", roll: "", marks: "", gender: "Male" });
    }
  }, [editing, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "marks") {
      // restrict marks input between 0-100
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.roll || form.marks === "") {
      alert("Please fill all fields");
      return;
    }

    if (editing) {
      onUpdate(editing.roll, form); // pass original roll + new form data
    } else {
      onAdd(form);
    }

    setForm({ name: "", roll: "", marks: "", gender: "Male" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {editing ? "Edit Student" : "Add Student"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="roll"
          placeholder="Roll No"
          value={form.roll}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
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
            onClick={cancelEdit}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
