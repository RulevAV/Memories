namespace Memories.Server.Entities.NoDb
{
    public class CardModel: Card
    {
        public override Area? IdAreaNavigation { get; set; } // = null!;
    }
}
