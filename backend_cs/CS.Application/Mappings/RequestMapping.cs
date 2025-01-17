using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.CustomerDTO;
using CS.Application.DTOs.RequestDTO;
using CS.Application.DTOs.UserDTO;
using CS.Domain.Entities;

namespace CS.Application.Mappings
{
    public class RequestMapping : Profile
    {
        public RequestMapping()
        {
            CreateMap<Request, RequestReadDTO>();
            CreateMap<RequestCreateDTO, Request>();
        }
    }
}
