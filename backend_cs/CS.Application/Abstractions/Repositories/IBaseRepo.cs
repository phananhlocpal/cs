using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.Entities;

namespace CS.Application.Abstractions.Repositories
{
    public interface IBaseRepo<T> where T : BaseEntity
    {
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task Delete(T entity);
        Task<T> Get(Guid id);
        Task<IEnumerable<T>> GetAll();
    }
}
