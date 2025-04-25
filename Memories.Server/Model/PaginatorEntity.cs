using Memories.Server.Entities;

namespace Memories.Server.Model
{
    public class PaginatorEntity<T>
    {
        public List<T> Elements { get; set; }
        public int TotalCount { get; set; }
    }
}
