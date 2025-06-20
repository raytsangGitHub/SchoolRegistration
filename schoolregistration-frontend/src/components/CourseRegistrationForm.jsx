import { useState } from "react";

export default function CourseRegistrationForm()
{
    const [course, setCourse] = useState({
        courseName: "",
        courseId: "",
        courseDescription: "",
        credits: 0,
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setCourse((prev) => ({
            ...prev,
            [name]: name === "credits" ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const res = await fetch("https://registeration.fly.dev/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            });

            if (res.ok)
            {
                alert("Course registered successfully.");
                setCourse({
                    courseName: "",
                    courseId: "",
                    courseDescription: "",
                    credits: 0,
                });
            } else
            {
                const error = await res.text();
                alert("Error registering course: " + error);
            }
        } catch (error)
        {
            alert("Network error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-white shadow rounded mt-8">
            <h2 className="text-xl font-bold">Course Registration</h2>

            <input name="courseName" value={course.courseName} onChange={handleChange}
                placeholder="Course Name" className="w-full p-2 border rounded" required />

            <input name="courseId" value={course.courseId} onChange={handleChange}
                placeholder="Course ID" className="w-full p-2 border rounded" required />

            <textarea name="courseDescription" value={course.courseDescription} onChange={handleChange}
                placeholder="Course Description" className="w-full p-2 border rounded" rows="3" required />

            <input name="credits" value={course.credits} onChange={handleChange}
                placeholder="Credits" type="number" min="0" className="w-full p-2 border rounded" required />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Register Course
            </button>
        </form>
    );
}
