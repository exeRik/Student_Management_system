export default function StudentTable({ title, students, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>

      <table className="w-full min-w-[100px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 text-left min-w-[100px]">Name</th>
            <th className="px-4 py-2 text-left">Roll</th>
            <th className="px-4 py-2 text-left">Marks</th>
            <th className="px-4 py-2 text-left">Gender</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.roll}</td>
                <td className="px-4 py-2">{s.marks}</td>
                <td className="px-4 py-2">{s.gender}</td>
                <td className="px-4 py-2">{s.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-6 text-center text-gray-500 italic"
              >
                No students available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
