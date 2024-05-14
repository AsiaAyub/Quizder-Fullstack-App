using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizderFullApp.Server.Data;
using QuizderFullApp.Server.Helper;
using QuizderFullApp.Server.Models;

namespace QuizderFullApp.Server.Controllers
{
    [ApiController]
    [Route("riddles")]
    public class RiddlesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<User> _userManager;
        public RiddlesController(ApplicationDBContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;

        }



        [HttpGet]
        [Authorize]
        public IActionResult GetAll([FromQuery] QueryObject? query)
        {

            if (query == null || string.IsNullOrWhiteSpace(query.SearchTerm))
            {
                return Ok(_context.Riddles.ToList());
            }
            else
            {
                var riddles = _context.Riddles.AsQueryable();
                riddles = riddles.Where(s => s.Question.Contains(query.SearchTerm));
                return Ok(riddles.ToList());
            }

        }



        [HttpGet("random")]
        [Authorize]
        public IActionResult GetRandomRiddles()
        {

            var allRiddles = _context.Riddles.ToList();


            if (allRiddles.Count < 5)
            {
                return BadRequest("Not enough riddles available to generate random five riddles.");
            }


            var random = new Random();

            var randomRiddles = allRiddles.OrderBy(r => random.Next()).Take(5);

            return Ok(randomRiddles);
        }

        [HttpGet("{id:int}")]
        [Authorize]

        //Task<> is an async operation that eventually returns IActionResult
        public async Task<IActionResult> GetRiddleById(int id)
        {
            var riddle = await _context.Riddles.FindAsync(id);

            if (riddle == null)
            {
                return NotFound();
            }

            return Ok(riddle);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRiddle([FromBody] Riddles riddle)
        {
            if (riddle == null)
            {
                return BadRequest("Riddle object is null");
            }

            try
            {

                riddle.Id = 0;
                _context.Riddles.Add(riddle);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetRiddleById), new { id = riddle.Id }, riddle);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateRiddle(int id, [FromBody] Riddles updatedRiddle)
        {
            var existingRiddle = await _context.Riddles.FirstOrDefaultAsync(x => x.Id == id);

            if (existingRiddle == null)
            {
                return NotFound("Riddle not found");
            }

            existingRiddle.Question = updatedRiddle.Question;
            existingRiddle.Answer1 = updatedRiddle.Answer1;
            existingRiddle.Answer2 = updatedRiddle.Answer2;
            existingRiddle.Answer3 = updatedRiddle.Answer3;
            existingRiddle.Answer4 = updatedRiddle.Answer4;
            existingRiddle.CorrectAnswer = updatedRiddle.CorrectAnswer;

            await _context.SaveChangesAsync();

            return Ok(existingRiddle);



        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var toDeleteRiddle = await _context.Riddles.FirstOrDefaultAsync(x => x.Id == id);

            if (toDeleteRiddle == null)
            {
                return NotFound("Riddle not found");
            }

            _context.Riddles.Remove(toDeleteRiddle);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}