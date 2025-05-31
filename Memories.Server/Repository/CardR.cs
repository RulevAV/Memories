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
using System.Xml.Linq;

namespace Memories.Server.Services
{
    public class CardR : BaseR, ICardR
    {
        private readonly IConfiguration _configuration;

        public CardR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }

        public async Task<PaginatorEntity<Card>> Cards(Guid IdUser, int page, int pageSize, Guid areaId, string? search, Guid? IdParent)
        {
            // Построение запроса
            var request = _context.Cards.AsQueryable();

// Фильтрация по IdUser
            request = request.Where(u => u.IdArea == areaId && u.IdParent == IdParent);

// Фильтрация по имени, если оно указано
            if (!string.IsNullOrEmpty(search))
            {
                request = request.Where(u => EF.Functions.ILike(u.Title, $"%{search}%") || EF.Functions.ILike(u.Content, $"%{search}%"));
            }

// Обязательно добавляем сортировку перед пропуском и выборкой
            request = request.OrderByDescending(u => u.Number);

// Получение элементов с пагинацией
            var elements = await request
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();

// Подсчёт общего количества элементов
            var totalCount = await request.CountAsync();

            return new PaginatorEntity<Card>()
            {
                Elements = elements,
                TotalCount = totalCount
            };
        }

        public async Task<Card> Create(Guid IdUser, CardModel model)
        {

            var card = new Card()
            {
                Id = Guid.NewGuid(),
                Title = model.Title,
                Content = model.Content,
                IdParent = model.IdParent,
                IdArea = model.IdArea,
            };
            if (model.File != null && model.File.Length > 0)
            {
                using (var stream = model.File.OpenReadStream())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);
                        card.Img = memoryStream.ToArray();
                        card.MimeType = model.File.ContentType;
                    }
                }
            }

            var item = _context.Cards.Add(card);
            _context.SaveChanges();
            return card;
        }

        public async Task<Card> Update(Guid UserId, CardModel model)
        {
            var card = _context.Cards.First(u => u.Id == model.Id);
            card.Title = model.Title;
            card.Content = model.Content;
            if (model.File != null && model.File.Length > 0)
            {
                using (var stream = model.File.OpenReadStream())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);
                        card.Img = memoryStream.ToArray();
                        card.MimeType = model.File.ContentType;
                    }
                }
            }

            var item = _context.Cards.Update(card);
            _context.SaveChanges();
            return card;
        }
       
        public async Task<int> Delete(Guid UserId, Guid idCard)
        {
            var card = await _context.Cards.Include(u => u.IdAreaNavigation).FirstOrDefaultAsync(u => u.Id == idCard);
            if (card.IdAreaNavigation.IdUser == UserId)
            {
               _context.Cards.Remove(card);
               return _context.SaveChanges();
            }
            return 1;
        }
    }
}
