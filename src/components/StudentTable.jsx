import React from "react";
import TableRow from "./table/TableRow";

export default function StudentTable({ title, students, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <table className="w-full border-collapse text-xl">
        <thead>
          <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-sm tracking-wide">
            
            <th className="border-b p-3 text-left">Roll</th>
            <th className="border-b p-3 text-left">Name</th>
            <th className="border-b p-3 text-left">Marks</th>
            <th className="border-b p-3 text-left">Status</th>
            <th className="border-b p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <TableRow
                key={s.roll}
                student={s}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
