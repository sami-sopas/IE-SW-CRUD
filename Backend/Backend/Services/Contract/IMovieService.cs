using Backend.Models;

namespace Backend.Services.Contract
{
    public interface IMovieService
    {
        Task<List<Movie>> GetList();

        Task<Movie> Get(int idMovie);

        Task<Movie> Add(Movie model);

        Task<bool> Update(Movie model);

        Task<bool> Delete(Movie model);

    }
}
