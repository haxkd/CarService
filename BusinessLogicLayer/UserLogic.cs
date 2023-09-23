using DataAccessLayer.Data;
using DataAccessLayer.Dto;
using DataAccessLayer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class UserLogic
    {
        readonly ApplicationDbContext _context;
        public UserLogic(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<User> GetUser(User user)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail && u.UserPassword == user.UserPassword && u.IsAdmin != 1);
        }

        public async Task<User> GetAdmin(User user)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail && u.UserPassword == user.UserPassword && u.IsAdmin == 1);
        }

        public  async Task<User> UserSignup(User user)
        {
            try
            {
               await _context.Users.AddAsync(user);
               await _context.SaveChangesAsync();
               return user;
            }
            catch (Exception e)
            {
                throw new Exception(e.ToString());
            }
        }

        public bool checkUser(User user)
        {
            User? users = _context.Users.FirstOrDefault(x => x.UserEmail == user.UserEmail);
            if (users != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
