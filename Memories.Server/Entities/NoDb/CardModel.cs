namespace Memories.Server.Entities.NoDb
{
    public class CardModel
    {
        public IFormFile? File { get; set; }
        public Guid Id { get; set; }

        public Guid IdArea { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }

        public byte[]? Img { get; set; }

        public Guid? IdParent { get; set; }

        public string? MimeType { get; set; }
    }
}
