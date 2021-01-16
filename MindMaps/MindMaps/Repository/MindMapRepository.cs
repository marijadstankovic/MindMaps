using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;

namespace MindMaps.Repository
{
    public class MindMapRepository : EfCoreRepository<MindMap>
    {
        public MindMapRepository(MindMapsContext context) : base(context)
        {
        }
    }
}
