using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Data.Entities
{
    public class Chat : IEntity
    {
        public int Id { get; set; }
        public Room Room { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
