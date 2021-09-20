using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.DTOs
{
    public class CommentDTO
    {
        public int Id { set; get; }
        public string Text { set; get; }
        public DateTime DateTime { set; get; }
        public int UserId { set; get; }
        public string Username { set; get; }
        public int MindMapId { set; get; }
    }
}
