using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record ParkAddressDTO(
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
