using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoTendra.Domain.Entities;

public class SensorReading
{
    public long Id { get; set; }
    public Guid SensorId { get; set; }
    public Sensor Sensor { get; set; } = null!;
    public DateTime Timestamp { get; set; }
    public double Value { get; set; }
}
