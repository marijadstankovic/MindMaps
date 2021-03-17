using Microsoft.EntityFrameworkCore;
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

        public async Task<User> Login(string email, string password)
        {
            var user = await _context.User.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return null;
        }
        private bool VerifyPasswordHash(string password, byte[] passHash, byte[] passSalt)
        {
            using (var hmec = new System.Security.Cryptography.HMACSHA512(passSalt))
            {
                var computedHash = hmec.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passHash[i])
                        return false;
                }
            }
            return true;
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

        public async Task<bool> UserExists(string email)
        {
            if (await _context.User.AnyAsync(x => x.Email == email))
                return true;
            return false;
        }
    }
}
