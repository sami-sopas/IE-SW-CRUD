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
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
