import React from "react";

export default function StudentTable({ title, students, onEdit, onDelete }) {
  const cellClass = "px-1 py-2 text-left"; // shared cell style
  const rowClass = "hover:bg-gray-50 transition-colors border-b";

  // Columns to display (except Actions)
  const columns = ["name", "roll", "marks", "gender", "status"];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>

      <table className="w-full min-w-[10px] border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={cellClass + (col === "name" ? " min-w-[10px]" : "")}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
            <th className={cellClass}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id} className={rowClass}>
                {columns.map((col) => (
                  <td key={col} className={cellClass}>
                    {s[col]}
                  </td>
                ))}
                <td className={cellClass + " space-x-2"}>
                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-6 text-center text-gray-500 italic"
              >
                No students available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
