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
        public CommentRepository(MindMapsContext context) : base(context)
        {

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
    }
}
