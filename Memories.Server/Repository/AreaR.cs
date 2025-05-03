using Memories.Server.Entities;
using Memories.Server.Entities.NoDb;
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
using System.Xml.Linq;

namespace Memories.Server.Services
{
    public class AreaR : BaseR, IAreaR
    {
        private readonly IConfiguration _configuration;

        public AreaR(conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration) : base(context, npgsqlCon)
        {
            _configuration = configuration;
        }

        public async Task<Area> CreateArea(Guid IdUser, AreaModel model)
        {
            var _area = new Area()
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                IdUser = IdUser
            };
            if (model.File != null && model.File.Length > 0)
            {
                using (var stream = model.File.OpenReadStream())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);
                        _area.Img = memoryStream.ToArray();
                        _area.MimeType = model.File.ContentType;
                    }
                }
            }
            if (model.AccessAreas != null)
            {
                foreach (var guest in model.AccessAreas)
                {

                    _area.AccessAreas.Add(new AccessArea()
                    {
                        IdOwner = IdUser,
                        IdGuest = guest,
                        IdArea = _area.Id,
                        IsEditing = false
                    });
                }
                ;
            }
           

            var item = _context.Areas.Add(_area);
            _context.SaveChanges();
            return _area;
        }

        public async Task<PaginatorEntity<Area>> Areas(Guid IdUser, int page, int pageSize, string? name, Guid? idGuest)
        {
            // Построение запроса
            var request = _context.Areas.AsQueryable();

            // Фильтрация по IdUser
            request = request.Where(u => u.IdUser == IdUser);

            // Фильтрация по имени, если оно указано
            if (!string.IsNullOrEmpty(name))
            {
                request = request.Where(u => EF.Functions.ILike(u.Name, $"{name}%"));
            }

            // Фильтрация по idGuest, если он указан
            if (idGuest.HasValue)
            {
                request = request.Where(u => u.AccessAreas.Any(a => a.IdGuest == idGuest));
            }

            // Включение связанных данных
            request = request.Include(u => u.AccessAreas).ThenInclude(a => a.IdGuestNavigation);

            // Выполните запрос и получите элементы
            var elements = await request.OrderByDescending(u => u.Number).Skip(page * pageSize)
                                         .Take(pageSize)
                                         .ToListAsync();


            return new PaginatorEntity<Area>()
            {
                Elements = elements,
                TotalCount = elements.Count()
            };
        }

        public async Task<Area> Update(Guid IdUser, AreaModel model)
        {

            var sql = $@"
            UPDATE public.area 
            SET ""Name"" = '{model.Name}'
            WHERE ""Id"" = '{model.Id}';

            DELETE FROM public.""accessArea"" 
            WHERE ""IdArea"" = '{model.Id}' and ""IdOwner"" = '{IdUser}';

            ";

            if (model.AccessAreas != null && model.AccessAreas.Count != 0)
            {
                var strValues = model.AccessAreas.Select(Id => $@"('{IdUser}','{Id}', '{model.Id}',  false)").ToArray();
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

            var area = _context.Areas.First(u=>u.Id == model.Id);
            if (model.File != null && model.File.Length > 0)
            {
                using (var stream = model.File.OpenReadStream())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);
                        area.Img = memoryStream.ToArray();
                        area.MimeType = model.File.ContentType;
                    }
                }
            }
            _context.SaveChanges();

            return area;
        }
    }
}
