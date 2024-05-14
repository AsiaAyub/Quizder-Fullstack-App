using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizderFullApp.Server.Dtos.Account;
using QuizderFullApp.Server.Models;
using QuizderFullApp.Server.Service;

namespace QuizderFullApp.Server.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly TokenService _tokenService;

        private readonly SignInManager<User> _SigninManager;
        public UsersController(UserManager<User> userManager, TokenService tokenService, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _SigninManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {

                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user)

                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);

                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);

            }

        }


        [HttpPost("registerAdmin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {

                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user)

                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);

                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);

            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid username");

            var result = await _SigninManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );

        }

        [HttpPost("admin/login")]
        public async Task<IActionResult> AdminLogin(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return Unauthorized("Invalid username");

            var result = await _SigninManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Username not found and/or password incorrect");

            // Check if the user is in the admin role
            bool isAdmin = await _userManager.IsInRoleAsync(user, "Admin");

            if (!isAdmin)
                return Unauthorized("You are not authorized to access this endpoint");

            return Ok(new
            {
                UserName = user.UserName,
                Email = user.Email,
                Role = "Admin",
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpGet("isadmin")]
        public async Task<IActionResult> IsAdmin()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
            return Ok(isAdmin);

        }

        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            // Retrieve the user from the database using the email
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return NotFound("User not found or not logged in");
            }

            // Return user details including user name
            return Ok(new
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email
            });
        }

    }
}