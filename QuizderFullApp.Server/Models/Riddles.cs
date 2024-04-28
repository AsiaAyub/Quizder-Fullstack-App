using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizderFullApp.Server.Models
{
    public class Riddles
    {
        public int Id { get; set; }

        public string Question { get; set; } = string.Empty;

        public string Answer1 { get; set; } = string.Empty;

        public string Answer2 { get; set; } = string.Empty;

        public string Answer3 { get; set; } = string.Empty;

        public string Answer4 { get; set; } = string.Empty;

        public string CorrectAnswer { get; set; } = string.Empty;

    }
}