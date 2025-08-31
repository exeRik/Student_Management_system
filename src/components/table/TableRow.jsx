import React from "react";
import ActionButtons from "./ActionButtons";

export default function TableRow({ student, onEdit, onDelete }) {
  const statusColor =
    student.status === "Pass"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="border-b p-3">{student.name}</td>
      <td className="border-b p-3">{student.roll}</td>
      <td className="border-b p-3">{student.marks}</td>
      <td className="border-b p-3">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {student.status}
        </span>
      </td>
      <td className="border-b p-3">
        <ActionButtons
          onEdit={() => onEdit(student.roll)}
          onDelete={() => onDelete(student.roll)}
        />
      </td>
    </tr>
  );
}
