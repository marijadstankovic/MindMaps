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
    public class MindMapRepository : EfCoreRepository<MindMap>
    {
        private readonly RoomRepository _roomRepository;
        public MindMapRepository(MindMapsContext context, RoomRepository roomRepository) : base(context)
        {
            _roomRepository = roomRepository;
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

        public async Task<int> Add(MindMapDTO mapDTO)
        {
            var room = await _roomRepository.Get(mapDTO.RoomId);
            if (room == null)
            {
                return 0;
            }

            var doc = new MindMap
            {
                DateOfCreation = DateTime.UtcNow,
                Name = mapDTO.Name,
                Room = room,
            };

            doc = await Add(doc);
            return doc.Id;
        }
    }
}
