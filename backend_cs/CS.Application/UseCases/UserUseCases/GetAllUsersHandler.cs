using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.UserDTO;
using CS.Application.Queries.UserQueries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.UserUseCases
{
    public class GetAllUsersHandler : IQueryHandler<GetAllUsersQuery, IEnumerable<UserReadDTO>>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;

        public GetAllUsersHandler(IUserRepo userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserReadDTO>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _userRepo.GetAll();
            return _mapper.Map<IEnumerable<UserReadDTO>>(users);
        }
    }
}
