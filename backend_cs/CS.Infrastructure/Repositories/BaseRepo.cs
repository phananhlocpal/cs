using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using Dapper;
using CS.Application.Abstractions.Interfaces;

namespace CS.Infrastructure.Repositories
{
    public class BaseRepo<T> : IBaseRepo<T> where T : BaseEntity
    {
        protected readonly DapperContext _context;

        public BaseRepo(DapperContext context)
        {
            _context = context;
        }

        public async Task<T> Create(T entity)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"INSERT INTO {typeof(T).Name}s ({GetColumns()}) VALUES ({GetParameters()})";
                await connection.ExecuteAsync(query, entity);
            }
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"UPDATE {typeof(T).Name}s SET {GetUpdateColumns()} WHERE Id = @Id";
                await connection.ExecuteAsync(query, entity);
            }
            return entity;
        }

        public async Task Delete(T entity)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"DELETE FROM {typeof(T).Name}s WHERE Id = @Id";
                connection.Execute(query, new { Id = entity.Id });
            }
        }

        public async Task<T> Get(Guid id)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM {typeof(T).Name}s WHERE Id = @Id";
                return await connection.QuerySingleOrDefaultAsync<T>(query, new { Id = id });
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            using (var connection = _context.CreateConnection())
            {
                var query = $"SELECT * FROM {typeof(T).Name}s";
                return await connection.QueryAsync<T>(query);
            }
        }

        private string GetColumns()
        {
            var properties = typeof(T).GetProperties()
                                      .Select(p => p.Name);

            return string.Join(", ", properties);
        }

        private string GetParameters()
        {
            var properties = typeof(T).GetProperties()
                                      .Select(p => "@" + p.Name);

            return string.Join(", ", properties);
        }

        private string GetUpdateColumns()
        {
            var properties = typeof(T).GetProperties()
                                      .Where(p => p.Name != "Id")
                                      .Select(p => $"{p.Name} = @{p.Name}");

            return string.Join(", ", properties);
        }
    }
}
