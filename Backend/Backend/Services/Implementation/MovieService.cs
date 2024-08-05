using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services.Contract;

namespace Backend.Services.Implementation
{
    public class MovieService : IMovieService
    {
        private DbmoviesContext _dbcontext;
        public MovieService(DbmoviesContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<Movie>> GetList()
        {
            try
            {
                List<Movie> list = new List<Movie>();

                list = await _dbcontext.Movies.Include(director => director.FkdirectorNavigation).ToListAsync();

                return list;
            }
            catch (Exception ex) {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Movie> Get(int idMovie)
        {
            try
            {
                Movie? movie = new Movie();

                movie = await _dbcontext.Movies.Include(director => director.FkdirectorNavigation)
                    .Where(id => id.Pkmovies == idMovie).FirstOrDefaultAsync();

                return movie;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Movie> Add(Movie model)
        {
            try
            {
                _dbcontext.Movies.Add(model);

                await _dbcontext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


        public async Task<bool> Update(Movie model)
        {
            try
            {
                _dbcontext.Movies.Update(model);

                await _dbcontext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> Delete(Movie model)
        {
            try
            {
                _dbcontext.Movies.Remove(model);

                await _dbcontext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
