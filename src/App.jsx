import React, { useState, useMemo, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StatsPanel from "./components/StatsPanel";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { prepareStudent } from "./utils/studentUtils";
import {
  fetchStudents,
  addStudent,
  deleteStudentApi,
  updateStudentApi,
} from "./utils/api.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch students from backend on mount
  useEffect(() => {
    fetchStudents()
      .then((res) => {
        const transformed = res.data.map((s) => ({
          id: s.id, // backend MongoDB id
          roll: s.rollNo,
          name: s.name,
          marks: s.marks,
          gender: s.gender,
          status: s.marks >= 40 ? "Pass" : "Fail",
        }));
        setStudents(transformed);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        toast.error("Failed to load students from backend!");
      });
  }, []);

  // Handle form submit (add or edit)
  const handleFormSubmit = async (data, currentRoll) => {
    const prepared = prepareStudent(data);
    const newStudent = {
      ...prepared,
      status: prepared.marks >= 40 ? "Pass" : "Fail",
    };

    if (currentRoll) {
      // EDIT existing student
      const studentToEdit = students.find((s) => s.roll === currentRoll);
      if (!studentToEdit) return;

      try {
        const payload = {
          name: newStudent.name,
          rollNo: newStudent.roll,
          marks: newStudent.marks,
          gender: newStudent.gender,
        };
        const updated = await updateStudentApi(studentToEdit.id, payload);
        setStudents((prev) =>
          prev.map((s) =>
            s.id === studentToEdit.id
              ? {
                  ...s,
                  name: updated.name,
                  roll: updated.rollNo,
                  marks: updated.marks,
                  gender: updated.gender,
                  status: updated.marks >= 40 ? "Pass" : "Fail",
                }
              : s
          )
        );
        toast.info("Student updated!");
        setEditing(null);
      } catch (err) {
        console.error("Failed to update student:", err);
        toast.error("Failed to update student!");
      }
    } else {
      // ADD new student
      const tempId = Date.now();
      const studentForTable = { id: tempId, ...newStudent };
      setStudents((prev) => [...prev, studentForTable]);
      toast.success("Student added to table!");

      try {
        const payload = {
          name: newStudent.name,
          rollNo: newStudent.roll,
          marks: newStudent.marks,
          gender: newStudent.gender,
        };
        const saved = await addStudent(payload);
        setStudents((prev) =>
          prev.map((s) =>
            s.id === tempId
              ? {
                  id: saved._id,
                  roll: saved.rollNo,
                  name: saved.name,
                  marks: saved.marks,
                  gender: saved.gender,
                  status: saved.marks >= 40 ? "Pass" : "Fail",
                }
              : s
          )
        );
      } catch (err) {
        console.error("Failed to save student in backend:", err);
        toast.error("Failed to save student in backend!");
      }
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await deleteStudentApi(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast.success("Student deleted!");
    } catch (err) {
      console.error("Failed to delete student:", err);
      toast.error("Failed to delete student!");
    }
  };

  // Edit click from table
  const handleEditClick = (student) => {
    setEditing(student);
  };

  // Categorize by gender
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
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />

        <StudentForm
          onSubmitForm={handleFormSubmit}
          students={students}
          editing={editing}
          cancelEdit={() => setEditing(null)}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <StudentTable
            title="Male Students"
            students={maleStudents}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
          <StudentTable
            title="Female Students"
            students={femaleStudents}
            onEdit={handleEditClick}
            onDelete={handleDelete}
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
