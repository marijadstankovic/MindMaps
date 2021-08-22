using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MindMaps.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private ChatRepository _chatRepository;
        private MessageRepository _messageRepository;
        private UserRepository _userRepository;
        private RoomUserRepository _roomUserRepository;
        
        
        public ChatHub(ChatRepository chatRepository, MessageRepository messageRepository, UserRepository userRepository, RoomUserRepository roomUserRepository)
        {
            _chatRepository = chatRepository;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _roomUserRepository = roomUserRepository;
        }

        public async Task AddToGroup(int chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
            await Clients.Group(chatId.ToString()).SendAsync("Coonected", "client added to group");
        }

        //public async Task OnConnectedAsync()
        //{
        //    int userID;
        //    var rooms = await _roomUserRepository.FindUsersRooms(userID);
        //    var chats = await _chatRepository.ChatsFromRooms(rooms);
        //    foreach (var chatId in chats)
        //    {
        //        await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
        //        await Clients.Group(chatId.ToString()).SendAsync("Coonected", "client added to group");
        //    }
        //}

        public async Task AddToAllGroups(int userID)
        {
            var rooms = await _roomUserRepository.FindUsersRooms(userID);
            var chats = await _chatRepository.ChatsFromRooms(rooms);
            foreach (var chatId in chats)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
                await Clients.Group(chatId.ToString()).SendAsync("Coonected", "client added to group");
            }
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

            await Clients.GroupExcept(chatId.ToString(), Context.ConnectionId).SendAsync("BroadcastMessage", userId, message, chatId);
            //await Clients.All.SendAsync("BroadcastMessage", userId, message);

        }

    }
}
