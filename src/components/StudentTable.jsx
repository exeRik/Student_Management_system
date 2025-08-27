import React from "react";
import StudentRow from "./table/StudentRow";

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
          {students.length > 0 ? (
            students.map((s, idx) => (
              <StudentRow
                key={idx}
                student={s}
                index={idx}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-2">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
