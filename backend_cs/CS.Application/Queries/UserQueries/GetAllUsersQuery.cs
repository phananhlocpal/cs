using CS.Application.DTOs.UserDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.UserQueries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserReadDTO>>
    {
    }
}
