using Memories.Server.Entities;
using Memories.Server.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Memories.Server.Interface
{
    public interface ILessonR
    {
        public Task<int> SetIgnore(Guid idLesson, Guid idCard);
        public Task<Card> GetCard(Guid idCard, Guid idUser, bool isGlobal);
    }
}
