using System.Collections.Generic;
using System.Dynamic;

namespace Sabio.Models
{
    public interface IUserAuthData
    {
        int Id { get; }
        string Name { get; }
        IEnumerable<string> Roles { get; }
        object TenantId { get; }
        string FirstName { get; }
        string LastName { get; }
        string AvatarUrl { get; }
    }
}