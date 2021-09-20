﻿using System;
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
    public class CommentsController : ControllerBase
    {
        private readonly CommentRepository _repository;
        private readonly UserRepository _userRepository;
        private readonly MindMapRepository _mindMapRepository;

        public CommentsController(CommentRepository context, UserRepository userRepository, MindMapRepository mindMapRepository)
        {
            _repository = context;
            _mindMapRepository = mindMapRepository;
            _userRepository = userRepository;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments(int mindMapId)
        {
            return await _repository.GetAll(mindMapId);
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var chat = await _repository.Get(id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }


            try
            {
                await _repository.Update(comment);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(CommentDTO comment)
        {
            var user = await _userRepository.Get(comment.UserId);
            var mindMap = await _mindMapRepository.Get(comment.MindMapId);

            var newComment = new Comment
            {
                DateTime = DateTime.UtcNow,
                Text = comment.Text,
                MindMap = mindMap,
                User = user
            };
            await _repository.Add(newComment);

            return Ok();
            //return CreatedAtAction("GetChat", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            var comment = await _repository.Delete(id);
            if (comment != null)
                return Ok();

            else return NotFound();
        }

        private bool CommentExists(int id)
        {
            return (_repository.Get(id) != null);
        }
    }
}
