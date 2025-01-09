using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.DBContext;
using CS.Domain.Entities;
using CS.Domain.Interfaces;
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
    }
}
