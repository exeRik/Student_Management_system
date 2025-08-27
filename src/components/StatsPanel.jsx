import React from "react";
import StatsCard from "./StatsCard"; 
import { computeStats } from "../utils/stats";

export default function StatsPanel({ students }) {
  const stats = computeStats(students);

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg mt-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Students">
          <p className="text-3xl font-extrabold text-blue-600">{stats.total}</p>
        </StatsCard>

        <StatsCard title="Gender Distribution">
          <p className="text-gray-700">Male: <span className="font-semibold text-blue-500">{stats.maleCount}</span> ({stats.total ? ((stats.maleCount / stats.total) * 100).toFixed(1) : 0}%)</p>
          <p className="text-gray-700">Female: <span className="font-semibold text-pink-500">{stats.femaleCount}</span> ({stats.total ? ((stats.femaleCount / stats.total) * 100).toFixed(1) : 0}%)</p>
        </StatsCard>

        <StatsCard title="Pass / Fail">
          <p className="text-green-600 font-semibold">Pass: {stats.passCount} ({stats.total ? ((stats.passCount / stats.total) * 100).toFixed(1) : 0}%)</p>
          <p className="text-red-600 font-semibold">Fail: {stats.failCount} ({stats.total ? ((stats.failCount / stats.total) * 100).toFixed(1) : 0}%)</p>
        </StatsCard>

        <StatsCard title="Average Marks">
          <p className="text-gray-700">Overall: <span className="font-semibold">{stats.averageOverall}</span></p>
          <p className="text-blue-500 font-semibold">Male: {stats.averageMale}</p>
          <p className="text-pink-500 font-semibold">Female: {stats.averageFemale}</p>
        </StatsCard>

        <StatsCard title="Marks Range">
          <p className="text-gray-700">Highest: <span className="font-semibold">{stats.maxMarks}</span></p>
          <p className="text-gray-700">Lowest: <span className="font-semibold">{stats.minMarks}</span></p>
        </StatsCard>
      </div>
    </div>
  );
}
