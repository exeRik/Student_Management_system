import React from "react";

export default function StatsCard({ title, children }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
}
