using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;
using Microsoft.EntityFrameworkCore;
using MindMaps.DTOs;

namespace MindMaps.Repository
{
    public class CommentRepository: EfCoreRepository<Comment>
    {
        private readonly UserRepository _userRepository;
        private readonly MindMapRepository _mindMapRepository;

        public CommentRepository(MindMapsContext context, UserRepository userRepository, MindMapRepository mindMapRepository) : base(context)
        {
            _mindMapRepository = mindMapRepository;
            _userRepository = userRepository;
        }

        public async Task<List<CommentDTO>> GetAll(int mindMapId)
        {
            return await context.Comments
                .Where(x => x.MindMap.Id == mindMapId)
                .Select(x => new CommentDTO { 
                    Id = x.Id,
                    DateTime = x.DateTime,
                    MindMapId = mindMapId,
                    Text = x.Text,
                    UserId = x.User.Id,
                    Username = $"{x.User.Name} {x.User.LastName}"
                })
                .ToListAsync();
        }

        public async Task<CommentDTO> Add(CommentDTO commentDTO)
        {
            var user = await _userRepository.Get(commentDTO.UserId);
            var mindMap = await _mindMapRepository.Get(commentDTO.MindMapId);

            var newComment = new Comment
            {
                DateTime = DateTime.UtcNow,
                Text = commentDTO.Text,
                MindMap = mindMap,
                User = user
            };
            await Add(newComment);

            commentDTO.Username = $"{user.Name} {user.LastName}";
            commentDTO.Id = newComment.Id;

            return commentDTO;
        }
    }
}
