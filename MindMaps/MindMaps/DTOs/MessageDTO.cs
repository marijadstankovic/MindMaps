using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.DTOs
{
    public class MessageDTO
    {
        public int FromId { get; set; }
        public int ToId { get; set; }

        public string Message { get; set; }
        public DateTime DateSent { get; set; }
        
    }
}
