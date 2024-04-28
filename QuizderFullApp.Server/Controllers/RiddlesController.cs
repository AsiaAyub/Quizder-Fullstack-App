using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizderFullApp.Server.Data;
using QuizderFullApp.Server.Models;

namespace QuizderFullApp.Server.Controllers
{
    [ApiController]
    [Route("riddles")]
    public class RiddlesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public RiddlesController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var riddles = _context.Riddles.ToList();

            return Ok(riddles);

        }

        [HttpGet("random")]
        public IActionResult GetRandomRiddles()
        {
            // Retrieve all riddles from the database
            var allRiddles = _context.Riddles.ToList();

            // Ensure that there are at least 5 riddles available
            if (allRiddles.Count < 5)
            {
                return BadRequest("Not enough riddles available to generate random five riddles.");
            }

            // Shuffle the list and take the first 5 riddles
            var random = new Random();

            //generate random numbers to be used by orderby to order the riddles then take first 5
            var randomRiddles = allRiddles.OrderBy(r => random.Next()).Take(5);

            return Ok(randomRiddles);
        }

        [HttpGet("{id:int}")]

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