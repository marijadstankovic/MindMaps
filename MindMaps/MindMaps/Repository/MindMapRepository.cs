using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Repository
{
    public class MindMapRepository : EfCoreRepository<MindMap>
    {
        public MindMapRepository(MindMapsContext context) : base(context)
        {
        }

        public async Task UpdateMap(int mapId, string textXML)
        {
            var map = await context.MindMaps.FirstOrDefaultAsync(x => x.Id == mapId);
            if (map == null)
                return;
            map.XMLText = textXML;
            context.MindMaps.Update(map);
            await context.SaveChangesAsync();
        }

        public async Task<List<MindMap>> GetMindMapsByRoom(Room room)
        {
            return await context.MindMaps.Where(x => x.Room == room).ToListAsync();
        }
    }
}
