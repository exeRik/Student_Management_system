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

  const studentArray={...students}

  const loadStudents = async () => {
      try {
        const res = await fetchStudents();
        const transformed = res.data.map((s) => ({
          id: s.id,
          roll: s.rollNo,
          name: s.name,
          marks: s.marks,
          gender: s.gender,
          status: s.marks >= 40 ? "Pass" : "Fail",
        }));
        setStudents(transformed);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load students from backend!");
      }
    };

  // Fetch students from backend on mount
  useEffect(() => {
    
    loadStudents();
  }, []);

  // useEffect(() => {
    
  //   loadStudents();
  // }, [students]);

  // Handle add or edit
  const handleFormSubmit = async (data, currentRoll) => {
    const prepared = prepareStudent(data);
    const payload = {
      name: prepared.name,
      rollNo: prepared.roll,
      marks: prepared.marks,
      gender: prepared.gender,
    };

    if (currentRoll) {
      // EDIT
      const studentToEdit = students.find((s) => s.roll === currentRoll);
      if (!studentToEdit) return;

      try {
        const updated = await updateStudentApi(studentToEdit.id, payload);
        const updatedStudent = updated.data;

        setStudents((prev) =>
          prev.map((s) =>
            s.id === updatedStudent.id
              ? {
                  id: updatedStudent.id,
                  roll: updatedStudent.rollNo,
                  name: updatedStudent.name,
                  marks: updatedStudent.marks,
                  gender: updatedStudent.gender,
                  status: updatedStudent.marks >= 40 ? "Pass" : "Fail",
                }
              : s
          )
        );
        toast.success("Student updated!");
        setEditing(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update student!");
      }
    } else {
      // ADD
      try {
        const saved = await addStudent(payload);
        // console.log("savde",saved)
        const newStudent = {
          id: saved.data.id,
          roll: saved.data.rollNo,
          name: saved.data.name,
          marks: saved.data.marks,
          gender: saved.data.gender,
          status: saved.data.marks >= 40 ? "Pass" : "Fail",
        };
                console.log("student",newStudent)

        setStudents((prev) => [...prev, newStudent]);

        toast.success("Student added!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add student!");
      }
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteStudentApi(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast.error("Student deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student!");
    }
  };

  // Edit click
  const handleEditClick = (student) => setEditing(student);

  // Gender filter
  const maleStudents = useMemo(() => students.filter((s) => s.gender === "Male"), [students]);
  const femaleStudents = useMemo(() => students.filter((s) => s.gender === "Female"), [students]);


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
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
}
