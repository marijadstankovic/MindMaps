using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.DTOs
{
    public class ParticipantDTO
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }

        public int participantType { get; set; } = 0;
        //public string Avatar { get; set; } = null;
        //public string Status { get; set; } = null;
    }
}
