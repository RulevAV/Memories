using Memories.Server.Entities;
using Npgsql;

namespace Memories.Server.Services.Core
{
    public class BaseR
    {
        protected conMemories _context;
        protected NpgsqlConnection _npgsqlCon;

        protected BaseR(conMemories context, NpgsqlConnection npgsqlCon)
        {
            _context = context;
            _npgsqlCon = npgsqlCon;

        }
    }
}
