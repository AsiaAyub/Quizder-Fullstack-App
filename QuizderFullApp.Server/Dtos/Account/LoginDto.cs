using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizderFullApp.Server.Dtos.Account
{
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}