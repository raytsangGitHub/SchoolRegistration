// src/pages/Home.jsx
import { useRef } from "react";
import StudentRegistrationForm from "../components/StudentRegistrationForm";
import StudentTable from "../components/StudentTable";

function Home()
{
    const studentTableRef = useRef();

    const handleRegister = () =>
    {
        // Call the refresh method exposed by StudentTable
        if (studentTableRef.current)
        {
            studentTableRef.current.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <StudentRegistrationForm onRegister={handleRegister} />
            <StudentTable ref={studentTableRef} />
        </div>
    );
}

export default Home;
