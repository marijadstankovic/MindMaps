using MindMaps.Data.Context;
using MindMaps.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MindMaps.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MindMapsContext _context;

        public AuthRepository(MindMapsContext context)
        {
            _context = context;
        }

        public Task<User> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passHash, passSalt;
            CreatePasswordHash(password, out passHash, out passSalt);

            user.PasswordHash = passHash;
            user.PasswordSalt = passSalt;

            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
        private void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt)
        {
            using (var hmec = new System.Security.Cryptography.HMACSHA512())
            {
                passSalt = hmec.Key;
                passHash = hmec.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public Task<bool> UserExists(string username)
        {
            throw new NotImplementedException();
        }
    }
}
