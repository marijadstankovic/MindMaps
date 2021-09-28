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
    public class MindMapsController : ControllerBase
    {
        private readonly MindMapRepository _repository;
        private readonly RoomRepository _roomRepository;

        public MindMapsController(MindMapRepository context, RoomRepository roomRepository)
        {
            _repository = context;
            _roomRepository = roomRepository;
        }

        // GET: api/MindMaps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MindMap>>> GetMindMaps()
        {
            return await _repository.GetAll();
        }

        // GET: api/MindMaps/1001
        [HttpGet("{id}")]
        public async Task<ActionResult<MindMap>> GetMindMap(int id)
        {
            var mindMap = await _repository.Get(id);

            if (mindMap == null)
            {
                return NotFound();
            }

            return mindMap;
        }

        [HttpGet("ByRoomId/{id}")]
        public async Task<ActionResult<List<MindMap>>> GetMindMapByRoomId(int id)
        {
            var room = await _roomRepository.Get(id);
            if (room == null)
            {
                return NotFound();
            }

            return await _repository.GetMindMapsByRoom(room);
        }

        // PUT: api/MindMaps/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMindMap(int id, MindMap mindMap)
        {
            if (id != mindMap.Id)
            {
                return BadRequest();
            }


            try
            {
                await _repository.Update(mindMap);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MindMapExists(id))
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

        [HttpPut("Name/{id}")]
        public async Task<IActionResult> ChangeName(int id, string name)
        {
            var mindMap = await _repository.Get(id);
            if (mindMap == null)
            {
                return NotFound();
            }
            mindMap.Name = name;

            try
            {
                await _repository.Update(mindMap);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MindMapExists(id))
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

        // POST: api/MindMaps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MindMap>> PostMindMap(MindMapDTO mindMap)
        {
            var room = await _roomRepository.Get(mindMap.RoomId);
            if(room == null)
            {
                return BadRequest();
            }

            var doc = new MindMap
            {
                DateOfCreation = DateTime.UtcNow,
                Name = mindMap.Name,
                Room = room,
            };

            await _repository.Add(doc);

            return Ok(); //  CreatedAtAction("GetChat", new { id = mindMap.Id }, mindMap);
        }

        // DELETE: api/MindMaps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MindMap>> DeleteMindMap(int id)
        {
            var chat = await _repository.Delete(id);
            if (chat != null)
                return chat;
            else return NotFound();
        }

        private bool MindMapExists(int id)
        {
            return (_repository.Get(id) != null);
        }
    }
}
