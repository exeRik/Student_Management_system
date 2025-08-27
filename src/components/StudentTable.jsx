import React from "react";

export default function StudentTable({ title, students, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Roll</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Marks</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={idx}>
              <td className="border p-2">{s.roll}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.marks}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => onEdit(s.index ?? idx)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => onDelete(idx)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-2">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
