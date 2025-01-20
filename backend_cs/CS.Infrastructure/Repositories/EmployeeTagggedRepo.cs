using CS.Application.Abstractions.Repositories;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Infrastructure.Repositories
{
    public class EmployeeTagggedRepo : BaseRepo<EmployeeTagged>, IEmployeeTaggedRepo
    {
        private readonly DapperContext _context;
        public EmployeeTagggedRepo(DapperContext context) : base(context)
        {
            _context = context;
        }
    }
}
