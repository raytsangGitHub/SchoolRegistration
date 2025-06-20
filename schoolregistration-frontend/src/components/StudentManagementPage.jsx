import React, { useState } from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import StudentTable from "./StudentTable";

const StudentManagementPage = () =>
{
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const triggerRefresh = () => setRefreshTrigger((prev) => !prev);

    return (
        <div>
            <StudentRegistrationForm onStudentAdded={triggerRefresh} />
            <StudentTable refreshTrigger={refreshTrigger} />
        </div>
    );
};

export default StudentManagementPage;
