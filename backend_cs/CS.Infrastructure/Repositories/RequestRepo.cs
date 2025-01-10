using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using Dapper;
using Microsoft.AspNetCore.Identity;

namespace CS.Infrastructure.Repositories
{
    public class RequestRepo : BaseRepo<Request>, IRequestRepo
    {
        private readonly DapperContext _context;
        public RequestRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Request>> GetByStatus(RequestStatusEnum status)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM Requests WHERE Status = @Status";
                return await connection.QueryAsync<Request>(query, new { Status = status });
            }
        }

        public async Task<IEnumerable<Request>> GetByCustomerId(Guid customerId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM Requests WHERE CustomerId = @CustomerId";
                return await connection.QueryAsync<Request>(query, new { CustomerId = customerId });
            }
        }

        public Task<IEnumerable<Request>> GetByUserId(Guid userId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM Requests WHERE PersonInChargeId = @UserId";
                return connection.QueryAsync<Request>(query, new { UserId = userId });
            }
        }
    }
}
