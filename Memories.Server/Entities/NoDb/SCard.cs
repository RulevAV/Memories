using System;
using System.Collections.Generic;

namespace Memories.Server.Entities.NoDb;

public partial class SCard : Card
{
    public SCard(Card c, Guid IdUser)
    {
        Id = c.Id;
        IdArea = c.IdArea;
        Title = c.Title;
        Content = c.Content;
        Img = c.Img;
        IdParent = c.IdParent;
        Number = c.Number;
        MimeType = c.MimeType;
        IdAreaNavigation = c.IdAreaNavigation;
        IdUsers = c.IdUsers.Where(u => u.Id == IdUser).ToList();
        IgnoreUserCard = c.IdUsers.Any(u => u.Id == IdUser);
    }

    public bool IgnoreUserCard { get; set; }
}