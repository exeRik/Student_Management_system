import React from "react";

export default function StatsCard({ title, children }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-bold text-gray-700 mb-3">{title}</h3>
      <div className="text-gray-900 text-2xl font-semibold">
        {children}
      </div>
    </div>
  );
}
