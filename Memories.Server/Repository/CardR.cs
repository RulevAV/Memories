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

namespace Memories.Server.Services
{
    public class CardR : BaseR, ICardR
    {
        private readonly IConfiguration _configuration;

        public CardR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }

        public Task<PaginatorEntity<Card>> Areas(Guid IdUser, int page, int pageSize, string? login, Guid? idGuest)
        {
            throw new NotImplementedException();
        }

        public async Task<Card> Create(Guid IdUser, Card card)
        {
            card.Id = Guid.NewGuid();
            _context.SaveChanges();
            return card;
        }

        public Task<Area> Update(Guid UserId, Card area)
        {
            throw new NotImplementedException();
        }
    }
}
