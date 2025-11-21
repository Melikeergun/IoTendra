using IoTendra.Domain.Entities;
using IoTendra.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IoTendra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // JWT zorunlu
public class SensorsController : ControllerBase
{
    private readonly AppDbContext _db;

    public SensorsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Sensor>>> GetAll()
    {
        var sensors = await _db.Sensors.AsNoTracking().ToListAsync();
        return Ok(sensors);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Sensor>> GetById(Guid id)
    {
        var sensor = await _db.Sensors
            .Include(s => s.Readings)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (sensor == null)
            return NotFound();

        return Ok(sensor);
    }

    // İleride Create/Update/Delete ekleyeceğiz.
}
