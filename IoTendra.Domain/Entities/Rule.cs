using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoTendra.Domain.Entities;

public class Rule
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string ConditionExpression { get; set; } = null!;
    public string ActionType { get; set; } = null!;
    public string ActionPayload { get; set; } = null!;
    public bool IsEnabled { get; set; } = true;
}
