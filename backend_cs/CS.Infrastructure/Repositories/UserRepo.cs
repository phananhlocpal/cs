using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using CS.Domain.Interfaces;
using Dapper;
using static Dapper.SqlMapper;

namespace CS.Infrastructure.Repositories
{
    public class UserRepo : BaseRepo<User>, IUserRepo 
    {
        private readonly DapperContext _context;
       
        public UserRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "SELECT * FROM Users WHERE Email = @Email";  
                var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { Email = email }); 

                return user; 
            }
        }
    }
}
