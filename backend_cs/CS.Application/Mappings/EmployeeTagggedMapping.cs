using AutoMapper;
using CS.Application.DTOs.EmployeeTaggedDTO;
using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Mappings
{
    public class EmployeeTaggedMapping : Profile
    {
        public EmployeeTaggedMapping()
        {
            CreateMap<EmployeesTagged, EmployeeTaggedReadDTO>();
            CreateMap<EmployeeTaggedCreateDTO, EmployeesTagged>();
        }
    }
}
