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
    public class EmployeeTagggedRepo : BaseRepo<EmployeesTagged>, IEmployeeTaggedRepo
    {
        private readonly DapperContext _context;
        public EmployeeTagggedRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeesTagged>> GetByConversationId(Guid conversationId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "SELECT * FROM EmployeesTaggeds WHERE ConversationId = @ConversationId";
                var employeesTagged = await connection.QueryAsync<EmployeesTagged>(query, new { ConversationId = conversationId });

                return employeesTagged;
            }
        }
    }
}
