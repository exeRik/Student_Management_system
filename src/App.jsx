import React, { useState, useMemo } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StatsPanel from "./components/StatsPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const computeStatus = (marks) => (Number(marks) >= 40 ? "Pass" : "Fail");

  // Add student
  const addStudent = (data) => {
    const exists = students.some((s) => String(s.roll) === String(data.roll));
    if (exists) {
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
  const updateStudent = (index, data) => {
    const duplicate = students.some(
      (s, idx) => idx !== index && String(s.roll) === String(data.roll)
    );
    if (duplicate) {
      toast.error("Roll No already exists");
      return;
    }

    const updatedStudent = {
      ...data,
      marks: Number(data.marks),
      status: computeStatus(data.marks),
    };
    setStudents((prev) => prev.map((s, i) => (i === index ? updatedStudent : s)));
    toast.info("Student updated!");
    setEditing(null);
  };

  // Delete student
  const deleteStudent = (index) => {
    const roll = students[index].roll;
    setStudents((prev) => prev.filter((_, i) => i !== index));
    toast.error(`Student with Roll ${roll} deleted!`);
    if (editing?.index === index) setEditing(null);
  };

  // Start editing
  const editStudent = (index) => setEditing({ index });

  // Derived lists
  const maleStudents = useMemo(() => students.filter((s) => s.gender === "Male"), [students]);
  const femaleStudents = useMemo(() => students.filter((s) => s.gender === "Female"), [students]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Form */}
        <Header/>
        <StudentForm
          onAdd={addStudent}
          onUpdate={updateStudent}
          students={students}
          editing={editing}
          cancelEdit={() => setEditing(null)}
        />

        {/* Tables side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          <StudentTable title="Male Students" students={maleStudents} onEdit={editStudent} onDelete={deleteStudent} />
          <StudentTable title="Female Students" students={femaleStudents} onEdit={editStudent} onDelete={deleteStudent} />
        </div>

        {/* Stats */}
        <StatsPanel students={students} />
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
}
