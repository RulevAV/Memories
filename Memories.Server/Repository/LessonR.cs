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

        public async Task<Card> GetCard(Guid idCard, Guid idUser, bool isGlobal)
        {
            var lesson = _context.Lessons.Where(x => x.Idcardstart == idCard 
                                                     && x.Iduser == idUser
                                                     && x.Isglobal == isGlobal).FirstOrDefault();
            if (lesson == null)
            {
                lesson = new Lesson()
                {
                    Idcardstart = idCard,
                    Iduser = idUser,
                    Isglobal = isGlobal
                };
                _context.Lessons.Add(lesson);
                await _context.SaveChangesAsync();
            }

            var sqlCard = $@"         
with ids as (         
SELECT * FROM public.generate_uuid_list('29eeafc3-f401-48bc-a5e2-08d97c0a997b')
WHERE uuid NOT IN (
    SELECT ""idCard""
    FROM ""cardIgnore""
    WHERE ""idLesson"" = 'fed58848-ea2e-49d3-99f6-68e9f59a2c69'
)
)
select * from ids s
left join card c on c.""Id"" = s.uuid
";
            var card = await _context.Cards.FromSqlRaw(sqlCard).FirstAsync();
            return card;
        }
     }
}
