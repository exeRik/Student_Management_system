import React from "react";
import ActionButtons from "./ActionButtons";

export default function TableRow({ student, onEdit, onDelete }) {
  // Status badge colors
  const statusColor =
    student.status === "Pass"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <tr className="hover:bg-gray-50 transition-colors overflow-x-auto w-full">
      <td className="border-b px-3 py-2 whitespace-nowrap">{student.roll}</td>
      <td className="border-b px-3 py-2 whitespace-nowrap">{student.name}</td>
      <td className="border-b px-3 py-2 whitespace-nowrap">{student.marks}</td>
      <td className="border-b px-3 py-2 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {student.status}
        </span>
      </td>
      <td className="border-b px-3 py-2 whitespace-nowrap">
        <ActionButtons
          onEdit={() => onEdit(student.roll)}
          onDelete={() => onDelete(student.roll)}
        />
      </td>
    </tr>
  );
}
