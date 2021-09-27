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
    public class RoomsController : ControllerBase
    {
        private readonly RoomRepository _roomRepository;
        private readonly ChatRepository _chatRepository;
        private readonly RoomUserRepository _roomUserRepository;
        private readonly UserRepository _userRepository;

        private readonly MindMapsContext context;

        public RoomsController(RoomRepository roomRepository, ChatRepository chatRepository, RoomUserRepository roomUserRepository, UserRepository userRepository)
        {
            _roomRepository = roomRepository;
            _chatRepository = chatRepository;
            _roomUserRepository = roomUserRepository;
            _userRepository = userRepository;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _roomRepository.GetAll();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _roomRepository.Get(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        // PUT: api/Rooms/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.Id)
            {
                return BadRequest();
            }

            try
            {
                await _roomRepository.Update(room);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        // POST: api/Rooms
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom([FromBody] NewRoomDTO roomDTO)
        {
            var chat = await _chatRepository.Add(new Chat { Messages = new List<Message>() });

            Room room = new Room { Name = roomDTO.RoomName, DateOfCreation = DateTime.Now, Chat = chat, ChatID = chat.Id };
            await _roomRepository.Add(room);

            var user = await _userRepository.Get(roomDTO.UserUid);

            await _roomUserRepository.Add(new RoomUser { Room = room, RoomID = room.Id, User = user, UserID = user.Id });
            //return await _roomRepository.Get(room.Id);
            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Room>> DeleteRoom(int id)
        {
            var result = await _roomRepository.Delete(id);
            if (result != null)
            {
                return result;
            }
            else return NotFound();
        }

        private bool RoomExists(int id)
        {
            return (_roomRepository.Get(id) != null);
        }

        [HttpPut("RoomName/{id}")]
        public async Task<IActionResult> ChangeRoomName(int id, [FromBody] string name)
        {
            var room = await _roomRepository.Get(id);

            if (room == null)
            {
                return NotFound();
            }

            room.Name = name;

            try
            {
                await _roomRepository.Update(room);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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
    }
}
