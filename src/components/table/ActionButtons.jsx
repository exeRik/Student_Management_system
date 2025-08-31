import React from "react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1 rounded bg-yellow-300 hover:bg-yellow-400 text-sm font-medium transition"
      >
        Edit
      </button>
      <button
        onClick={() => {
          if (confirm("Delete this student?")) onDelete();
        }}
        className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm font-medium text-white transition"
      >
        Delete
      </button>
    </div>
  );
}
