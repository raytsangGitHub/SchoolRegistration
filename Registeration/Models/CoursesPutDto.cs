﻿namespace Registeration.Models
{
    public class CoursesPutDto
    {
        public string CourseName { get; set; } = null!;

        public string CourseId { get; set; } = null!;

        public string CourseDescription { get; set; } = null!;

        public int Credits { get; set; }
    }
}