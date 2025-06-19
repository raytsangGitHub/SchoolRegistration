using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registeration.Models;

namespace Registeration.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly SchoolDbContext _context;

    public CoursesController(SchoolDbContext context)
    {
        _context = context;
    }

    // GET: api/courses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {
        return await _context.Courses.ToListAsync();
    }

    // GET: api/courses/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(Guid id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null) return NotFound();
        return course;
    }

    // POST: api/courses
    [HttpPost]
    public async Task<ActionResult<Course>> PostCourse(CoursesPostDto dto)
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseName = dto.CourseName,
            CourseId = dto.CourseId,
            CourseDescription = dto.CourseDescription,
            Credits = dto.Credits
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
    }

    // PUT: api/courses/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCourse(Guid id, CoursesPutDto dto)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
            return NotFound();

        course.CourseName = dto.CourseName;
        course.CourseId = dto.CourseId;
        course.CourseDescription = dto.CourseDescription;
        course.Credits = dto.Credits;

        await _context.SaveChangesAsync();

        return Ok(course);
    }

    // DELETE: api/courses/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(Guid id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null) return NotFound();

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}