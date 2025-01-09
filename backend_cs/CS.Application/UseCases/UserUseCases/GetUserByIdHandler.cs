using AutoMapper;
using CS.Application.DTOs.UserDTO;
using CS.Application.Queries.UserQueries;
using CS.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.UserUseCases
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, UserReadDTO>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;

        public GetUserByIdHandler(IUserRepo userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<UserReadDTO> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.Get(request.Id);
            return _mapper.Map<UserReadDTO>(user);
        }
    }
}
