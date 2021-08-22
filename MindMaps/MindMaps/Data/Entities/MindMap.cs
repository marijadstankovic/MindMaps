using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Data.Entities
{
    public class MindMap : IEntity
    {
        public int Id { set; get; }
        public String Name;
        public Room Room { set; get; }
        public DateTime DateOfCreation { set; get; }
        public string XMLText { get; set; }
    }
}
