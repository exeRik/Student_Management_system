import React, { useState, useMemo } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StatsPanel from "./components/StatsPanel";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { computeStatus } from "./utils/computeStatus";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null); // { roll } when editing

  // Check duplicate roll
  const isDuplicateRoll = (roll, currentRoll = null) =>
    students.some((s) => s.roll === roll && s.roll !== currentRoll);

  // Add student
  const addStudent = (data) => {
    if (isDuplicateRoll(data.roll)) {
      toast.error("Roll No already exists");
      return;
    }
    const newStudent = {
      ...data,
      marks: Number(data.marks),
      status: computeStatus(data.marks),
    };
    setStudents((prev) => [...prev, newStudent]);
    toast.success("Student added!");
  };

  // Update student
  const updateStudent = (originalRoll, data) => {
    if (isDuplicateRoll(data.roll, originalRoll)) {
      toast.error("Roll No already exists");
      return;
    }

    const updatedStudent = {
      ...data,
      marks: Number(data.marks),
      status: computeStatus(data.marks),
    };

    setStudents((prev) =>
      prev.map((s) => (s.roll === originalRoll ? updatedStudent : s))
    );

    toast.info("Student updated!");
    setEditing(null);
  };

  // Delete student
  const deleteStudent = (roll) => {
    setStudents((prev) => prev.filter((s) => s.roll !== roll));
    toast.error(`Student with Roll ${roll} deleted!`);
    if (editing?.roll === roll) setEditing(null);
  };

  // Start editing
  const editStudent = (roll) => setEditing({ roll });

  // Filter by gender
  const maleStudents = useMemo(
    () => students.filter((s) => s.gender === "Male"),
    [students]
  );
  const femaleStudents = useMemo(
    () => students.filter((s) => s.gender === "Female"),
    [students]
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />

        <StudentForm
          onAdd={addStudent}
          onUpdate={updateStudent}
          students={students}
          editing={editing}
          cancelEdit={() => setEditing(null)}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <StudentTable
            title="Male Students"
            students={maleStudents}
            onEdit={editStudent}
            onDelete={deleteStudent}
          />
          <StudentTable
            title="Female Students"
            students={femaleStudents}
            onEdit={editStudent}
            onDelete={deleteStudent}
          />
        </div>

        <StatsPanel students={students} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
}
