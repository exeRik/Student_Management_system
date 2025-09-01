// src/components/utils/api.js
const BASE_URL = "/api"; // Vite proxy

// ------------------------
// GET all students
// ------------------------
export const fetchStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

// ------------------------
// ADD a new student
// ------------------------
export const addStudent = async (student) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error("Failed to add student");
  return res.json();
};

// ------------------------
// DELETE a student by _id
// ------------------------
export const deleteStudentApi = async (id) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
};

// ------------------------
// UPDATE a student by _id
// ------------------------
export const updateStudentApi = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT", // or PATCH if partial update
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
};
