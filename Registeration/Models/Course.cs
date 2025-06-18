namespace Registeration.Models;

public partial class Course
{
    public Guid Id { get; set; }

    public string CourseName { get; set; } = null!;

    public string CourseId { get; set; } = null!;

    public string CourseDescription { get; set; } = null!;

    public int Credits { get; set; }

    //public virtual ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();
}