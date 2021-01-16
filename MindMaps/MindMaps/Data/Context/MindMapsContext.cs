using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MindMaps.Data.Entities;


namespace MindMaps.Data.Context
{
    public class MindMapsContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<RoomUser> RoomUsers { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MindMap> MindMaps { get; set; }
        public DbSet<Node> Nodes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public MindMapsContext(DbContextOptions<MindMapsContext> options) : base(options)
        {
        }
    }
}
