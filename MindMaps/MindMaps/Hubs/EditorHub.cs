using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MindMaps.DTOs;
using MindMaps.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Hubs
{
    [Authorize]
    public class EditorHub : Hub
    {
        private MindMapRepository _repository;
        private CommentRepository _commentRepository;
        public EditorHub(MindMapRepository repository, CommentRepository commentRepository)
        {
            _repository = repository;
            _commentRepository = commentRepository;
        }

        public async Task AddToGroup(int mapId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, mapId.ToString());
        }

        public async Task RemoveFromGroup(int mapId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, mapId.ToString());
        }
        
        public async Task UpdateGraph(int mapId, string graphXML) 
        {
            //send to all
            await Clients.GroupExcept(mapId.ToString(), Context.ConnectionId).SendAsync("MindMapGraph", graphXML);

            await _repository.UpdateMap(mapId, graphXML);
        }

        public async Task AddComment(string text, int mapId, int userId)
        {

            var commentDTO = new CommentDTO
            {
                DateTime = DateTime.UtcNow,
                Text = text,
                MindMapId = mapId,
                UserId = userId
            };
            commentDTO = await _commentRepository.Add(commentDTO);

            await Clients.GroupExcept(mapId.ToString(), Context.ConnectionId).SendAsync("CommentAdded", commentDTO);
        }

        public async Task RemoveComment(int commentId, int mapId)
        {
            await _commentRepository.Delete(commentId);

            await Clients.GroupExcept(mapId.ToString(), Context.ConnectionId).SendAsync("CommentRemoved", commentId);
        }
    }
}
