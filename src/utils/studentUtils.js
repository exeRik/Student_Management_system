// Converts marks to number and computes status
import { computeStatus } from "./computeStatus";

// Prepare student object before add/update
export const prepareStudent = (data) => {
  const marks = Number(data.marks);
  return {
    ...data,
    marks,
    status: computeStatus(marks),
  };
};

// Check for duplicate roll
export const isDuplicateRoll = (students, roll, currentRoll = null) => {
  return students.some(s => s.roll === roll && s.roll !== currentRoll);
};
