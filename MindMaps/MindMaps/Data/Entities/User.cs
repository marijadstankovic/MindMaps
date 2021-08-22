using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public virtual ICollection<RoomUser> RoomUsers { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    
    }
}
