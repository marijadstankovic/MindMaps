using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindMaps.Repository;
using MindMaps.Data.Entities;


namespace MindMaps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo) {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string email, string password)
        {
            email = email.ToLower();

            if (await _repo.UserExists(email))
                return BadRequest("Username already exists");

            var userToCreate = new User {
                Email = email
            };

            var createdUser = await _repo.Register(userToCreate, password);

            return StatusCode(201);
        }
    }
}
