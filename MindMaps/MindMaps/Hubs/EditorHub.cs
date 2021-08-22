using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Hubs
{
    [Authorize]
    public class EditorHub : Hub
    {



        //functions for new hub, here just for testing
        public async Task UpdateGraph(string graphXML) //int mapId, 
        {
            //send to all
            //await Clients.GroupExcept(mapId.ToString(), Context.ConnectionId).SendAsync("MindMapGraph", graphXML);

            await Clients.Others.SendAsync("MindMapGraph", graphXML);

            // save to db :D

        }
    }
}
