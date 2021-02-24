using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Context;
using MindMaps.Data.Entities;

namespace MindMaps.Repository
{
    public class UserRepository : EfCoreRepository<User>
    {
        public UserRepository(MindMapsContext context) : base(context)
        {
        }
    }
}
