using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Context;
using MindMaps.Data.Entities;

namespace MindMaps.Repository
{
    public class RoomUserRepository : EfCoreRepository<RoomUser>
    {
        public RoomUserRepository(MindMapsContext context) : base(context)
        {
        }
    }
}
