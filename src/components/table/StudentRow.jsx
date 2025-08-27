import React from "react";
import ActionButtons from "./ActionButtons";

export default function StudentRow({ student, index, onEdit, onDelete }) {
  return (
    <tr>
      <td className="border p-2">{student.roll}</td>
      <td className="border p-2">{student.name}</td>
      <td className="border p-2">{student.marks}</td>
      <td className="border p-2">{student.status}</td>
      <td className="border p-2">
        <ActionButtons onEdit={() => onEdit(index)} onDelete={() => onDelete(index)} />
      </td>
    </tr>
  );
}
