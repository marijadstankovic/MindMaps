﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.DTOs
{
    public class ChatDTO
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }

        public List<ParticipantDTO> ChattingTo { get; set; }
        public int ParticipantType { get; set; } = 1;
    }
}
