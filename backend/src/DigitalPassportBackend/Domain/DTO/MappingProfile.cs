using AutoMapper;
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Domain.DTO;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Map Park to ParkDTO (basic properties)
        CreateMap<Park, ParkDTO>()
            .ForMember(dest => dest.abbreviation, opt => opt.MapFrom(src => src.parkAbbreviation))
            .ForMember(dest => dest.parkType, opt => opt.MapFrom(src => src.parkType.ToString()))
            .ForMember(dest => dest.parkName, opt => opt.MapFrom(src => src.parkName))
            .ForMember(dest => dest.coordinates, opt => opt.Ignore()) // Customize as needed
            .ForMember(dest => dest.phone, opt => opt.MapFrom(src => src.phone))
            .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
            .ForMember(dest => dest.establishedYear, opt => opt.MapFrom(src => src.establishedYear))
            .ForMember(dest => dest.landmark, opt => opt.MapFrom(src => src.landmark))
            .ForMember(dest => dest.youCanFind, opt => opt.MapFrom(src => src.youCanFind))
            .ForMember(dest => dest.trails, opt => opt.MapFrom(src => src.trails))
            .ForMember(dest => dest.website, opt => opt.MapFrom(src => src.website))
            .ForMember(dest => dest.stampImage, opt => opt.MapFrom(src => src.stampImage))
            .ForMember(dest => dest.accesses, opt => opt.MapFrom(src => src.accesses))
            .ForMember(dest => dest.addresses, opt => opt.Ignore()) // Customize as needed
            .ForMember(dest => dest.icons, opt => opt.Ignore()) // Customize as needed
            .ForMember(dest => dest.bucketListItems, opt => opt.Ignore()) // Customize as needed
            .ForMember(dest => dest.photos, opt => opt.Ignore()); // Customize as needed

        // Map ParkDTO to Park (basic properties)
        CreateMap<ParkDTO, Park>()
            .ForMember(dest => dest.parkAbbreviation, opt => opt.MapFrom(src => src.abbreviation))
            .ForMember(dest => dest.parkType, opt => opt.MapFrom(src => Enum.Parse<ParkType>(src.parkType)))
            .ForMember(dest => dest.parkName, opt => opt.MapFrom(src => src.parkName))
            .ForMember(dest => dest.coordinates, opt => opt.Ignore()) // Customize as needed
            .ForMember(dest => dest.phone, opt => opt.MapFrom(src => src.phone))
            .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
            .ForMember(dest => dest.establishedYear, opt => opt.MapFrom(src => src.establishedYear))
            .ForMember(dest => dest.landmark, opt => opt.MapFrom(src => src.landmark))
            .ForMember(dest => dest.youCanFind, opt => opt.MapFrom(src => src.youCanFind))
            .ForMember(dest => dest.trails, opt => opt.MapFrom(src => src.trails))
            .ForMember(dest => dest.website, opt => opt.MapFrom(src => src.website))
            .ForMember(dest => dest.stampImage, opt => opt.MapFrom(src => src.stampImage))
            .ForMember(dest => dest.accesses, opt => opt.MapFrom(src => src.accesses))
            .ForMember(dest => dest.city, opt => opt.Ignore())
            .ForMember(dest => dest.boundaries, opt => opt.Ignore())
            .ForMember(dest => dest.createdAt, opt => opt.Ignore())
            .ForMember(dest => dest.updatedAt, opt => opt.Ignore());

        // Map Trail to TrailDTO (basic properties)
        CreateMap<Trail, TrailDTO>()
            .ForMember(dest => dest.distance, opt => opt.MapFrom(src => src.length))
            .ForMember(dest => dest.icons, opt => opt.MapFrom(src => src.Icons));

        // Map TrailDTO to Trail (basic properties)
        CreateMap<TrailDTO, Trail>()
            .ForMember(dest => dest.length, opt => opt.MapFrom(src => src.distance))
            .ForMember(dest => dest.createdAt, opt => opt.Ignore())
            .ForMember(dest => dest.updatedAt, opt => opt.Ignore());

        CreateMap<TrailIcon, TrailIconDTO>()
            .ForMember(dest => dest.iconName, opt => opt.MapFrom(src => src.icon.ToString()));

        CreateMap<TrailIconDTO, TrailIcon>()
            .ForMember(dest => dest.icon, opt => opt.MapFrom(src => Enum.Parse<TrailIconName>(src.iconName)));
    }
}
