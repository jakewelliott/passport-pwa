using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;
using System.Diagnostics.CodeAnalysis;

[ExcludeFromCodeCoverage]
public record ParkAddressDTO(
    int id,
    string title,
    string addressLineOne,
    string? addressLineTwo,
    string city,
    string state,
    int zipcode,
    int parkId)
{
    public static ParkAddressDTO FromDomain(ParkAddress address)
    {
        return new ParkAddressDTO(
            address.id,
            address.title,
            address.addressLineOne,
            address.addressLineTwo,
            address.city,
            address.state.GetDisplayName(),
            address.zipcode,
            address.parkId);
    }

    public ParkAddress ToDomain(Park park)
    {
        return new()
        {
            id = id,
            title = title,
            addressLineOne = addressLineOne,
            addressLineTwo = addressLineTwo,
            city = city,
            state = Enum.Parse<State>(state),
            zipcode = zipcode,
            parkId = parkId,
            park = park
        };
    }
}
