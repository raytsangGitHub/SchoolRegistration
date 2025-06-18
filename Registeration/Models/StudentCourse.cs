using System;
using System.Collections.Generic;

namespace Registeration.Models;

public partial class StudentCourse
{
    public Guid StudentCourseId { get; set; }

    public Guid StudentId { get; set; }

    public Guid CourseId { get; set; }

    public DateTime? EnrolledOn { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
