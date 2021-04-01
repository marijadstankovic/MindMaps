using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Data.Entities
{
    public class Chat : IEntity
    {
        public int Id { get; set; }
        //public int RoomId { get; set; }
        //public virtual Room Room { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
