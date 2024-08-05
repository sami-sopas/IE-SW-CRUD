using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Director
{
    public int Pkdirector { get; set; }

    public string? Name { get; set; }

    public int? Age { get; set; }

    public bool? Active { get; set; }

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
