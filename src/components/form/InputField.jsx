import React from "react";

export default function InputField({ label, register, name, type = "text", errors, min, max }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...register(name, { required: true, min, max })}
        type={type}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
      />
      {errors[name]?.type === "required" && <p className="text-xs text-red-500">{label} is required</p>}
      {errors[name]?.type === "min" && <p className="text-xs text-red-500">{label} must be at least {min}</p>}
      {errors[name]?.type === "max" && <p className="text-xs text-red-500">{label} must be at most {max}</p>}
    </div>
  );
}
