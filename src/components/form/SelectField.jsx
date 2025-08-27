import React from "react";

export default function SelectField({ label, register, name, options }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select {...register(name, { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
