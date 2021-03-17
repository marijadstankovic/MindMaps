using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;

namespace MindMaps.Repository
{
    interface IAuthRepository
    {
        Task<User> Register(User user,  string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
