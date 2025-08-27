import React from "react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1.5 bg-green-800 hover:bg-yellow-500 text-white font-medium rounded-lg shadow-sm transition"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1.5 bg-red-800 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition"
      >
        Delete
      </button>
    </div>
  );
}
