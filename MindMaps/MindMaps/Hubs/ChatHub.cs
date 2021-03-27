using Microsoft.AspNetCore.SignalR;
using MindMaps.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Hubs
{
    public class ChatHub : Hub
    {
        private ChatRepository _chatRepository;
        private MessageRepository _messageRepository;
        private UserRepository _userRepository;
        
        
        public ChatHub(ChatRepository chatRepository, MessageRepository messageRepository, UserRepository userRepository)
        {
            _chatRepository = chatRepository;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        public async Task AddToGroup(int chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
            await Clients.Group(chatId.ToString()).SendAsync("Coonected", "client added to group");
        }

        public async Task SendMessage(int userId, int chatId, string message)
        {
            var userEntity = await _userRepository.Get(userId);
            var chatEntity = await _chatRepository.Get(chatId);

            _ = Context.User;

            if (chatEntity == null) throw new HubException("Chat not found");

            await _messageRepository.Add(new Data.Entities.Message
            {
                Text = message,
                DataTime = DateTime.Now,
                User = userEntity,
                Chat = chatEntity
            });

            //await Clients.Group(chatId.ToString()).SendAsync("BroadcastMessage", userId, message);
            await Clients.All.SendAsync("BroadcastMessage", userId, message);

        }
    }
}
