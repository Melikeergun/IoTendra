using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoTendra.Domain.Entities;

public class Sensor
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public string Topic { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public bool IsActive { get; set; } = true;

    public ICollection<SensorReading> Readings { get; set; } = new List<SensorReading>();
}

