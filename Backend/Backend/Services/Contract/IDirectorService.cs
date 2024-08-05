using Backend.Models;

namespace Backend.Services.Contract
{
    public interface IDirectorService
    {
        Task<List<Director>> GetList();
    }
}
