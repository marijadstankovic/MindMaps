using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class User
    {
        public int ID { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public ICollection<RoomUser> RoomUsers { get; set; }

        public ICollection<Message> Messages { get; set; }

        public ICollection<Node> Nodes { get; set; }

        public ICollection<Comment> Comments { get; set; }
    
    }
}
