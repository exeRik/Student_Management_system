export const isDuplicateRoll = (students, roll, excludeIndex = null) => {
  return students.some((s, idx) => idx !== excludeIndex && String(s.roll) === String(roll));
};
