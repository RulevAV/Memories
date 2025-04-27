using Memories.Server.Entities;
using Memories.Server.Interface;
using Memories.Server.Model;
using Memories.Server.Services.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Memories.Server.Services
{
    public class AreaR : BaseR, IAreaR
    {
        private readonly IConfiguration _configuration;

        public AreaR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }

        public async Task<Area> CreateArea(Guid IdUser, string name, string? img)
        {
            var area = new Area() {
                Id = Guid.NewGuid(),
                Name = name,
                Img = img,
                IdUser = IdUser
            };
            var item = _context.Areas.Add(area);
            _context.SaveChanges();
            return area;
        }

        public async Task<PaginatorEntity<Area>> Areas(Guid IdUser, int page, int pageSize, string? name, Guid? idGuest)
        {
            var request = _context.Areas.Where(u => u.IdUser == IdUser &&
                EF.Functions.ILike(u.Name, $"{name}%") &&
                u.AccessAreas.Any(a => a.IdGuest == idGuest)
                ).Include(u=>u.AccessAreas).ThenInclude(u=> u.IdGuestNavigation);

            return new PaginatorEntity<Area>()
            {
                Elements = await request.Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync(),
                TotalCount = await request.CountAsync()
            };
        }

        public async Task<Area> Update(Guid UserId, Area area, List<User> guests)
        {
            var sql = $@"
UPDATE public.area 
SET ""Name"" = '{area.Name}', ""Img"" = '{area.Img}'
WHERE ""Id"" = '{area.Id}';

DELETE FROM public.""accessArea"" 
WHERE ""IdArea"" = '{area.Id}' and ""IdOwner"" = '{UserId}';

";

            if (guests.Count != 0)
            {
                var strValues = guests.Select(x => $@"('{UserId}','{x.Id}', '{area.Id}',  false)").ToArray();
                sql += $@"
INSERT INTO public.""accessArea""(""IdOwner"",  ""IdGuest"",  ""IdArea"",  ""isEditing"")
VALUES 
{string.Join(",", strValues)}
;
";
            }

            _npgsqlCon.Open();

            using (var command = new NpgsqlCommand(sql, _npgsqlCon))
            {
                command.ExecuteNonQuery();
            }

            return area;
        }
    }
}
