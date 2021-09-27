using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MindMaps.Data.Context;
using MindMaps.Data.Entities;

namespace MindMaps.Repository
{
    public class RoomUserRepository : EfCoreRepository<RoomUser>
    {
        public RoomUserRepository(MindMapsContext context) : base(context)
        {
        }

        public async Task<RoomUser> Filter(int roomID, int userID)
        {
            var result = await context.RoomUsers.Where(x => x.RoomID == roomID && x.UserID == userID).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Room>> FindUsersRooms(int userID)
        {
            return await context.RoomUsers.Where(x => x.UserID == userID)
                .Join(
                context.Rooms,
                roomUser => roomUser.Room.Id,
                room => room.Id,
                (roomUser, room) => room).ToListAsync();
        }
        //public async Task<List<int>> FindUsersRoomIDs(int userID)
        //{
        //    return await context.RoomUsers.Where(x => x.UserID == userID).Select(x => x.RoomID).ToListAsync();
        //}

        public async Task<List<User>> FindUsersInRoom(int roomID)
        {
            return await context.RoomUsers.Where(x => x.RoomID == roomID)
                .Join(
                context.User,
                roomUser => roomUser.User.Id,
                user => user.Id,
                (roomUser, user) => user).ToListAsync();
        }
        //public async Task<List<int>> FindUserIDsInRoom(int roomID)
        //{
        //    return await context.RoomUsers.Where(x => x.RoomID == roomID).Select(x => x.UserID).ToListAsync();
        //}
    }
}
