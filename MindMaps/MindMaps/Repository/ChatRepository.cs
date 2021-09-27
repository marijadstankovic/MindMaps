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

        public async Task<int> ChatFromRoom(int roomId)
        {
            return await context.Rooms.Where(x => x.Id == roomId).Select(x => x.ChatID).FirstOrDefaultAsync();
        }

        public async Task<List<ChatDTO>> ChatsByUserID(int uid)
        {
            var chats = await context.RoomUsers.Where(x => x.UserID == uid) // 
                                                                      // .ToList()
                .Join(context.Rooms,
                x => x.RoomID,
                y => y.Id,
                (x, y) => new ChatDTO { Id = y.ChatID, DisplayName = y.Name })
                .ToListAsync();

            foreach(var chat in chats)
            {
                //context.RoomUsers.Where(x => x.RoomID == )
                chat.ChattingTo = await context.Rooms.Where(x => x.ChatID == chat.Id)
                    .Join(context.RoomUsers,
                    x => x.Id,
                    y => y.RoomID,
                    (x, y) => y.UserID)

                    .Join(context.User,
                    x => x,
                    y => y.Id,
                    (x, y) => new ParticipantDTO { Id = y.Id, DisplayName = y.Name + " " + y.LastName })

                    .ToListAsync();

            }
            //var result = await context.Rooms
            //    .Where(y => context.RoomUsers.Where(x => x.UserID == uid)
            //        .Select(x => x.RoomID).Contains(y.ChatID))
            //    .Select(y => new ChatDTO{ Id= y.ChatID, RoomName = y.Name}).ToListAsync();
            return chats;
        }
    }
}
