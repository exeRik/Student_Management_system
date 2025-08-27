// Compute counts and averages
export const computeStats = (students) => {
  const total = students.length;
  const maleStudents = students.filter((s) => s.gender === "Male");
  const femaleStudents = students.filter((s) => s.gender === "Female");

  const passCount = students.filter((s) => s.status === "Pass").length;
  const failCount = students.filter((s) => s.status === "Fail").length;

  const average = (arr) => (arr.length ? (arr.reduce((acc, s) => acc + s.marks, 0) / arr.length).toFixed(2) : 0);

  const maxMarks = students.length ? Math.max(...students.map((s) => s.marks)) : 0;
  const minMarks = students.length ? Math.min(...students.map((s) => s.marks)) : 0;

  return {
    total,
    maleCount: maleStudents.length,
    femaleCount: femaleStudents.length,
    passCount,
    failCount,
    averageOverall: average(students),
    averageMale: average(maleStudents),
    averageFemale: average(femaleStudents),
    maxMarks,
    minMarks,
  };
};
