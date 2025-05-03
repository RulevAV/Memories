namespace Memories.Server.Entities.NoDb
{
    public class AreaModel
    {
        public IFormFile? File { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid>? AccessAreas { get; set; }

    }
}
