import React from "react";

export default function TableRow({ student, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      <td className="py-2">{student.name}</td>
      <td className="py-2">{student.roll}</td>
      <td className="py-2">{student.marks}</td>
      <td className={`py-2 font-medium ${student.status === "Pass" ? "text-green-600" : "text-red-600"}`}>
        {student.status}
      </td>
      <td className="py-2">
        <div className="flex gap-2">
          <button onClick={() => onEdit(student.roll)} className="px-2 py-1 rounded bg-yellow-300 text-sm">Edit</button>
          <button onClick={() => { if (confirm("Delete this student?")) onDelete(student.roll) }} className="px-2 py-1 rounded bg-red-400 text-sm text-white">Delete</button>
        </div>
      </td>
    </tr>
  );
}
