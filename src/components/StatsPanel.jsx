import React, { useMemo } from "react";

export default function StatsPanel({ students }) {
  const total = students.length;

  const maleCount = students.filter(s => s.gender === "Male").length;
  const femaleCount = students.filter(s => s.gender === "Female").length;

  const passCount = students.filter(s => s.status === "Pass").length;
  const failCount = students.filter(s => s.status === "Fail").length;

  const averageMarks = useMemo(() => {
    if (total === 0) return 0;
    return (students.reduce((acc, s) => acc + s.marks, 0) / total).toFixed(2);
  }, [students, total]);

  const maleAverage = useMemo(() => {
    const males = students.filter(s => s.gender === "Male");
    if (!males.length) return 0;
    return (males.reduce((acc, s) => acc + s.marks, 0) / males.length).toFixed(2);
  }, [students]);

  const femaleAverage = useMemo(() => {
    const females = students.filter(s => s.gender === "Female");
    if (!females.length) return 0;
    return (females.reduce((acc, s) => acc + s.marks, 0) / females.length).toFixed(2);
  }, [students]);

  const maxMarks = students.length ? Math.max(...students.map(s => s.marks)) : 0;
  const minMarks = students.length ? Math.min(...students.map(s => s.marks)) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Student Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Total Students</h3>
          <p className="text-2xl">{total}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Gender Distribution</h3>
          <p>Male: {maleCount} ({total ? ((maleCount / total) * 100).toFixed(1) : 0}%)</p>
          <p>Female: {femaleCount} ({total ? ((femaleCount / total) * 100).toFixed(1) : 0}%)</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Pass / Fail</h3>
          <p>Pass: {passCount} ({total ? ((passCount / total) * 100).toFixed(1) : 0}%)</p>
          <p>Fail: {failCount} ({total ? ((failCount / total) * 100).toFixed(1) : 0}%)</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Average Marks</h3>
          <p>Overall: {averageMarks}</p>
          <p>Male: {maleAverage}</p>
          <p>Female: {femaleAverage}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Marks Range</h3>
          <p>Highest: {maxMarks}</p>
          <p>Lowest: {minMarks}</p>
        </div>
      </div>
    </div>
  );
}
