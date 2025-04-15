
using DigitalPassportBackend.Domain;
public record ParkVisitDTO(
    int id,
    DateTime createdAt,
    DateTime updatedAt,
    Geopoint geopoint,
    int parkId,
    int userId
) {
    public static ParkVisitDTO FromDomain(ParkVisit parkVisit) {
        return new ParkVisitDTO(
            id: parkVisit.id,
            createdAt: parkVisit.createdAt,
            updatedAt: parkVisit.updatedAt,
            geopoint: parkVisit.geopoint,
            parkId: parkVisit.parkId,
            userId: parkVisit.userId
        );
    }

    public ParkVisit ToDomain() {
        return new ParkVisit() {
            id = id,
            createdAt = createdAt,
            updatedAt = updatedAt,
            geopoint = geopoint,
            parkId = parkId,
            userId = userId
        };
    }
}