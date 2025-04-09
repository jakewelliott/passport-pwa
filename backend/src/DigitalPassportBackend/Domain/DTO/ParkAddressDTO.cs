using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record ParkAddressDTO(
    string title,
    string addressLineOne,
    string? addressLineTwo,
    string city,
    string state,
    int zipcode)
{
    public static ParkAddressDTO FromDomain(ParkAddress address)
    {
        return new ParkAddressDTO(
            address.title,
            address.addressLineOne,
            address.addressLineTwo,
            address.city,
            address.state.GetDisplayName(),
            address.zipcode
        );
    }
}
