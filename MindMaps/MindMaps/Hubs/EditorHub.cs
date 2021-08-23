using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
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
        public EditorHub(MindMapRepository repository)
        {
            _repository = repository;
        }

        public async Task AddToGroup(int mapId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, mapId.ToString());
        }

        public async Task RemoveFromGroup(int mapId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, mapId.ToString());
        }
        //functions for new hub, here just for testing
        public async Task UpdateGraph(int mapId, string graphXML) //int mapId, 
        {
            //send to all
            await Clients.GroupExcept(mapId.ToString(), Context.ConnectionId).SendAsync("MindMapGraph", graphXML);

            //await Clients.Others.SendAsync("MindMapGraph", graphXML);

            // save to db :D
            await _repository.UpdateMap(mapId, graphXML);
        }
    }
}
