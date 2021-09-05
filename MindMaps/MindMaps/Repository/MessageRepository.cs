using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;
using MindMaps.Data.Context;
using MindMaps.DTOs;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Repository
{
    public class MessageRepository : EfCoreRepository<Message>
    {
        public MessageRepository(MindMapsContext context) : base(context)
        {

        }

        public async Task<List<MessageDTO>>  GetMessageHistory(int chatId, int size, int page)
        {
            var messages = await context.Messages
                .Where(x => x.ChatId == chatId)
                .OrderBy(x => x.DataTime)
                .Select(x => new MessageDTO { DateSent = x.DataTime, FromId = x.UserId, Message = x.Text, ToId = chatId})
                .ToListAsync();
            return messages.Skip(size * page).Take(size).ToList();
            
        }
    }
}
