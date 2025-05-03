using Memories.Server.Entities;
using Memories.Server.Interface;
using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Memories.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ILogger<AuthenticateController> _logger;
        IAuthenticateR _authenticateR;
        public AuthenticateController(ILogger<AuthenticateController> logger, IAuthenticateR authorizationR )
        {
            _logger = logger;
            _authenticateR = authorizationR;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var Token = await _authenticateR.Login(model);
            return Ok(Token);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            
            try
            {
                var Token = await _authenticateR.Register(model);
                return Ok(Token);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenModel tokenModel)
        {
            try
            {
                var Token = await _authenticateR.RefreshToken(tokenModel);
                return Ok(Token);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
           
        }
    }

}

