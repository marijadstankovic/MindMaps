using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.DTOs
{
    public class AddUserToRoomDto
    {
        public string RoomKey { get; set; }
        public int UserUid { get; set; }
    }
}
