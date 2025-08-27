import { useForm } from "react-hook-form";
import { useEffect } from "react";

const StudentForm = ({ students, addStudent, editStudent, updateStudent }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editStudent) {
      setValue("name", editStudent.name);
      setValue("roll", editStudent.roll);
      setValue("marks", editStudent.marks);
      setValue("gender", editStudent.gender);
    } else {
      reset();
    }
  }, [editStudent, setValue, reset]);

  const onSubmit = (data) => {
    const newStudent = {
      ...data,
      id: editStudent ? editStudent.id : Date.now(),
      marks: Number(data.marks),
      status: Number(data.marks) >= 40 ? "Pass" : "Fail"
    };

    // Unique roll validation
    const isDuplicate = students.some(s => s.roll === data.roll && s.id !== (editStudent?.id || 0));
    if (isDuplicate) {
      alert("Roll number must be unique!");
      return;
    }

    editStudent ? updateStudent(newStudent) : addStudent(newStudent);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-md">
      <div className="mb-2">
        <input {...register("name", { required: true })} placeholder="Name" className="border p-2 w-full"/>
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>

      <div className="mb-2">
        <input {...register("roll", { required: true })} placeholder="Roll No" className="border p-2 w-full"/>
        {errors.roll && <span className="text-red-500">Roll No is required</span>}
      </div>

      <div className="mb-2">
        <input type="number" {...register("marks", { required: true, min:0, max:100 })} placeholder="Marks" className="border p-2 w-full"/>
        {errors.marks && <span className="text-red-500">Marks must be 0-100</span>}
      </div>

      <div className="mb-2">
        <select {...register("gender", { required: true })} className="border p-2 w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span className="text-red-500">Gender is required</span>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
