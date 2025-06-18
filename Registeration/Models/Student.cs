namespace Registeration.Models;

public partial class Student
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string StudenId { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateOnly EnrollmentDate { get; set; }

    //public virtual ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();
}