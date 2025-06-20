import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../api/school_reg_api';

function StudentList()
{
    const [students, setStudents] = useState([]);

    const loadStudents = async () =>
    {
        const { data } = await getAllStudents();
        setStudents(data);
    };

    const handleDelete = async (id) =>
    {
        await deleteStudent(id);-
        loadStudents();
    };

    useEffect(() =>
    {
        loadStudents();
    }, []);

    return (
        <ul>
            {students.map(student => (
                <li key={student.id}>
                    {student.name} ({student.age} years old)
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default StudentList;
