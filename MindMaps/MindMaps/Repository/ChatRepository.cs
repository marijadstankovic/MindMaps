using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;

namespace MindMaps.Repository
{
    public class ChatRepository : EfCoreRepository<Chat>
    {
        public ChatRepository(MindMapsContext context) : base(context)
        { }

        public async Task<List<int>> ChatsFromRooms(List<Room> rooms)
        {
            //context.Chats.Where(x => rooms.Contains(x.))
            return rooms.Join(
                context.Chats,
                x => x.ChatID,
                y => y.Id,
                (x, y) => y.Id).ToList();
            //context.Chats.Where(x => )

            //return null;
        }
    }
}
