import React from "react";
import StatsCard from "./StatsCard";
import { computeStats } from "../utils/stats";

export default function StatsPanel({ students }) {
  const stats = computeStats(students);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Student Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Students">
          <p className="text-2xl">{stats.total}</p>
        </StatsCard>

        <StatsCard title="Gender Distribution">
          <p>Male: {stats.maleCount} ({stats.total ? ((stats.maleCount / stats.total) * 100).toFixed(1) : 0}%)</p>
          <p>Female: {stats.femaleCount} ({stats.total ? ((stats.femaleCount / stats.total) * 100).toFixed(1) : 0}%)</p>
        </StatsCard>

        <StatsCard title="Pass / Fail">
          <p>Pass: {stats.passCount} ({stats.total ? ((stats.passCount / stats.total) * 100).toFixed(1) : 0}%)</p>
          <p>Fail: {stats.failCount} ({stats.total ? ((stats.failCount / stats.total) * 100).toFixed(1) : 0}%)</p>
        </StatsCard>

        <StatsCard title="Average Marks">
          <p>Overall: {stats.averageOverall}</p>
          <p>Male: {stats.averageMale}</p>
          <p>Female: {stats.averageFemale}</p>
        </StatsCard>

        <StatsCard title="Marks Range">
          <p>Highest: {stats.maxMarks}</p>
          <p>Lowest: {stats.minMarks}</p>
        </StatsCard>
      </div>
    </div>
  );
}
