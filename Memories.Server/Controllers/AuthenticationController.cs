using Memories.Server.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Memories.Server.Controllers
{
    //[ApiController]
    //[Route("[controller]")]
    //public class AuthenticationController : ControllerBase
    //{
    //    private readonly ILogger<WeatherForecastController> _logger;
    //    private conMemories context;
    //    private readonly IConfiguration _config;

    //    public AuthenticationController(ILogger<WeatherForecastController> logger, conMemories con, IConfiguration config)
    //    {
    //        _logger = logger;
    //        context = con;
    //        _config = config;
    //    }

    //    [HttpPost("login")]
    //    public IActionResult Login(User loginModel)
    //    {
    //        // Authenticate user
    //        var user = context.Users.FirstOrDefault(u=> u.Login == loginModel.Login && u.Password == loginModel.Password); //_userService.Authenticate(loginModel.Username, loginModel.Password);

    //        if (user == null)
    //            return Unauthorized();

    //        // Generate tokens
    //        var accessToken = TokenUtils.GenerateAccessToken(user, _config["Jwt:Secret"]);
    //        var refreshToken = TokenUtils.GenerateRefreshToken();

    //        // Save refresh token (for demo purposes, this might be stored securely in a database)
    //        // _userService.SaveRefreshToken(user.Id, refreshToken);

    //        var response = new TokenResponse
    //        {
    //            AccessToken = accessToken,
    //            RefreshToken = refreshToken,
    //            User = user
    //        };

    //        return Ok(response);
    //    }

    //    [HttpPost("refresh")]
    //    public IActionResult Refresh(TokenResponse tokenResponse)
    //    {
    //        //if (!TokenUtils.VerifyJwtTokenSecretKey(tokenResponse.AccessToken, _config["Jwt:Secret"]))
    //        //{
    //        //    return BadRequest("Ключ шифрования токена устарел!");
    //        //}

    //        //var Id = TokenUtils.GetIdUser(tokenResponse.AccessToken);
    //        //var user = context.Users.FirstOrDefault(u => u.Id.ToString() == Id);

    //        //if (user == null)
    //        //{
    //        //    return BadRequest("Пользователь не найден");
    //        //}
            
    //        var newAccessToken = TokenUtils.GenerateAccessTokenFromRefreshToken(tokenResponse.RefreshToken, _config["Jwt:Secret"]);

    //        var response = new TokenResponse
    //        {
    //            AccessToken = newAccessToken,
    //            RefreshToken = tokenResponse.RefreshToken, // Return the same refresh token
    //            // User = user
    //        };

    //        return Ok(response);
    //    }

    //    [HttpPost("register")]
    //    public IActionResult Register(User loginModel)
    //    {
    //        loginModel.Id = Guid.NewGuid();
    //        // Authenticate user
    //        var user = context.Users.FirstOrDefault(u => u.Login == loginModel.Login || u.Mail == loginModel.Mail); //_userService.Authenticate(loginModel.Username, loginModel.Password);

    //        if (user != null)
    //            return BadRequest("Пользователь уже зарегистрирован!");

    //        context.Users.Add(loginModel);
    //        context.SaveChanges();

    //        return Ok(loginModel);
    //    }

    //    [HttpGet("[action]")]
    //    public IEnumerable<WeatherForecast> Test()
    //    {
    //        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //        {
    //            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
    //            TemperatureC = Random.Shared.Next(-20, 55),
    //            Summary = "qwe"
    //        })
    //        .ToArray();
    //    }

    //}
}
