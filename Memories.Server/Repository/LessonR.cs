using Memories.Server.Entities;
using Memories.Server.Interface;
using Memories.Server.Model;
using Memories.Server.Services.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using NpgsqlTypes;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;
using Memories.Server.Entities.NoDb;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Memories.Server.Services
{
    public class LessonR : BaseR, ILessonR
    {
        private readonly IConfiguration _configuration;

        public LessonR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }
        public async Task<int> SetIgnore(Guid IdLesson, Guid IdCard)
        {
            await _context.CardIgnores.AddAsync(new CardIgnore()
            {
                IdCard = IdCard,
                IdLesson = IdLesson
            });
            _context.SaveChanges();

            return 1;
        }

        public async Task<LessonCard> GetCard(Guid idCard, Guid idUser, bool isGlobal)
        {
            var lesson = _context.Lessons.Where(x => x.Idcardstart == idCard 
                                                     && x.Iduser == idUser
                                                     && x.Isglobal == isGlobal).FirstOrDefault();
            if (lesson == null)
            {
                lesson = new Lesson()
                {
                    Id = Guid.NewGuid(),
                    Idcardstart = idCard,
                    Iduser = idUser,
                    Isglobal = isGlobal
                };
                _context.Lessons.Add(lesson);
                await _context.SaveChangesAsync();
            }

            string sqlCard = $@"
                select * from card c
                where ""IdParent"" = '{idCard}'
                and ""Id"" NOT IN (
    SELECT ""idCard""
    FROM ""cardIgnore""
    WHERE ""idLesson"" = '{lesson.Id}'
)
                and ""Id"" NOT IN (
    SELECT ""idCard""
    FROM ""userCardIgnore""
    WHERE ""idUser"" = '{idUser}'
)
";
            if (lesson.Isglobal == true)
            {
                sqlCard = $@"         
with ids as (         
SELECT * FROM public.generate_uuid_list('{idCard}')
WHERE uuid NOT IN (
    SELECT ""idCard""
    FROM ""cardIgnore""
    WHERE ""idLesson"" = '{lesson.Id}'
)
and uuid NOT IN (
    SELECT ""idCard""
    FROM ""userCardIgnore""
    WHERE ""idUser"" = '{idUser}'
)
)
select * from ids s
left join card c on c.""Id"" = s.uuid
";
            }
            var count = await _context.Cards.FromSqlRaw(sqlCard).CountAsync();
            sqlCard += $@"
ORDER BY RANDOM() 
LIMIT 1
";
            var card = await _context.Cards.FromSqlRaw(sqlCard).FirstOrDefaultAsync();
            return new LessonCard { Lesson = lesson, Card = new SCard(card, idUser),  Count = count };
        }

        public async Task<int> Clear(Guid idLesson)
        {
            var delete =  await _context.CardIgnores.Where(x => x.IdLesson == idLesson).ToListAsync();
            _context.CardIgnores.RemoveRange(delete);
            _context.SaveChanges();
            return 1;
        }
    }
}
