﻿using Memories.Server.Entities;
using Memories.Server.Entities.NoDb;
using Memories.Server.Interface;
using Memories.Server.Model;
using Memories.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Data;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScienceAreaController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IAreaR _areaR;

        public ScienceAreaController(ILogger<UserController> logger, IAreaR areaR)
        {
            _logger = logger;
            _areaR = areaR;
        }
        [Authorize]
        [HttpPost("[action]")]
        public async Task<Area> CreateArea([FromForm] AreaModel model) // Используем модель
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _areaR.CreateArea(Guid.Parse(userId), model);

        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<PaginatorEntity<Area>> Areas(int page, int pageSize, string? name, Guid? idGuest)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _areaR.Areas(Guid.Parse(userId), page, pageSize, name, idGuest);
        }


        [HttpPost("[action]")]
        [Authorize]
        public async Task<Area> Update([FromForm] AreaModel model)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _areaR.Update(Guid.Parse(userId), model);
        }
    }
}


