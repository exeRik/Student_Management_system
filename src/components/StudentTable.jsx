export default function StudentTable({ title, students, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Marks</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.marks}</td>
              <td>{s.gender}</td>
              <td>{s.status}</td>
              <td className="space-x-2">
                <button onClick={() => onEdit(s)} className="px-2 py-1 bg-yellow-400 text-white rounded">Edit</button>
                <button onClick={() => onDelete(s.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
