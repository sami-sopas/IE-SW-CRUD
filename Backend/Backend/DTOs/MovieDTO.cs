namespace Backend.DTOs
{
    public class MovieDTO
    {
        public int Pkmovies { get; set; }

        public string? Name { get; set; }

        public string? Gender { get; set; }

        public string? Duration { get; set; }

        public int? Fkdirector { get; set; }

        public string? DirectorName { get; set; }
    }
}
