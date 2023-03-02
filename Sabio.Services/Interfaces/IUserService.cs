using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        Task<bool> LogInAsync(string email, string password);
        Task<bool> LogInTest(string email, string password, int id, string[] roles = null);
        int Create(UserAddRequest model);
        string CreateNewUserToken(int userId);
        void UpdateUserConfirm(int id, string token);
        string CreateResetPasswordToken(int userId);
        int GetUserIdFromEmail(string email);
        bool CompareUserTokenById(int userId, int tokenTypeId, string userToken);
        void UpdateUserPassword(UserPasswordResetRequest model);
        User GetUserById(int id);
    }
}