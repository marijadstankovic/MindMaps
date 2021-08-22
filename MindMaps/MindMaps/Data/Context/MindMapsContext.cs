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
        public DbSet<Comment> Comments { get; set; }

        public MindMapsContext(DbContextOptions<MindMapsContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            byte[] salt;
            byte[] hash;

            using (var hmec = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmec.Key;
                hash = hmec.ComputeHash(System.Text.Encoding.UTF8.GetBytes("admin@admin"));
            }

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Admin",
                    LastName = "Adminovski",
                    Email = "admin@admin",
                    PasswordHash = hash,
                    PasswordSalt = salt
                }
                );
            modelBuilder.Entity<Chat>().HasData(
                new Chat{ 
                    Id = 1
                }
                );
            Room room = new Room
            {
                Id = 1,
                Name = "soba",
                DateOfCreation = DateTime.Now,
                ChatID =1
            };

            modelBuilder.Entity<Room>().HasData(
                room
                );

            modelBuilder.Entity<MindMap>().HasData(
                new MindMap
                {
                    Id = 1,
                    DateOfCreation = DateTime.Now,
                    Name = "prva mm"
                }
                );



            //modelBuilder.Entity<Node>().HasData(
            //    new Node 
            //    { 
            //        Id = 1,
            //        XMLID = 2,
            //        MindMapID = 1,
            //        XMLText = "<Rect label='Rectangle' href='' id='2'> < mxCell vertex = '1' parent = '1' >   < mxGeometry x = '120' y = '140' width = '80' height = '40' as= 'geometry' /></ mxCell ></ Rect > ",
            //        UserID = 1
            //    },
            //    new Node
            //    {
            //        Id = 2,
            //        XMLID = 3,
            //        MindMapID = 1,
            //        XMLText = " <Shape label='Shape' href='' id='3'> < mxCell style = 'ellipse' vertex = '1' parent = '1' >  < mxGeometry x = '340' y = '160' width = '60' height = '60' as= 'geometry' />  </ mxCell >    </ Shape > ",
            //        UserID = 1,
            //    }
            //    );
        }
    }
}
