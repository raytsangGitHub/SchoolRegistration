using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registeration.Models;

namespace Registeration.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly SchoolDbContext _context;

    public StudentsController(SchoolDbContext context)
    {
        _context = context;
    }

    // GET: api/students
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        return await _context.Students.ToListAsync();
    }

    // GET: api/students/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(Guid id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null) return NotFound();
        return student;
    }

    // POST: api/students
    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(StudentPostDto dto)
    {
        var student = new Student
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            StudenId = dto.StudenId,
            Email = dto.Email,
            EnrollmentDate = dto.EnrollmentDate
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
    }

    // PUT: api/students/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(Guid id, Student student)
    {
        if (id != student.Id) return BadRequest();

        _context.Entry(student).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Students.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // DELETE: api/students/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(Guid id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null) return NotFound();

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}