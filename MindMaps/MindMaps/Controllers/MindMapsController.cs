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
    public class MindMapsController : ControllerBase
    {
        private readonly MindMapRepository _repository;

        public MindMapsController(MindMapRepository context)
        {
            _repository = context;
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

        // POST: api/MindMaps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MindMap>> PostMindMap(MindMap mindMap)
        {
            await _repository.Add(mindMap);

            return CreatedAtAction("GetChat", new { id = mindMap.Id }, mindMap);
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
