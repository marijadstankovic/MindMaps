using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class RoomUser
    {
        public int ID { get; set; }

        public int RoomID { get; set; }

        public Room Room { get; set; }

        public int UserID { get; set; }

        public User User { get; set; }
    }
}
