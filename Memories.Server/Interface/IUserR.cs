using Memories.Server.Entities;
using Memories.Server.Model;
using Memories.Server.Entities.NoDb;

namespace Memories.Server.Interface
{
    public interface IUserR
    {
        public SUser GetUser(Guid userId);
        public SUser PostUser();
        public SUser PutUser();
        public SUser DeleteUser();
        public Task<PaginatorEntity<SUser>> Users(int page, int pageSize, string? login, string? email, int? codeRole);
        public Task<List<Role>> Roles(int page, int pageSize);
        public Task<SUser> Update(SUser user);
    }
}
