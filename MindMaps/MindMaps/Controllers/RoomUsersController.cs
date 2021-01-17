using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindMaps.Data.Context;
using MindMaps.Data.Entities;
using MindMaps.Repository;

namespace MindMaps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomUsersController : ControllerBase
    {
        private readonly RoomUserRepository _repository;

        public RoomUsersController(RoomUserRepository repository)
        {
            _repository = repository;
        }

        // GET: api/RoomUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomUser>>> GetRoomUsers()
        {
            return await _repository.GetAll();
        }

        // GET: api/RoomUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomUser>> GetRoomUser(int id)
        {
            var roomUser = await _repository.Get(id);

            if (roomUser == null)
            {
                return NotFound();
            }

            return roomUser;
        }

        // PUT: api/RoomUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomUser(int id, RoomUser roomUser)
        {
            if (id != roomUser.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.Update(roomUser);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RoomUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RoomUser>> PostRoomUser(RoomUser roomUser)
        {
            await _repository.Add(roomUser);

            return CreatedAtAction("GetRoomUser", new { id = roomUser.Id }, roomUser);
        }

        // DELETE: api/RoomUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RoomUser>> DeleteRoomUser(int id)
        {
            var result = await _repository.Delete(id);
            if (result != null)
            {
                return result;
            }
            else return NotFound();
        }

        private bool RoomUserExists(int id)
        {
            return (_repository.Get(id) != null);
        }
    }
}
