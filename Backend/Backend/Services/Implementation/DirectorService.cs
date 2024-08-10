using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services.Contract;

namespace Backend.Services.Implementation
{
    public class DirectorService : IDirectorService
    {
        private DbmoviesContext _dbcontext;//Contexto a BD

        //Inyectar por dependecia el contexto a la BD
        public DirectorService(DbmoviesContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<Director>> GetList()
        {
            try
            {
                List<Director> list = new List<Director>();

                list = await _dbcontext.Directors.ToListAsync();

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Director> Get(int idDirector)
        {
            try
            {
                Director? director = new Director();

                director = await _dbcontext.Directors.
                    Where(id => id.Pkdirector == idDirector).FirstOrDefaultAsync();

                return director;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Director> Add(Director model)
        {
            try
            {
                _dbcontext.Directors.Add(model);

                await _dbcontext.SaveChangesAsync();

                return model;

            }
            catch(Exception ex)
            {
               throw new Exception(ex.Message);
            }
        }

        public async Task<bool> Update(Director model)
        {
            try
            {
                _dbcontext.Directors.Update(model);

                await _dbcontext.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> Delete(Director model)
        {
            try
            {
                _dbcontext.Directors.Remove(model);

                await _dbcontext.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
               throw new Exception(ex.Message);
            }
        }

    }
}
