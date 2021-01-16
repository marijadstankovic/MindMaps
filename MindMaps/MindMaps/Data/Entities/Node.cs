using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class Node
    {
        public int ID { get; set; }

        public string XMLText { get; set; }

        public int MindMapID { get; set; }

        public MindMap MindMap { get; set; }

        public int XMLID { get; set; }

        public int UserID { get; set; }

        public User User { get; set; }
    }
}
