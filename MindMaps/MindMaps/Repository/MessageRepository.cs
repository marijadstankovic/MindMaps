using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;

namespace MindMaps.Repository
{
    public class MessageRepository : EfCoreRepository<Message>
    {
        public MessageRepository(MindMapsContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Message>>  GetMessageHistory(int chatId, int size, int page)
        {
            return null;
        }
    }
}
