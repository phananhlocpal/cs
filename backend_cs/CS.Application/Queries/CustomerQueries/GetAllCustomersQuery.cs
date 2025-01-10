using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.DTOs.CustomerDTO;
using MediatR;

namespace CS.Application.Queries.CustomerQueries
{
    public class GetAllCustomersQuery : IQuery<IEnumerable<CustomerReadDTO>>
    {
        public GetAllCustomersQuery()
        {

        }
    }
}
