using Backend.Models;

namespace Backend.Services.Contract
{
    public interface IDirectorService
    {
        Task<List<Director>> GetList();

        Task<Director> Get(int idDirector);

        Task<Director> Add(Director model);

        Task<bool> Update(Director model);

        Task<bool> Delete(Director model);
    }
}
