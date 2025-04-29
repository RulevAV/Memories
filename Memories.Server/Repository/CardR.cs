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
                request = request.Where(u => EF.Functions.ILike(u.Title, $"{search}%") || EF.Functions.ILike(u.Content, $"{search}%"));
            }

            // Выполните запрос и получите элементы
            var elements = await request.Skip(page * pageSize)
                                         .Take(pageSize)
                                         .ToListAsync();


            return new PaginatorEntity<Card>()
            {
                Elements = await request.Skip(page * pageSize).OrderByDescending(u=>u.Number)
                .Take(pageSize)
                .ToListAsync(),
                TotalCount = await request.CountAsync()
            };
        }

        public async Task<Card> Create(Guid IdUser, Card card)
        {
            card.Id = Guid.NewGuid();
            _context.Add(card);
            _context.SaveChanges();
            return card;
        }

        public async Task<Card> Update(Guid UserId, Card card)
        {
            _context.Cards.Update(card);
            _context.SaveChanges();
            return card;
        }
    }
}
