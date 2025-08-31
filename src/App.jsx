import React, { useState, useMemo } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StatsPanel from "./components/StatsPanel";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { prepareStudent } from "./utils/studentUtils";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleFormSubmit = (data, currentRoll) => {
    const newStudent = prepareStudent(data);

    if (currentRoll) {
      setStudents(prev => prev.map(s => (s.roll === currentRoll ? newStudent : s)));
      toast.info("Student updated!");
      setEditing(null);
    } else {
      setStudents(prev => [...prev, newStudent]);
      toast.success("Student added!");
    }
  };

  const deleteStudent = (roll) => {
    setStudents(prev => prev.filter(s => s.roll !== roll));
    toast.error(`Student with Roll ${roll} deleted!`);
    if (editing?.roll === roll) setEditing(null);
  };

  const editStudent = (roll) => setEditing({ roll });

  const maleStudents = useMemo(() => students.filter(s => s.gender === "Male"), [students]);
  const femaleStudents = useMemo(() => students.filter(s => s.gender === "Female"), [students]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />

        <StudentForm onSubmitForm={handleFormSubmit} students={students} editing={editing} cancelEdit={() => setEditing(null)} />

        <div className="grid md:grid-cols-2 gap-6">
          <StudentTable title="Male Students" students={maleStudents} onEdit={editStudent} onDelete={deleteStudent} />
          <StudentTable title="Female Students" students={femaleStudents} onEdit={editStudent} onDelete={deleteStudent} />
        </div>

        <StatsPanel students={students} />
        
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
}
