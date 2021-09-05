using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindMaps.Data.Context;
using MindMaps.Data.Entities;
using MindMaps.DTOs;
using MindMaps.Repository;

namespace MindMaps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomUsersController : ControllerBase
    {
        private readonly RoomUserRepository _roomUserRepository;
        private readonly RoomRepository _roomRepository;

        public RoomUsersController(RoomUserRepository repository, RoomRepository roomRepository)
        {
            _roomUserRepository = repository;
            _roomRepository = roomRepository;
        }

        // GET: api/RoomUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomUser>>> GetRoomUsers()
        {
            return await _roomUserRepository.GetAll();
        }

        // GET: api/RoomUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomUser>> GetRoomUser(int id)
        {
            var roomUser = await _roomUserRepository.Get(id);

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
                await _roomUserRepository.Update(roomUser);
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
        public async Task<ActionResult<RoomUser>> PostRoomUser(AddUserToRoomDto roomUser)
        {
            var keys = roomUser.RoomKey.Split('.');
            // string roomName = keys[0];
            string roomIdCoded = keys[1]; // dodaj i ostale npr ako je konverzijom 1004 ispalo as.2 to je keys[1-2]
            //onda tu mora enkodiranje
            int roomId = int.Parse(roomIdCoded);

            var exits = await _roomUserRepository.Filter(roomId, roomUser.UserUid);
            if (exits != null)
            {//korisnik je vec u sobi
                return null;
            }

            var RoomUser = new RoomUser() { RoomID = roomId, UserID = roomUser.UserUid }; // treba proveriti i da li ovi postoje i da li postoji njihova kombinacija
            await _roomUserRepository.Add(RoomUser);

            return null;
            //return CreatedAtAction("GetRoomUser", new { id = roomUser.Id }, roomUser);
        }

        // DELETE: api/RoomUsers/5
        [HttpDelete]
        public async Task<ActionResult<RoomUser>> DeleteRoomUser(int roomID, int userID)
        {
            int id = (await _roomUserRepository.Filter(roomID, userID)).Id;
            var result = await _roomUserRepository.Delete(id);
            if (result != null)
            {
                return result;
            }
            else return NotFound();
        }

        private bool RoomUserExists(int id)
        {
            return (_roomUserRepository.Get(id) != null);
        }


        [HttpGet("Rooms/{userID}")]
        public async Task<ActionResult<List<RoomViewDto>>> GetRoomsByUserID(int userID)
        {
            var rooms = await _roomUserRepository.FindUsersRooms(userID);

            if (rooms == null)
            {
                return NotFound();
            }

            var res =  new List<RoomViewDto>();

            foreach (var room in rooms)
            {
                res.Add(new RoomViewDto { 
                    Id = room.Id,
                    Name = room.Name,
                    DateOfCreation = room.DateOfCreation
                });
            }
            return res;
        }
    }
}
