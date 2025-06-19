namespace Registeration.Models
{
    public class StudentPutDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string StudenId { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateOnly EnrollmentDate { get; set; }
    }
}