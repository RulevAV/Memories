﻿using Memories.Server.Entities;
using Memories.Server.Interface;
using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Data;
using System.Security.Principal;
using System.Xml.Linq;
using Memories.Server.Entities.NoDb;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private ILessonR _lessonR;

        public LessonController(ILogger<UserController> logger, ILessonR lessonR)
        {
            _logger = logger;
            _lessonR = lessonR;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<LessonCard> GetCard(Guid idCard, bool isGlobal)
        {
            string userI2d = User.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;
            var userId = User.FindFirst("Id").Value;
            return await _lessonR.GetCard(idCard, Guid.Parse(userId), isGlobal);
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<int> SetIgnore([FromQuery] Guid idCard, [FromQuery] Guid idLesson)
        {
            return await _lessonR.SetIgnore(idLesson, idCard);
        }
        
        [HttpPost("[action]")]
        [Authorize]
        public async Task<int> Clear([FromQuery] Guid idLesson)
        {
            return await _lessonR.Clear(idLesson);
        }
    }
}
