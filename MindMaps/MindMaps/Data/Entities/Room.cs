using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class Room : IEntity
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        public DateTime DateOfCreation { get; set; }

        public int ChatID { get; set; }

        public Chat Chat { get; set; }

        public ICollection<RoomUser> RoomUsers { get; set; }

        public ICollection<MindMap> MindMaps { get; set; }
    }
}
