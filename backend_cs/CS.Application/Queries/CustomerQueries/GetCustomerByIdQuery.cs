﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.DTOs.CustomerDTO;
using MediatR;

namespace CS.Application.Queries.CustomerQueries
{
    public class GetCustomerByIdQuery : IRequest<CustomerReadDTO>
    {
        public GetCustomerByIdQuery()
        {

        }

        public Guid Id { get; set; }
    }
}
