
using DataAccessLayer.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Cors;
using BusinessLogicLayer;
using DataAccessLayer.Dto;

namespace CarRentalService.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        public IConfiguration _configuration;
        public readonly UserLogic logic;

        public UserController(IConfiguration config, UserLogic logic)
        {            
            _configuration = config;
            this.logic = logic;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Post(User loguser)
        {
            if (loguser.UserEmail != null && loguser.UserPassword != null)
            {
                var user = await logic.GetUser(loguser);
                
                if (user != null)
                {
                    if (user.UserStatus == "block")
                    {
                        return BadRequest("Account blocked cant login");
                    }
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.UserId.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("UserEmail", user.UserEmail)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }

        [HttpPost("adminlogin")]
        public async Task<IActionResult> AdminLogin(User loguser)
        {
            if (loguser.UserEmail != null && loguser.UserPassword != null)
            {
                var user = await logic.GetAdmin(loguser);

                if (user != null)
                {
                    
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.UserId.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("UserEmail", user.UserEmail)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }


        [HttpPost("signup/")]
        public async Task<ActionResult<User>> SignUp(User user)
        {
            try
            {
                if (logic.checkUser(user) == true)
                {
                    return BadRequest("user already exist with same email..!");
                }
                await logic.UserSignup(user);
            }
            catch (Exception ex)
            {
                return BadRequest("user already exist..!");
            }
            return await Task.FromResult(user);
        }
    }
}
