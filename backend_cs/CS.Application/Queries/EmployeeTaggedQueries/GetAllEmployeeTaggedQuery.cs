using CS.Application.DTOs.EmployeeTaggedDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.EmployeeTaggedQueries
{
    public class GetAllEmployeeTaggedQuery : IRequest<List<EmployeeTaggedReadDTO>> { }

}
