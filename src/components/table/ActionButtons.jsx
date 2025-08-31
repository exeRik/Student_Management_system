import React from "react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1 rounded bg-blue-900 hover:bg-blue-700 text-sm font-medium  text-white transition"
      >
        Edit
      </button>
      <button
        onClick={() => {
          if (confirm("Delete this student?")) onDelete();
        }}
        className="px-3 py-1 rounded bg-red-900 hover:bg-red-700 text-sm font-medium text-white transition"
      >
        Delete
      </button>
    </div>
  );
}
