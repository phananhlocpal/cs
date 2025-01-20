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
    public class MessageRepo : BaseRepo<Message>, IMessageRepo
    {
        private readonly DapperContext _context;
        public MessageRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Message>> GetByConversationId(Guid id)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM Messages WHERE ConversationId = @ConversationId";
                return await connection.QueryAsync<Message>(query, new { ConversationId = id });
            }
        }
    }
}
