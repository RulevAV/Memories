namespace Memories.Server.Entities.NoDb;

public class LessonCard
{
    public Lesson Lesson { get; set; }
    public Card Card { get; set; }
    public int Count { get; set; }
}