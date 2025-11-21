using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IoTendra.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IoTendra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok(new { message = "API çalışıyor", timestamp = DateTime.Now });
    }

    public class RegisterRequest
    {
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class LoginRequest
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.UserName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Tüm alanlar gereklidir" });
            }

            var existingUser = await _userManager.FindByNameAsync(request.UserName);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Bu kullanıcı adı zaten kullanılıyor" });
            }

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
            {
                return BadRequest(new { message = "Bu e-posta adresi zaten kullanılıyor" });
            }

            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return BadRequest(new { message = errors });
            }

            return Ok(new { message = "Kullanıcı başarıyla oluşturuldu" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Sunucu hatası: " + ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.UserName) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Kullanıcı adı ve şifre gereklidir" });
            }

            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user == null)
            {
                return Unauthorized(new { message = "Kullanıcı adı veya şifre hatalı" });
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Kullanıcı adı veya şifre hatalı" });
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token, message = "Giriş başarılı" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Sunucu hatası: " + ex.Message });
        }
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var jwtSection = _configuration.GetSection("Jwt");
        var key = jwtSection["Key"]!;
        var issuer = jwtSection["Issuer"]!;
        var audience = jwtSection["Audience"]!;
        var expireMinutes = double.Parse(jwtSection["ExpireMinutes"]!);

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
