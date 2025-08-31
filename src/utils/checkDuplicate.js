
export const isDuplicateRoll = (students, roll, currentRoll = null) => {
  return students.some(
    (s) => s.roll === roll && s.roll !== currentRoll
  );
};
