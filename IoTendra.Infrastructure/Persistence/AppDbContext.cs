using IoTendra.Domain.Entities;
using IoTendra.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IoTendra.Infrastructure.Persistence;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Sensor> Sensors { get; set; } = null!;
    public DbSet<SensorReading> SensorReadings { get; set; } = null!;
    public DbSet<Device> Devices { get; set; } = null!;
    public DbSet<Rule> Rules { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Sensor>()
            .HasMany(s => s.Readings)
            .WithOne(r => r.Sensor)
            .HasForeignKey(r => r.SensorId);
    }
}
