using CS.Application.Abstractions.Repositories;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Infrastructure.Repositories
{
    public class ConversationRepo : BaseRepo<Conversation>, IConversationRepo
    {
        private readonly DapperContext _context;
        public ConversationRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Conversation> GetByCustomerId(Guid customerId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "SELECT * FROM Conversations WHERE CustomerId = @CustomerId";
                var conversation = await connection.QueryFirstOrDefaultAsync<Conversation>(query, new { CustomerId = customerId });

                return conversation;
            }
        }
    }
}
