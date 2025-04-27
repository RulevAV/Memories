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
    public class UserR : BaseR, IUserR
    {
        private readonly IConfiguration _configuration;

        public UserR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }
        public User GetUser(Guid userId)
        {
            User user = _context.Users.First(u => u.Id == userId);
            return user;
        }
        public User PostUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        public User PutUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        public User DeleteUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        public async Task<PaginatorEntity<User>> Users(int page, int pageSize, string? login, string? email, int? codeRole)
        {
            var sql = $@"
SELECT DISTINCT u.*
FROM public.""users"" u
LEFT JOIN public.""userRoles"" ur ON ur.""IdUser"" = u.""Id""
LEFT JOIN public.""roles"" r ON ur.""CodeRoles"" = r.""Code""
WHERE u.""Login"" ILIKE '%{login?.Trim()}%'
AND u.""Email"" ILIKE '%{email?.Trim()}%'
{(codeRole == null ? "" : $@" AND r.""Code"" = {codeRole}")}";

            int totalCount = await _context.Users.FromSqlRaw(sql).CountAsync();

            var sqlRole = $@"
SELECT DISTINCT u.*
FROM public.""users"" u
LEFT JOIN public.""userRoles"" ur ON ur.""IdUser"" = u.""Id""
LEFT JOIN public.""roles"" r ON ur.""CodeRoles"" = r.""Code""
WHERE u.""Login"" ILIKE '%{login?.Trim()}%'
AND u.""Email"" ILIKE '%{email?.Trim()}%'
{(codeRole == null ? "" : $@" AND r.""Code"" = {codeRole}")}
ORDER by u.""Login""
limit {pageSize} offset {page * pageSize}
";

            List<User> users = await _context.Users.FromSqlRaw(sqlRole)
                .Include(u => u.CodeRoles)  // В зависимости от структуры может не работать
                .ToListAsync();
            return new PaginatorEntity<User>()
            {
                Elements = users,
                TotalCount = totalCount
            };
        }
        public async Task<List<Role>> Roles(int page, int pageSize)
        {
            int totalCount = await _context.Users.CountAsync();

            // Fetching paginated results
            var roles = await _context.Roles.ToListAsync();
            return roles;
        }
        public async Task<User> Update(User userModel)
        {
            var user2 = _context.Users.First(u => u.Email == userModel.Email);
            if (user2.Id != userModel.Id) {
                throw new Exception("Эта почта занята!");
            }
            var sql = $@"
UPDATE public.users 
SET ""Email"" = '{userModel.Email}'
WHERE ""Id"" = '{userModel.Id}';

DELETE FROM public.""userRoles"" 
WHERE ""IdUser"" = '{userModel.Id}';

";

            if (userModel.CodeRoles.Count != 0)
            {
                var strValues = userModel.CodeRoles.Select(x => $@"('{userModel.Id}','{x.Code}')").ToArray();
                sql += $@"
INSERT INTO public.""userRoles""
(""IdUser"", ""CodeRoles"")
VALUES 
{string.Join(",", strValues)}
;
";
                //foreach (var item in userModel.CodeRoles)
                //{
                //    sql += $@"('{userModel.Id}','{item.Code}')";
                //}
            }

            _npgsqlCon.Open();

            using (var command = new NpgsqlCommand(sql, _npgsqlCon))
            {
                command.ExecuteNonQuery();
            }

            return userModel;
        }
    }
}
