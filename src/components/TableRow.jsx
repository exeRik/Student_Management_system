import React from "react";

export default function TableRow({ student, onEdit, onDelete }) {
  const statusColor = student.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200  text-xl">
      <td className="py-3 px-2 font-medium text-gray-700">{student.name}</td>
      <td className="py-3 px-2 text-gray-600">{student.roll}</td>
      <td className="py-3 px-2 text-gray-600">{student.marks}</td>
      <td>
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
          {student.status}
        </span>
      </td>
      <td className="py-3 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(student.roll)}
            className="px-3 py-1 rounded bg-yellow-300 hover:bg-yellow-400 text-sm font-medium transition"
          >
            Edit
          </button>
          <button
            onClick={() => { if (confirm("Delete this student?")) onDelete(student.roll) }}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm font-medium text-white transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
