// src/components/StudentRegistrationForm.jsx
import React, { useState } from "react";

const StudentRegistrationForm = ({ onRegister }) =>
{
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        studentId: "",
        email: "",
        enrollmentDate: "2025-06-19",
    });

    const handleChange = (e) =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const response = await fetch("http://localhost:5191/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok)
        {
            if (onRegister) onRegister(); // 🔁 Trigger table refresh
            alert("Student registered successfully!");
        } else
        {
            const error = await response.json();
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-4 rounded shadow">
            <input name="firstName" onChange={handleChange} placeholder="First Name" className="border p-2 w-full" />
            <input name="lastName" onChange={handleChange} placeholder="Last Name" className="border p-2 w-full" />
            <input name="studentId" onChange={handleChange} placeholder="Student ID" className="border p-2 w-full" />
            <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
            <input name="enrollmentDate" onChange={handleChange} value={formData.enrollmentDate} className="border p-2 w-full" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
    );
};

export default StudentRegistrationForm;
