using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Movie
{
    public int Pkmovies { get; set; }

    public string? Name { get; set; }

    public string? Gender { get; set; }

    public TimeOnly? Duration { get; set; }

    public int? Fkdirector { get; set; }

    public virtual Director? FkdirectorNavigation { get; set; }
}
