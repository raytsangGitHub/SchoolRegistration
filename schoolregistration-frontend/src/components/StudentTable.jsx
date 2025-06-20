// src/components/StudentTable.jsx
import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef
} from "react";

const StudentTable = forwardRef((props, ref) =>
{
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(1);

    const loadStudents = () =>
    {
        fetch("https://registeration.fly.dev/api/students")
            .then((res) => res.json())
            .then((data) =>
            {
                setStudents(data);
                setTotalPages(Math.ceil(data.length / pageSize));
            })
            .catch((err) => console.error("Error loading students:", err));
    };

    useImperativeHandle(ref, () => ({
        refresh: () =>
        {
            loadStudents();
        },
    }));

    useEffect(() =>
    {
        loadStudents();
    }, []);

    const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
    const paginatedStudents = students.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Student ID</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Enrollment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStudents.map((s) => (
                        <tr key={s.studentId}>
                            <td className="border p-2">{s.firstName}</td>
                            <td className="border p-2">{s.lastName}</td>
                            <td className="border p-2">{s.studentId}</td>
                            <td className="border p-2">{s.email}</td>
                            <td className="border p-2">{new Date(s.enrollmentDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
});

export default StudentTable;
