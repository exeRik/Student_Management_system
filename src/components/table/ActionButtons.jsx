import React from "react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button onClick={onEdit} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
      <button onClick={onDelete} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
    </div>
  );
}
